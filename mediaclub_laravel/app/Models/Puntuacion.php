<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Puntuacion
 * 
 * @property int $puntuacion_id
 * @property int $usuario_id
 * @property int $frame_id
 * @property float $puntuacion
 * @property Carbon|null $fecha
 * 
 * @property Usuario $usuario
 * @property Frame $frame
 *
 * @package App\Models
 */
class Puntuacion extends Model
{
	protected $table = 'puntuacion';
	protected $primaryKey = 'puntuacion_id';
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'frame_id' => 'int',
		'puntuacion' => 'float',
		'fecha' => 'datetime'
	];

	protected $fillable = [
		'usuario_id',
		'frame_id',
		'puntuacion',
		'fecha'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function frame()
	{
		return $this->belongsTo(Frame::class);
	}
}
