<?php

namespace App\Console\Commands;

use App\Jobs\FetchAllTmdbMovies;
use Illuminate\Console\Command;

class ImportTmdbMovies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tmdb:import-movies {--pages=500 : Número máximo de páginas por categoría}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importa películas de TMDB por categorías y páginas, y guarda sus detalles.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
       $pages = (int) $this->option('pages');
        $this->info("Lanzando importación de películas TMDB (hasta {$pages} páginas por categoría)...");

        FetchAllTmdbMovies::dispatch($pages);

        $this->info('✅ Proceso de importación encolado correctamente.');
        return Command::SUCCESS;
    }
}
