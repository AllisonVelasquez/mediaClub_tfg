<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


/**
 * Class Hilo
 * 
 * @property int $id
 * @property int $usuario_id
 * @property int $frame_id
 * @property string $titulo
 * @property string $contenido
 * @property Carbon $fecha_creacion
 * 
 * @property Usuario $usuario
 * @property Frame $frame
 * @property Collection|RespuestaHilo[] $respuesta_hilos
 *
 * @package App\Models
 */
class Post extends Model
{
	use HasFactory;

	protected $table = 'post';
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
		'`publico' => 'boolean'
	];

	protected $fillable = [
		'usuario_id',
		'contenido',
		'publico'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function likes()
	{
		return $this->morphMany(Megusta::class, 'likeable');
	}
	public function actividad()
	{
		return $this->morphOne(Actividad::class, 'activitable');
	}
}
