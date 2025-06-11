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
 * Class Frame
 * 
 * @property int $id
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
	protected $primaryKey = 'id';

	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'fecha_estreno' => 'datetime',
		'duracion' => 'int',
		'promedio_votos_tmdb' => 'float',
		'cantidad_votos_tmdb' => 'int',
		'promedio_votos_muvis' => 'float',
		'cantidad_votos_muvis' => 'int',
		'popularidad' => 'float',
		'presupuesto' => 'int',
		'ingresos' => 'int'
	];

	protected $fillable = [
		'id',
		'titulo',
		'titulo_original',
		'descripcion',
		'fecha_estreno',
		'poster_url',
		'fondo_url',
		'duracion',
		'promedio_votos_tmdb',
		'cantidad_votos_tmdb',
		'promedio_votos_muvis',
		'cantidad_votos_muvis',
		'popularidad',
		'estado',
		'presupuesto',
		'ingresos',
		'eslogan',
		'pagina_oficial'
	];

	public function actividades()
	{
		return $this->hasMany(Actividad::class);
	}

	public function actores()
	{
		return $this->belongsToMany(Actor::class)
			->withPivot('personaje', 'orden');
	}

	public function generos()
	{
		return $this->belongsToMany(Genero::class)
			->select('id', 'nombre');
	}

	public function listas()
	{
		return $this->belongsToMany(Lista::class);
	}

	public function puntuaciones()
	{
		return $this->hasMany(Puntuacion::class);
	}

	public function resenas()
	{
		return $this->hasMany(Resena::class);
	}

	public function scopeCategoriesData($query)
	{
		return $query->select('id', 'titulo', 'poster_url', 'fecha_estreno', 'promedio_votos_tmdb', 'promedio_votos_muvis');
	}

	public function scopeSearchData($query)
	{
		return $query->select('id', 'titulo', 'poster_url');
	}

	public function getPosterUrlAttribute($value)
	{
		if (Str::startsWith($value, '/')) {
			return $value;
		}
		return asset($value);
	}
}
