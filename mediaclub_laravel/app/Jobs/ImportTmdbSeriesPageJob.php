<?php

namespace App\Jobs;
use App\Models\Frame;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Services\External\TmdbService;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;

class ImportTmdbSeriesPageJob implements ShouldQueue
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

        $seriesData = $this->tmdb->getSeries($this->page);

        foreach ($seriesData as $serieData) {

            $serie = Frame::updateOrCreate(
                ['frame_id' => $serieData['id']],
                [
                    'titulo' => $serieData['name'],
                    'tipo_contenido' =>'serie',
                    'poster_url' => $serieData['poster_path'] ?? null,
                    'fecha_lanzamiento' => $serieData['first_air_date'] ?? null,
                    'descripcion' => $serieData['overview'] ?? null,
                    'puntuacion_dbs' =>json_encode([
                        'tmdb' => $serieData['vote_average'] ?? null,
                        'vote_count' => $serieData['vote_count'] ?? null,
                    ])
                ]
            );

            $genreIds = $serieData['genre_ids'];
            $serie->generos()->sync($genreIds);
        }
    }
}
