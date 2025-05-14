<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Database\QueryException;
use App\Exceptions\UserNotFoundException;
use Throwable;


class Handler extends ExceptionHandler
{
    use ApiResponse;
    /**
     * Una lista de las excepciones que deben ser reportadas.
     *
     * @var array<int|string, class-string<Throwable>>
     */
    protected $dontReport = [
        // AuthenticationException::class,
        AuthorizationException::class,
        // ModelNotFoundException::class,
        // NotFoundHttpException::class,
        TokenMismatchException::class,
    ];

    /**
     * Una lista de las excepciones que se deben renderizar.
     *
     * @var array<int|string, class-string<Throwable>>
     */
    protected $renderable = [
        //
    ];

    /**
     * Registra los errores que deben ser reportados.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Registra la respuesta que se va a devolver para una excepción.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     */
    public function render($request, Throwable $exception)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            // Si la excepción es de modelo no encontrado (ModelNotFoundException)
            if ($exception instanceof ModelNotFoundException) {
                return $this->error('No se encontró el modelo solicitado.', 404);
            }

            // Para AuthenticationException, devolver un error 401
            if ($exception instanceof AuthenticationException) {
                return $this->error($exception->getMessage(), 401);
            }

            // Manejo de la excepción ValidationException
            if ($exception instanceof ValidationException) {
                $errors = $exception->validator->errors()->toArray();
                $firstErrorMessage = collect($errors)->flatten()->first();
                return $this->error($firstErrorMessage ?? 'Error de validación', 422, $errors);
            }

            // Manejo de error en la consulta a la base de datos
            if ($exception instanceof QueryException) {
                return $this->error('Error en la consulta a la base de datos.', 500);
            }

            // Si ninguna de las excepciones anteriores se maneja, devolvemos un error genérico
            return $this->error('Error inesperado', 500, $exception->getMessage());
        }
    }
}
