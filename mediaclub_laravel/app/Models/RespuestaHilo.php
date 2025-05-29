<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
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
class RespuestaHilo extends Model
{
	protected $table = 'respuesta_hilo';
	protected $primaryKey = 'id';


	protected $casts = [
		'hilo_id' => 'int',
		'usuario_id' => 'int',
		'respuesta_a' => 'int'
	];

	protected $fillable = [
		'hilo_id',
		'usuario_id',
		'contenido',
		'respuesta_a'
	];

	public function hilo()
	{
		return $this->belongsTo(Hilo::class);
	}

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function respuesta_hilo()
	{
		return $this->belongsTo(RespuestaHilo::class, 'respuesta_a');
	}

	public function respuesta_hilos()
	{
		return $this->hasMany(RespuestaHilo::class, 'respuesta_a');
	}
}
