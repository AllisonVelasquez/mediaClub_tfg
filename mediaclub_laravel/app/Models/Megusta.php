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
 * @property int id
 * @property int $usuario_id
 * @property int $entidad_id
 * @property string $tipo_entidad
 * @property Carbon|null $fecha
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class Megusta extends Model
{
	protected $table = 'megusta';
	protected $primaryKey = 'id';

	protected $casts = [
		'usuario_id' => 'int',
	];

	protected $fillable = [
		'usuario_id',
	];

	public function likeable()
    {
        return $this->morphTo();
    }

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}
}
