<?php

namespace App\Services\Repositories;
use App\Store;

class StoreRepository
{
    /**
     * Returns the store found
     * @param  Int $id: Store ID of the store required
     * @return a Store object found or not found exception
     */
    public static function find($id)
    {
        return Store::findOrFail($id);
    }

    /**
     * Returns all stores
     * @return a store collection
     */
    public static function getAll()
    {
        return Store::all();
    }

    /**
     * Deletes a store
     * @param  Int  $id: Store ID
     * @return store deleted
     */
    public static function delete($storeId)
    {
        $store = Store::findOrFail($storeId);
        if ($store) {
            $store->delete();
        }
        return $store;
    }

    /**
     * Creates a new store
     * @param  $store: Store object to add
     * @return store created
     */
    public static function create($store)
    {
        return Store::create($store);
    }

    /**
     * Update a store
     * @param  $store: Store object to add
     * @return store created
     */
    public static function update($store)
    {   
        $updatedStore = Store::findOrFail($store['id']);
        if ($updatedStore) {
            $updatedStore->name = $store['name'];
            $updatedStore->address = $store['address'];
            $updatedStore->save();
        }
        return $updatedStore;
    }
}