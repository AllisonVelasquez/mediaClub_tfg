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
 * @property int $id
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
class Lista extends Model
{
	protected $table = 'lista';
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
		'publica' => 'bool'
	];

	protected $fillable = [
		'usuario_id',
		'nombre_lista',
		'publica'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function frames_img()
	{
		return $this->belongsToMany(Frame::class)
			->select('id','poster_url');
	}
	public function frames()
	{
		return $this->belongsToMany(Frame::class)
			->withPivot('fecha')
			->select('id', 'titulo', 'fecha_estreno');
	}
}
