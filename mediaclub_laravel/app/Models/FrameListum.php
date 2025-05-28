<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FrameListum
 * 
 * @property int $lista_id
 * @property int $frame_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Listum $listum
 * @property Frame $frame
 *
 * @package App\Models
 */
class FrameListum extends Model
{
	protected $table = 'frame_lista';
	public $incrementing = false;

	protected $casts = [
		'lista_id' => 'int',
		'frame_id' => 'int'
	];

	public function listum()
	{
		return $this->belongsTo(Listum::class, 'lista_id');
	}

	public function frame()
	{
		return $this->belongsTo(Frame::class);
	}
}
