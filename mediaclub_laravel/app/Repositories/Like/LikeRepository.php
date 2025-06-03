<?php

use App\Models\Lista;
use App\Models\Megusta;
use App\Models\Resena;

class LikeRepository
{
    public function getLikes(string $modelName, int $modelId)
    {
        $modelClass = $this->resolveModelClass($modelName);
        $model = $modelClass::findOrFail($modelId);

        if ($modelClass === 'listas' && !$model->publica) {
            throw new Exception('Esta lista no es publica', 403);
        }
        // return $model->likes()->with('usuario')->get();
        return $model->likes()->count();
    }

    public function addLike(string $modelName, int $modelId, int $userId): Megusta
    {
        $modelClass = $this->resolveModelClass($modelName);

        $model = $modelClass::findOrFail($modelId);

        if ($modelClass === 'listas' && !$model->publica) {
            throw new Exception('Esta lista no es publica.', 403);
        }

        return $model->likes()->firstOrCreate([
            'usuario_id' => $userId,
        ]);
    }

    public function removeLike(string $modelName, int $modelId, int $userId): bool
    {
        return Megusta::where('likeable_type', $this->resolveModelClass($modelName))
            ->where('likeable_id', $modelId)
            ->where('usuario_id', $userId)
            ->delete() > 0;
    }

    protected function resolveModelClass(string $modelName): string
    {
        return match ($modelName) {
            'listas' => Lista::class,
            'resenas' => Resena::class,
            // 'posts' => Post::class,
            // 'comentarios' => Comentario::class,
            default => throw new \InvalidArgumentException("Tipo inválido"),
        };
    }
}
