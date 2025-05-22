<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Listum
 * 
 * @property int $lista_id
 * @property int $usuario_id
 * @property string $nombre_lista
 * @property Carbon|null $fecha_creacion
 * @property bool|null $publica
 * 
 * @property Usuario $usuario
 * @property Collection|FrameListum[] $frame_lista
 *
 * @package App\Models
 */
class Listum extends Model
{
	protected $table = 'lista';
	protected $primaryKey = 'lista_id';
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'fecha_creacion' => 'datetime',
		'publica' => 'bool'
	];

	protected $fillable = [
		'usuario_id',
		'nombre_lista',
		'fecha_creacion',
		'publica'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function frames()
	{
		return $this->belongsToMany(Frame::class, 'frame_listum', 'lista_id', 'frame_id')->withTimestamps();
	}
}
