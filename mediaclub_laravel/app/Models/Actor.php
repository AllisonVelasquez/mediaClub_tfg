<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Class Actor
 * 
 * @property int $id
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
	protected $primaryKey = 'id';

	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'popularidad' => 'float'
	];

	protected $fillable = [
		'id',
		'nombre',
		'imagen_url',
		'popularidad'
	];

	public function frames()
	{
		return $this->belongsToMany(Frame::class)
			->withPivot('personaje', 'orden');
	}
	public function getImagenUrlAttribute($value)
	{
		if (is_null($value)) {
			return asset('storage/actors/default.png');
		}
		if (Str::startsWith($value, '/')) {
			return 'https://image.tmdb.org/t/p/w185' . $value;
		}
		return asset($value);
	}
}
