<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Actor
 * 
 * @property int $actor_id
 * @property string $nombre
 * @property string|null $conocido_como
 * @property string|null $imagen_url
 * @property Carbon|null $fecha_nacimiento
 * @property int|null $edad
 * @property float|null $popularidad
 * 
 * @property Collection|Frame[] $frames
 *
 * @package App\Models
 */
class Actor extends Model
{
	protected $table = 'actor';
	protected $primaryKey = 'actor_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'actor_id' => 'int',
		'fecha_nacimiento' => 'datetime',
		'edad' => 'int',
		'popularidad' => 'float'
	];

	protected $fillable = [
		'nombre',
		'conocido_como',
		'imagen_url',
		'fecha_nacimiento',
		'edad',
		'popularidad'
	];

	public function frames()
	{
		return $this->belongsToMany(Frame::class)
			->withPivot('personaje', 'orden');
	}
}
