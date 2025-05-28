<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Genero
 * 
 * @property int $genero_id
 * @property string $nombre
 * 
 * @property Collection|Frame[] $frames
 *
 * @package App\Models
 */
class Genero extends Model
{
	protected $table = 'genero';
	protected $primaryKey = 'genero_id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'genero_id' => 'int'
	];

	protected $fillable = [
		'genero_id',
		'nombre'
	];

	public function frames()
	{
		return $this->belongsToMany(Frame::class,'frame_genero','genero_id','frame_id','genero_id','frame_id');
	}
}
