<?php

namespace App;

use Illuminate\Support\Facades\DB;

class Article extends Model
{
    public function store()
  	{
    	return $this->belongsTo('App\Store');
  	}
}
