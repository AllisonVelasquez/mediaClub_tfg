<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Actividad
 * 
 * @property int $actividad_id
 * @property int $usuario_id
 * @property int $frame_id
 * @property Carbon $fecha
 * @property string $tipo
 * 
 * @property Usuario $usuario
 * @property Frame $frame
 *
 * @package App\Models
 */
class Actividad extends Model
{
	protected $table = 'actividad';
	protected $primaryKey = 'actividad_id';
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'frame_id' => 'int',
		'fecha' => 'datetime'
	];

	protected $fillable = [
		'usuario_id',
		'frame_id',
		'fecha',
		'tipo'
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
