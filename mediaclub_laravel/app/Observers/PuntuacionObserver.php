<?php

namespace App\Observers;

use App\Models\Puntuacion;
use App\Models\Frame;


class PuntuacionObserver
{
    /**
     * Handle the Puntuacion "created" event.
     */
    public function created(Puntuacion $puntuacion): void
    {
        $this->updateFrameRates($puntuacion->frame_id);
    }

    /**
     * Handle the Puntuacion "updated" event.
     */
    public function updated(Puntuacion $puntuacion): void
    {
        $this->updateFrameRates($puntuacion->frame_id);
    }

    /**
     * Handle the Puntuacion "deleted" event.
     */
    public function deleted(Puntuacion $puntuacion): void
    {
        $this->updateFrameRates($puntuacion->frame_id);
    }

    /**
     * Handle the Puntuacion "restored" event.
     */
    // public function restored(Puntuacion $puntuacion): void
    // {
    //     //
    // }

    /**
     * Handle the Puntuacion "force deleted" event.
     */
    // public function forceDeleted(Puntuacion $puntuacion): void
    // {
    //     //
    // }

    protected function updateFrameRates($frameId)
    {
        $frame = Frame::findOrFail($frameId);

        $stats = Puntuacion::where('frame_id', $frameId)
            ->selectRaw('AVG(puntuacion) as avg_rate, COUNT(*) as count_rate')
            ->first();

        $frame->promedio_votos_muvis = $stats->avg_rate ?? 0;
        $frame->cantidad_votos_muvis = $stats->count_rate ?? 0;
        $frame->save();
    }
}
