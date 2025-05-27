<?php

namespace App\Console\Commands;

use App\Jobs\ImportTmdbMoviesPageJob;
use Illuminate\Console\Command;

class ImportMoviesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:movies {pages=1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importar peliculas desde TMDB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $pages = (int) $this->argument('pages');

        for ($page = 1; $page <= $pages; $page++) {
            ImportTmdbMoviesPageJob::dispatch($page);
            $this->info("Job despachado para página $page");
        }

        $this->info("Todos los jobs para importar películas han sido despachados.");
    }
}
