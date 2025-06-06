<?php

namespace App\Repositories\Like;

use App\Models\Lista;
use App\Models\Megusta;
use App\Models\Post;
use App\Models\Resena;
use Exception;

class LikeRepository implements LikeRepositoryInterface
{
    public function getLikes(string $modelName, int $modelId)
    {
        $modelClass = $this->resolveModelClass($modelName);
        $model = $modelClass::findOrFail($modelId);

        if (($modelClass === 'listas' || $modelClass === 'posts') && !$model->publica) {
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

        if ($model->likes()->where('usuario_id', $userId)->exists()) {
            throw new Exception('No se puede dar me gusta mas de una vez.',422);
        }

        return $model->likes()->create(['usuario_id' => $userId]);
    }

    public function removeLike(string $modelName, int $modelId, int $userId): bool
    {
        return Megusta::where('likeable_type', $this->resolveModelClass($modelName))
            ->where('likeable_id', $modelId)
            ->where('usuario_id', $userId)
            ->delete() > 0;
    }

    public function resolveModelClass(string $modelName): string
    {
        return match ($modelName) {
            'listas' => Lista::class,
            'resenas' => Resena::class,
            'posts' => Post::class,
            default => throw new \InvalidArgumentException("Tipo inválido"),
        };
    }
}
