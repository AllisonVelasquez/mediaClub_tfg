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

        // return $model->likes()->with('usuario')->get();
        return $model->likes()->count();
    }

    public function addLike(string $modelName, int $modelId, int $userId): Megusta
    {
        $modelClass = $this->resolveModelClass($modelName);

        $model = $modelClass::findOrFail($modelId);

        $existingLike = $model->likes()->where('usuario_id', $userId)->first();
        if ($existingLike) {
            return $existingLike; 
        }
        
        return $model->likes()->create([
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
            'reviews' => Resena::class,
            // 'posts' => Post::class,
            // 'comentarios' => Comentario::class,
            default => throw new \InvalidArgumentException("Tipo inválido"),
        };
    }
}
