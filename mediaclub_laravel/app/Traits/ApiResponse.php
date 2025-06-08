<?php

namespace App\Traits;

trait ApiResponse
{
    public function success($message = 'OK', $code = 200, $contenido = null)
    {

        if ($code < 100 || $code > 599) {
            $code = 200;
        }
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'contenido' => $contenido,
            'code' => $code,
        ], $code);
    }

    public function error($message = 'Error del servidor (db)', $code = 500, $contenido = null)
    {
        if ($code < 100 || $code > 599) {
            $code = 500;
        }

        return response()->json([
            'status' => 'error',
            'message' => $message,
            'contenido' => $contenido,
            'code' => $code,
        ], $code);
    }
}
