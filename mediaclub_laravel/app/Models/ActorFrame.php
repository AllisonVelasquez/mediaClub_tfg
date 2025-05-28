<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ActorFrame
 * 
 * @property int $actor_id
 * @property int $frame_id
 * @property string|null $personaje
 * @property int|null $orden
 * 
 * @property Actor $actor
 * @property Frame $frame
 *
 * @package App\Models
 */
class ActorFrame extends Model
{
	protected $table = 'actor_frame';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'actor_id' => 'int',
		'frame_id' => 'int',
		'orden' => 'int'
	];

	protected $fillable = [
		'personaje',
		'orden'
	];

	public function actor()
	{
		return $this->belongsTo(Actor::class);
	}

	public function frame()
	{
		return $this->belongsTo(Frame::class);
	}
}
