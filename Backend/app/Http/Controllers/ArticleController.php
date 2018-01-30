<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Repositories\ArticleRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ArticleController extends Controller
{

    public function __construct()
    {
        $this->objName = 'article';
    }

    /**
    * GET /article
    *
    * index
    */
    public function index()
    {
        try {
            return $this->toJSON(ArticleRepository::getAll());
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * GET /article/{article}
    * @param articleId
    * show
    */
    public function show($articleId)
    {
        try {
            if (is_numeric($articleId)) {
                $article = ArticleRepository::find($articleId);
                return $this->toJSON($article);
            } 
            return $this->error(
                "BAD_REQUEST",
                "ArticleID is not in the right format, it must be a number"
            );
        } catch (ModelNotFoundException $ex) {
            return $this->error(
                "NOT_FOUND",
                "Article requested doesn't exist"
            );
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * POST /article
    * @param $request: Data to create a new article
    * store
    */
    public function store()
    {
        try {
            $validator = $this->validator($this->rules());
            $fields = ['name' => request('name'), 'description' => request('description'), 'price' => request('price'), 
                    'total_in_shelf' => request('total_in_shelf'), 'total_in_vault' => request('total_in_vault'), 
                    'store_id' => request('store_id')];

            if($validator->fails()){
                return $this->error(
                    "BAD_REQUEST",
                    $validator->errors()->all()
                );
            }
            return $this->toJSON(ArticleRepository::create($fields));
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * PUT /article/{article}
    * @param $request: Data to update the article
    * update
    */
    public function update($articleId)
    {
        try {
            $validator = $this->validator($this->rules());
            $fields = ['name' => request('name'), 'description' => request('description'), 'price' => request('price'), 
                    'total_in_shelf' => request('total_in_shelf'), 'total_in_vault' => request('total_in_vault'), 
                    'store_id' => request('store_id'), 'id' => $articleId];
            if($validator->fails()){
                return $this->error(
                    "BAD_REQUEST",
                    $validator->errors()->all()
                );
            }
            $article = ArticleRepository::update($fields);
            return $this->toJSON($article);
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * DELETE /article/{article}
    * @param $articleId
    * delete
    */
    public function destroy($articleId)
    {   
        try {
            $article = ArticleRepository::delete($articleId);
            return $this->toJSON($article);
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }

    /**
    * GET /article/{article}
    * @param articleId
    * show
    */
    public function getArticlesFromStore($storeId)
    {
        try {
            if (is_numeric($storeId)) {
                $article = ArticleRepository::findArticlesFromStore($storeId);
                return $this->toJSON($article);
            } 
            return $this->error(
                "BAD_REQUEST",
                "Storeid is not in the right format, it must be a number"
            );
        } catch (ModelNotFoundException $ex) {
            return $this->error(
                "NOT_FOUND",
                "Storeid requested doesn't exist"
            );
        } catch (\Exception $e) {
            return $this->error(
                "SERVER_ERROR",
                $e->getMessage()
            );
        }
    }
    
    /**
    * 
    * Returns []: array with all rules
    */
    protected function rules()
    {
        return ['name' => 'required|max:255',
            'description' => 'required|max:255',
            'price' => 'required|numeric|between:1,100',
            'total_in_shelf' => 'required|numeric|between:1,100',
            'total_in_vault' => 'required|numeric|between:1,100',
            //'store_id' => 'required|exists:stores,id'
        ];
    }
}
