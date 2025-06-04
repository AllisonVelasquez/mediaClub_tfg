<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Solicitud
 * 
 * @property int $id
 * @property int $remitente_id
 * @property int $destinatario_id
 * @property string $estado
 * @property Carbon|null $fecha_solicitud
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class Solicitud extends Model
{
	protected $table = 'solicitud';
	protected $primaryKey = 'id';

	protected $casts = [
		'remitente_id' => 'int',
		'destinatario_id' => 'int',
	];

	protected $fillable = [
		'remitente_id',
		'destinatario_id',
		'estado',
	];

	public function destinatario()
	{
		return $this->belongsTo(Usuario::class, 'destinatario_id');
	}

	public function remitente()
	{
		return $this->belongsTo(Usuario::class, 'remitente_id');
	}
}
