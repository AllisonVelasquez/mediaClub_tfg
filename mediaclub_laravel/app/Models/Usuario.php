<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

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
 * @property Carbon $fecha_creacion
 * @property Carbon|null $fecha_ultima_actualizacion
 * @property bool $confirmado
 * 
 * @property Collection|Actividad[] $actividads
 * @property Collection|Amistad[] $amistads
 * @property Collection|Hilo[] $hilos
 * @property Collection|Listum[] $lista
 * @property Collection|Megustum[] $megusta
 * @property Collection|Puntuacion[] $puntuacions
 * @property Collection|Resena[] $resenas
 * @property Collection|RespuestaHilo[] $respuesta_hilos
 * @property Collection|Solicitud[] $solicituds
 *
 * @package App\Models
 */
class Usuario extends Model
{
	//Para poder generar tokens de sesion.
	use HasApiTokens;

	protected $table = 'usuario';
	protected $primaryKey = 'usuario_id';
	public $timestamps = false;

	protected $casts = [
		'fecha_creacion' => 'datetime',
		'fecha_ultima_actualizacion' => 'datetime',
		'confirmado' => 'bool'
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
		'confirmado'
	];

	public function actividads()
	{
		return $this->hasMany(Actividad::class);
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

	public function solicituds_recibidas()
	{
		return $this->hasMany(Solicitud::class, 'destinatario_id');
	}
	public function solicituds_enviadas()
	{
		return $this->hasMany(Solicitud::class, 'remitente_id');
	}

	public function amigos() : Collection
	{
		$amistades = Amistad::deUsuario($this->usuario_id)->get();
		$amigosIds = $amistades->map(function ($amistad) {
			return $amistad->user_id == $this->usuario_id ? $amistad->amigo_id : $amistad->usuario_id;
		});
		return Usuario::whereIn('usuario_id', $amigosIds)->get();
	}
}
