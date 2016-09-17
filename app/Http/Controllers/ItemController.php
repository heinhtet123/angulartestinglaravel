<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Item;
class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index(Request $request)
    {
        
        sleep(1);
        $input = $request->all();
        $items=new Item();
        $offset=0;
        $limit=5;



        if($request->has('sortby'))
        {
           $items=$items->orderby('id',$request->get('sortby'));
        }

        if($request->has('page'))
        {
            $page=$request->get('page');

            $offset=$limit*$page-$limit;
            // $limit=$limit*$page;
        }




        if($request->get('search')){
            $items = $items->where("title", "LIKE", "%{$request->get('search')}%")
                ->paginate(5);      
        }else{
            // skip is offset and take is limit
            $items = $items->skip($offset)->take($limit)->get();
        }
        

        return response($items);
    }


    public function countingItems(Request $request){
       
        $items_count=Item::get()->count();
      
        return response($items_count);
    }
    
   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $input = $request->all();
        
        $items=new Item();
        $create = $items->create($input);

        return response($create);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
    
    public function multipledelete(Request $request)
    {
     
        $data=json_decode($request->input('ids'));

        if(Item::destroy($data)==true){
            $data=['success'=>true];
            $page=$request->input('page');
            $items['data']=$this->paging($page);
            $data=array_merge($data,$items);
        }

        return response($data);
    }

    public function paging(&$page)
    {

        $limit=5;
        $items_count=Item::get()->count();

        $offset=$limit*$page-$limit;

        
        $items = Item::skip($offset)->take($limit)->get();
        
        if($items->isEmpty())
        {
            $page=$page-1;
            $items = $this->paging($page);

        }

        return $items;
        
        

       
       
    }


}
