<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Repositories\StoreRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StoreController extends Controller
{

    public function __construct()
    {
        $this->objName = 'store';
    }

    /**
    * GET /store
    *
    * index
    */
    public function index()
    {
        //return 'asd';
        try {
            return $this->toJSON(StoreRepository::getAll());
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * GET /store/{store}
    * @param storeId
    * show
    */
    public function show($storeId)
    {
        try {
            if (is_numeric($storeId)) {
                $store = StoreRepository::find($storeId);
                return $this->toJSON($store);
            } 
            return $this->error(
                "BAD_REQUEST",
                "StoreID is not in the right format, it must be a number"
            );
        } catch (ModelNotFoundException $ex) {
            return $this->error(
                "NOT_FOUND",
                "Store requested doesn't exist"
            );
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * POST /store
    * @param $request: Data to create a new store
    * store
    */
    public function store()
    {
        try {
            $validator = $this->validator($this->rules(true));
            $fields = ['name' => request('name'), 'address' => request('address')];
            if($validator->fails()){
                return $this->error(
                    "BAD_REQUEST",
                    $validator->errors()->all()
                );
            }
            return $this->toJSON(StoreRepository::create($fields));
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * PUT /store/{store}
    * @param $request: Data to update the store
    * update
    */
    public function update($storeId)
    {
        try {
            $validator = $this->validator($this->rules());
            $fields = ['name' => request('name'), 'address' => request('address'), 'id' => $storeId];
            if($validator->fails()){
                return $this->error(
                    "BAD_REQUEST",
                    $validator->errors()->all()
                );
            }
            $store = StoreRepository::update($fields);
            return $this->toJSON($store);
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * DELETE /store/{store}
    * @param $storeId
    * delete
    */
    public function destroy($storeId)
    {   
        try {
            $store = StoreRepository::delete($storeId);
            return $this->toJSON($store);
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * @param $unique: boolean to set true(unique) when call post, but false call put
    * Returns []: array with all rules
    */
    protected function rules($unique = false)
    {
        return ['name' => ($unique) ? 'required|max:255|unique:stores' :'required|max:255', 'address' => 'required|max:255'];
    }
}