<?php

namespace App\Services\Repositories;
use Illuminate\Support\Facades\DB;
use App\Article;

class ArticleRepository
{
    /**
     * Returns the article found
     * @param  Int $id: Article ID of the article required
     * @return a Article object found or not found exception
     */
    public static function find($id)
    {
        return Article::findOrFail($id);
    }

    /**
     * Returns all stores
     * @return a article collection
     */
    public static function getAll()
    {
        return Article::all();
    }

    /**
     * Deletes a article
     * @param  Int  $id: Article ID
     * @return article deleted
     */
    public static function delete($storeId)
    {
        $article = Article::findOrFail($storeId);
        if ($article) {
            $article->delete();
        }
        return $article;
    }

    /**
     * Creates a new article
     * @param  $article: Article object to add
     * @return article created
     */
    public static function create($article)
    {
        return Article::create($article);
    }

    /**
     * Update a article
     * @param  $article: Article object to add
     * @return article created
     */
    public static function update($article)
    {   
        $updateArticle = Article::findOrFail($article['id']);
        if ($updateArticle) {
            $updateArticle->name = $article['name'];
            $updateArticle->description = $article['description'];
            $updateArticle->price = $article['price'];
            $updateArticle->total_in_shelf = $article['total_in_shelf'];
            $updateArticle->total_in_vault = $article['total_in_vault'];
           // $updateArticle->store_id = $article['store_id'];
            $updateArticle->save();
        }
        return $updateArticle;
    }

    /**
     * @param  $storeId: Article object to add
     * @return a article collection from the same store
     */
    public static function findArticlesFromStore($storeId){
      return DB::table('stores')
                  ->orderBy('id','DESC')
                  ->join('articles', 'stores.id', '=', 'articles.store_id')
                  ->select('articles.id', 'articles.name', 'articles.description', 'articles.price', 'articles.total_in_shelf', 'articles.total_in_vault', 'stores.name as store_name')
                  ->where('store_id', $storeId)
                  ->get();

    }
}