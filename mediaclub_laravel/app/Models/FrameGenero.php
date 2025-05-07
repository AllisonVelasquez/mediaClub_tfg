<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FrameGenero
 * 
 * @property int $frame_id
 * @property int $genero_id
 * 
 * @property Frame $frame
 * @property Genero $genero
 *
 * @package App\Models
 */
class FrameGenero extends Model
{
	protected $table = 'frame_genero';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'frame_id' => 'int',
		'genero_id' => 'int'
	];

	public function frame()
	{
		return $this->belongsTo(Frame::class);
	}

	public function genero()
	{
		return $this->belongsTo(Genero::class);
	}
}
