<?php

namespace App\Console\Commands;

use App\Jobs\ImportTmdbSeriesPageJob;
use Illuminate\Console\Command;

class ImportSeriesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:series {pages=1}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importar series desde TMDB';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $pages = (int) $this->argument('pages');

        for ($page = 1; $page <= $pages; $page++) {
            ImportTmdbSeriesPageJob::dispatch($page);
            $this->info("Job despachado para página $page");
        }

        $this->info("Todos los jobs para importar series han sido despachados.");
    }
}
