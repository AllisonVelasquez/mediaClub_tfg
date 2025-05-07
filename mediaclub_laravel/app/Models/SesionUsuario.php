<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SesionUsuario
 * 
 * @property int $sesion_usuario_id
 * @property int $usuario_id
 * @property Carbon|null $fecha_inicio
 * @property Carbon|null $fecha_fin
 * @property string $token
 * @property string|null $navegador
 * @property bool|null $activa
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class SesionUsuario extends Model
{
	protected $table = 'sesion_usuario';
	protected $primaryKey = 'sesion_usuario_id';
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'fecha_inicio' => 'datetime',
		'fecha_fin' => 'datetime',
		'activa' => 'bool'
	];

	protected $hidden = [
		'token'
	];

	protected $fillable = [
		'usuario_id',
		'fecha_inicio',
		'fecha_fin',
		'token',
		'navegador',
		'activa'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}
}
