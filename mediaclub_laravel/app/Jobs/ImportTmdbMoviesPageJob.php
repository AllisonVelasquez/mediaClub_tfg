<?php

namespace App\Jobs;
use App\Models\Frame;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Services\External\TmdbService;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;

class ImportTmdbMoviesPageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected int $page;
    protected TmdbService $tmdb;

    /**
     *
     * @param int $page
     */
    public function __construct(int $page)
    {
        $this->page = $page;
        $this->tmdb = app(TmdbService::class);
    }

    /**
     */
    public function handle(): void
    {

        $moviesData = $this->tmdb->getPopular($this->page);

        foreach ($moviesData as $movieData) {

            $movie = Frame::updateOrCreate(
                ['frame_id' => $movieData['id']],
                [
                    'titulo' => $movieData['title'],
                    'tipo_contenido' =>'pelicula',
                    'poster_url' => $movieData['poster_path'] ?? null,
                    'fecha_lanzamiento' => $movieData['release_date'] ?? null,
                    'descripcion' => $movieData['overview'] ?? null,
                    'duracion' => $movieData['runtime'] ?? null,
                    'puntuacion_dbs' =>json_encode([
                        'tmdb' => $movieData['vote_average'] ?? null,
                        'vote_count' => $movieData['vote_count'] ?? null,
                    ])
                ]
            );

            $genreIds = $movieData['genre_ids'];
            $movie->generos()->sync($genreIds);
        }
    }
}
