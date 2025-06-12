<?php

namespace App\Jobs;

use App\Models\Actor;
use App\Models\Frame;
use App\Models\Genero;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ImportMovieFromTMDB implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public int $tmdbId) {}

    public function handle(): void
    {
        sleep(1); // Controla rate limit de TMDB

        $response = Http::get("https://api.themoviedb.org/3/movie/{$this->tmdbId}", [
            'api_key' => config('services.tmdb.api_key'),
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) throw new Exception('Error al encontrar la peli' . $response->body());

        $data = $response->json();

        try {

            $movie = Frame::updateOrCreate(
                ['id' => $data['id']],
                [
                    'titulo' => $data['title'],
                    'titulo_original' => $data['original_title'],
                    'descripcion' => $data['overview'],
                    'poster_url' => $data['poster_path'] ?? 'default.png',
                    'fondo_url' => $data['backdrop_path'] ?? 'default.png',
                    'fecha_estreno' => $data['release_date'],
                    'duracion' => $data['runtime'],
                    'promedio_votos_tmdb' => $data['vote_average'],
                    'cantidad_votos_tmdb' => $data['vote_count'],
                    'popularity' => $data['popularity'],
                    'estado' => $data['status'],
                    'presupuesto' => $data['budget'],
                    'ingresos' => $data['revenue'],
                    'eslogan' => $data['tagline'],
                    'pagina_oficial' => $data['homepage']
                ]
            );

            // Géneros
            if (!empty($data['genres'])) {
                $genreIds = [];
                foreach ($data['genres'] as $genreData) {
                    $genre = Genero::firstOrCreate(
                        ['id' => $genreData['id']],
                        ['nombre' => $genreData['name']]
                    );
                    $genreIds[] = $genre->id;
                }
                $movie->generos()->sync($genreIds);
            }

            $credits = Http::get("https://api.themoviedb.org/3/movie/{$this->tmdbId}/credits", [
                'api_key' => config('services.tmdb.api_key'),
            ]);

            if ($credits->successful()) {
                $cast = collect($credits->json()['cast'] ?? [])
                    ->sortBy('order')
                    ->take(20);

                $actorSync = [];

                foreach ($cast as $actorData) {
                    $actor = Actor::updateOrCreate(
                        ['id' => $actorData['id']],
                        [
                            'nombre' => $actorData['name'],
                            'imagen_url' => $actorData['profile_path'] ?? 'default.png',
                            'popularidad' => $actorData['popularity'],
                        ]
                    );

                    $actorSync[$actor->id] = [
                        'orden' => $actorData['order'],
                        'personaje' => $actorData['character'] ?? null,
                    ];
                }

                $movie->actores()->sync($actorSync);
            }
        } catch (\Throwable $e) {
            Log::error('Fallo al importar película', [
                'tmdb_id' => $this->tmdbId,
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }
    }

    public function failed(\Throwable $exception): void
    {
        Log::critical("Job ImportMovieFromTMDB falló para movie ID {$this->tmdbId}. Error: " . $exception->getMessage());
    }
}
