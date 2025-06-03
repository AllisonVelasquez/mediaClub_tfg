<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Actividad
 * 
 * @property int $id
 * @property int $usuario_id
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class Actividad extends Model
{
	protected $table = 'actividad';
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
		'metadata' => 'array',

	];

	protected $fillable = [
		'usuario_id',
		'activitable_id',
		'activitable_type',
		'tipo',
		'descripcion',
		'metadata',
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}

	public function activitable()
	{
		return $this->morphTo();
	}
}
