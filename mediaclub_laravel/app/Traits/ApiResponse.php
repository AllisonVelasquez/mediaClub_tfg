<?php
namespace App\Traits;

trait ApiResponse
{
    public function success($data=null, $message = 'OK', $status = 200, )
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status' => $status
        ], $status);
    }

    public function error($message = 'Error del servidor', $status = 500, $data = null)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'status' => $status,
        ], $status);
    }
}
