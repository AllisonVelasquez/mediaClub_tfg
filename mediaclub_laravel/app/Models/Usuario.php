<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Usuario
 * 
 * @property int $usuario_id
 * @property string $login_id
 * @property string $correo
 * @property string $contrasena
 * @property string $alias
 * @property string|null $bio
 * @property string|null $redes
 * @property string|null $foto_perfil
 * @property Carbon|null $fecha_creacion
 * @property Carbon|null $fecha_ultima_actualizacion
 * @property bool|null $confirmado
 * @property bool|null $bloqueado
 * 
 * @property Collection|Actividad[] $actividads
 * @property Collection|Amistad[] $amistads
 * @property Collection|Hilo[] $hilos
 * @property Collection|Listum[] $lista
 * @property Collection|Megustum[] $megusta
 * @property Collection|Puntuacion[] $puntuacions
 * @property Collection|Resena[] $resenas
 * @property Collection|RespuestaHilo[] $respuesta_hilos
 * @property Collection|SesionUsuario[] $sesion_usuarios
 *
 * @package App\Models
 */
class Usuario extends Model
{
	protected $table = 'usuario';
	protected $primaryKey = 'usuario_id';
	public $timestamps = false;

	protected $casts = [
		'fecha_creacion' => 'datetime',
		'fecha_ultima_actualizacion' => 'datetime',
		'confirmado' => 'bool',
		'bloqueado' => 'bool'
	];

	protected $fillable = [
		'login_id',
		'correo',
		'contrasena',
		'alias',
		'bio',
		'redes',
		'foto_perfil',
		'fecha_creacion',
		'fecha_ultima_actualizacion',
		'confirmado',
		'bloqueado'
	];

	public function actividads()
	{
		return $this->hasMany(Actividad::class);
	}

	public function amistads()
	{
		return $this->hasMany(Amistad::class);
	}

	public function hilos()
	{
		return $this->hasMany(Hilo::class);
	}

	public function lista()
	{
		return $this->hasMany(Listum::class);
	}

	public function megusta()
	{
		return $this->hasMany(Megustum::class);
	}

	public function puntuacions()
	{
		return $this->hasMany(Puntuacion::class);
	}

	public function resenas()
	{
		return $this->hasMany(Resena::class);
	}

	public function respuesta_hilos()
	{
		return $this->hasMany(RespuestaHilo::class);
	}

	public function sesion_usuarios()
	{
		return $this->hasMany(SesionUsuario::class);
	}
}
