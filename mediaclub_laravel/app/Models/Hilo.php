<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

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
class Hilo extends Model
{
	protected $table = 'hilo';
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
		'frame_id' => 'int',
	];

	protected $fillable = [
		'usuario_id',
		'frame_id',
		'titulo',
		'contenido',
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function frame()
	{
		return $this->belongsTo(Frame::class);
	}

	public function respuesta_hilos()
	{
		return $this->hasMany(RespuestaHilo::class);
	}
}
