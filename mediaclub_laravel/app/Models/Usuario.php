<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

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
class Usuario extends Authenticatable
{
	use HasApiTokens;
	use Notifiable;

	protected $table = 'usuario';
	protected $primaryKey = 'id';

	protected $casts = [
	];

	protected $fillable = [
		'login_id',
		'correo',
		'contrasena',
		'alias',
		'bio',
		'redes',
		'foto_perfil',
	];

	public function actividades()
	{
		return $this->hasMany(Actividad::class);
	}

	public function posts()
	{
		return $this->hasMany(Post::class);
	}

	public function lista()
	{
		return $this->hasMany(Lista::class);
	}

	public function megusta()
	{
		return $this->hasMany(Megusta::class);
	}

	public function puntuaciones()
	{
		return $this->hasMany(Puntuacion::class);
	}

	public function resenas()
	{
		return $this->hasMany(Resena::class);
	}

	public function solicitudes_recibidas()
	{
		return $this->hasMany(Solicitud::class, 'destinatario_id');
	}
	public function solicituds_enviadas()
	{
		return $this->hasMany(Solicitud::class, 'remitente_id');
	}

	public function amigos(): Collection
	{
		$amistades = Amistad::deUsuario($this->id)->get();
		$amigosIds = $amistades->map(function ($amistad) {
			return $amistad->usuario_id == $this->id ? $amistad->amigo_id : $amistad->usuario_id;
		})->unique()->filter()->values();
		return Usuario::whereIn('id', $amigosIds)
				->select('id','alias','foto_perfil')
				->get();
	}
}
