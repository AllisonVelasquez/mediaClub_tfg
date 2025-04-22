<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class User extends Model
{
   use HasFactory;

   protected $table = 'users';

   public $incrementing = false;
   protected $keyType = 'string';
   protected $fillable = [
      'id',
      'alias',
      'email',
      'passw',
   ];
}
