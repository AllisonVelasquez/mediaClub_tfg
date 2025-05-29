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
		return $this->belongsTo(Usuario::class, 'usuario_id');
	}

	public function amigo()
	{
		return $this->belongsTo(Usuario::class, 'amigo_id');
	}

	//scope para ver si son amigos ya
	public function scopeEntre($query, $id1, $id2)
	{
		return $query->where(function ($q) use ($id1, $id2) {
			$q->where('usuario_id', $id1)->where('amigo_id', $id2);
		})->orWhere(function ($q) use ($id1, $id2) {
			$q->where('usuario_id', $id2)->where('amigo_id', $id1);
		});
	}
	//lista de amigos de un user
	public function scopeDeUsuario($query, $id1)
	{
		return $query->where('usuario_id', $id1)
			->orWhere('amigo_id', $id1);
	}
}
