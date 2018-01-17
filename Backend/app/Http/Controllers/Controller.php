<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Validator;

define("ERROR_CODES", [
  "BAD_REQUEST" => 400,
  "NOT_FOUND" => 404,
  "NOT_AUTHORIZED" => 401,
  "SERVER_ERROR" => 500
]);

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    protected $objName = 'element';

    /**
     * @param $result: Object or array to return
     * Returns $response: formatted response
     */
    protected function toJSON($result)
    {
        $response = [
          "success" => true
        ];
        $response['total_elements'] = $result->count();
        $response[$this->objName] = $result;
        return $response;
    }

    /**
     * @param $errorCode: Http error code number, for example: 404
     * @param $errorMsg: Description of the error
     * Returns $response: formatted response for the error
     */
    protected function error($errorCode, $errorMsg)
    {
        $errorCode = ERROR_CODES[$errorCode];
        return response()->json(["success" => false, "error_code" => $errorCode, "error_message" => $errorMsg], $errorCode);
    }

    /**
     * 
     * @param $rules: rules to validate
     * Returns Validator: here you can the errors if it fails or anything is ok
     */
    protected function validator($rules)
    {
        return Validator::make(request()->all(), $rules);
    }
}
