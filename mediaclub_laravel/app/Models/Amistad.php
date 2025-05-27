<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Amistad
 * 
 * @property int $usuario_id
 * @property int $amigo_id
 * 
 * @property Usuario $usuario
 *
 * @package App\Models
 */
class Amistad extends Model
{
	protected $table = 'amistad';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'usuario_id' => 'int',
		'amigo_id' => 'int'
	];

	public function usuario()
	{
		return $this->belongsTo(Usuario::class);
	}
}
