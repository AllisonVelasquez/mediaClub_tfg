<?php

namespace App\Jobs;

use App\Models\Actor;
use App\Models\Frame;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Services\External\TmdbService;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Queueable;


class ImporTmdbActorsFramesPageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected TmdbService $tmdb;
    protected $frameId;
    /**
     * Create a new job instance.
     */
    public function __construct(int $frameId)
    {
        $this->tmdb = app(TmdbService::class);
        $this->frameId = $frameId;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $frame = Frame::where('frame_id', $this->frameId)->firstOrFail();

        $cast = $this->tmdb->getMovieCredits($this->frameId);

        foreach ($cast as $actorData) {
            $actor = Actor::updateOrCreate(
                ['actor_id' => $actorData['id']],
                [
                    'nombre' => $actorData['name'],
                    'imagen_url' => $actorData['profile_path'] ?? null,
                    'conocido_como' => $actorData['known_for'] ?? null,
                    'fecha_nacimiento'=>$actorData['birthday'] ?? null,
                    'edad'=>$actorData['age'] ?? null,
                    'popularidad' =>$actorData['popularity'] ?? null 
                ]
            );

            DB::table('actor_frame')->updateOrInsert(
                [
                    'frame_id' => $frame->frame_id,
                    'actor_id' => $actor->actor_id,
                ],
                [
                    'personaje' => $actorData['character'] ?? null,
                    'orden' => $actorData['order'] ?? null,
                ]
            );
        }
    }
}
