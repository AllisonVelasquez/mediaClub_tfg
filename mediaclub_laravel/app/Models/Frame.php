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
 * @property string|null $titulo_original
 * @property string|null $descripcion
 * @property Carbon|null $fecha_estreno
 * @property string|null $poster_url
 * @property string|null $fondo_url
 * @property int|null $duracion
 * @property float|null $promedio_votos_tmdb
 * @property int|null $cantidad_votos
 * @property float|null $popularidad
 * @property string|null $estado
 * @property int|null $presupuesto
 * @property int|null $ingresos
 * @property string|null $eslogan
 * @property string|null $pagina_oficial
 * 
 * @property Collection|Actividad[] $actividads
 * @property Collection|Actor[] $actors
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
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'frame_id' => 'int',
		'fecha_estreno' => 'datetime',
		'duracion' => 'int',
		'promedio_votos_tmdb' => 'float',
		'cantidad_votos' => 'int',
		'popularidad' => 'float',
		'presupuesto' => 'int',
		'ingresos' => 'int'
	];

	protected $fillable = [
		'frame_id',
		'titulo',
		'titulo_original',
		'descripcion',
		'fecha_estreno',
		'poster_url',
		'fondo_url',
		'duracion',
		'promedio_votos_tmdb',
		'cantidad_votos',
		'popularidad',
		'estado',
		'presupuesto',
		'ingresos',
		'eslogan',
		'pagina_oficial'
	];

	public function actividads()
	{
		return $this->hasMany(Actividad::class);
	}

	public function actors()
	{
		return $this->belongsToMany(Actor::class,'actor_frame','frame_id','actor_id')
					->withPivot('personaje', 'orden');
	}

	public function generos()
	{
		return $this->belongsToMany(Genero::class,'frame_genero','frame_id','genero_id','frame_id','genero_id');
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
