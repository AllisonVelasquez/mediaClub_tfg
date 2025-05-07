<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Megustum
 * 
 * @property int $megusta_id
 * @property int $usuario_id
 * @property int $entidad_id
 * @property string $tipo_entidad
 * @property Carbon|null $fecha
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class Megustum extends Model
{
	protected $table = 'megusta';
	protected $primaryKey = 'megusta_id';
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'entidad_id' => 'int',
		'fecha' => 'datetime'
	];

	protected $fillable = [
		'usuario_id',
		'entidad_id',
		'tipo_entidad',
		'fecha'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}
}
