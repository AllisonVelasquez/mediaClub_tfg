<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Resena
 * 
 * @property int $id
 * @property int $usuario_id
 * @property int $frame_id
 * @property Carbon|null $fecha
 * @property string $contenido
 * @property bool|null $spoiler
 * 
 * @property Usuario $usuario
 * @property Frame $frame
 *
 * @package App\Models
 */
class Resena extends Model
{
	protected $table = 'resena';
	protected $primaryKey = 'id';
	
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'frame_id' => 'int',
		'fecha' => 'datetime',
		'spoiler' => 'bool'
	];

	protected $fillable = [
		'usuario_id',
		'frame_id',
		'fecha',
		'contenido',
		'spoiler'
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
