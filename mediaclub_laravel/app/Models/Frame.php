<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Frame
 * 
 * @property int $frame_id
 * @property string $titulo
 * @property string $tipo_contenido
 * @property Carbon|null $fecha_lanzamiento
 * @property int|null $duracion
 * @property int|null $numero_episodios
 * @property string|null $poster_url
 * @property string|null $puntuacion_dbs
 * @property string|null $personajes
 * 
 * @property Collection|Actividad[] $actividads
 * @property Collection|Genero[] $generos
 * @property Collection|FrameListum[] $frame_lista
 * @property Collection|Hilo[] $hilos
 * @property Collection|Puntuacion[] $puntuacions
 * @property Collection|Resena[] $resenas
 *
 * @package App\Models
 */
class Frame extends Model
{
	protected $table = 'frame';
	protected $primaryKey = 'frame_id';
	public $timestamps = false;

	protected $casts = [
		'fecha_lanzamiento' => 'datetime',
		'duracion' => 'int',
		'numero_episodios' => 'int'
	];

	protected $fillable = [
		'titulo',
		'tipo_contenido',
		'fecha_lanzamiento',
		'duracion',
		'numero_episodios',
		'poster_url',
		'puntuacion_dbs',
		'personajes'
	];

	public function actividads()
	{
		return $this->hasMany(Actividad::class);
	}

	public function generos()
	{
		return $this->belongsToMany(Genero::class);
	}

	public function frame_lista()
	{
		return $this->hasMany(FrameListum::class);
	}

	public function hilos()
	{
		return $this->hasMany(Hilo::class);
	}

	public function puntuacions()
	{
		return $this->hasMany(Puntuacion::class);
	}

	public function resenas()
	{
		return $this->hasMany(Resena::class);
	}
}
