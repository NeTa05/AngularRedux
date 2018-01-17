<?php

namespace App;

use Illuminate\Support\Facades\DB;

class Store extends Model
{
    public function article()
  	{
    	return $this->hasMany('App\Article');
  	}
}
