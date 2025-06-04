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
 * @property int $id
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
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
		'frame_id' => 'int',
		'puntuacion' => 'float',
	];

	protected $fillable = [
		'usuario_id',
		'frame_id',
		'puntuacion',
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function frame()
	{
		return $this->belongsTo(Frame::class)
		->select('id','titulo', 'poster_url');
	}
}
