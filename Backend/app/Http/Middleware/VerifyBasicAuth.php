<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;


class VerifyBasicAuth
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
       
        if (!$this->canAccess($request->header('Authorization'))) {
            return response()->json(['error'=> 'Unauthorized'], 401);
        }
        return $next($request);
    }

     /**
     * Can access with current credentials?.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    protected function canAccess($authorizationHeader) 
    {   
        //$authorizationHeader = 'Basic am9yZ2U6Z2FwMTIz';
        $credentials =  $this->credentials();
        if (strpos($authorizationHeader, 'Basic ') !== false) {
            $key            = str_replace("Basic ", "", $authorizationHeader);//Remove Basic. i.e Basic token_here it's going to be just token
            $currentUser    = base64_encode($credentials);//
            $value = ($currentUser == $key);
            return ($currentUser == $key);
        }
        return false;
    }

    protected function credentials()
    {
        return env('BASIC_AUTH_USERNAME') . ":" . env('BASIC_AUTH_PASSWORD') ;
    }
}
