<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class RespuestaHilo
 * 
 * @property int $id
 * @property int $hilo_id
 * @property int $usuario_id
 * @property string $contenido
 * @property Carbon $fecha
 * @property int|null $respuesta_a
 * 
 * @property Hilo $hilo
 * @property Usuario $usuario
 * @property RespuestaHilo|null $respuesta_hilo
 * @property Collection|RespuestaHilo[] $respuesta_hilos
 *
 * @package App\Models
 */
class RespuestaPost extends Model
{
	use HasFactory;

	protected $table = 'respuesta_post';
	protected $primaryKey = 'id';


	protected $casts = [
		'post_id' => 'int',
		'usuario_id' => 'int',
		'respuesta_a' => 'int'
	];

	protected $fillable = [
		'hilo_id',
		'usuario_id',
		'contenido',
		'respuesta_a'
	];

	public function post()
	{
		return $this->belongsTo(Post::class);
	}

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function respuestas_hijas()
	{
		return $this->hasMany(RespuestaPost::class, 'respuesta_a');
	}

	public function respuesta_post()
	{
		return $this->belongsTo(RespuestaPost::class, 'respuesta_a');
	}

	public function likes()
    {
        return $this->morphMany(Megusta::class, 'likeable');
    }
}
