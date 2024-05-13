<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class PlaceController extends Controller
{
    public function index(){
        $places = Place::all();

        return view('place.index', compact('place'));
    }

    public function create(){
        return view('place.create');
    }

    public function store(Request $request){
        //dd($request->all());
        //dd($request->hasFile('img'));
        $filename = '';

        if($request->hasFile('img')){

            $filename = $request->getSchemeAndHttpHost() . '/assets/img/' . time() . '.' . $request->img->extension();

            echo ($request->img->move(public_path('/assets/img/'), $filename));
        }

        Place::create([
            'name' => $request['name'],
            'image' => $filename
        ]);

        return redirect('/place');
    }

    public function replace(Request $request){
        //dd($request->all());
        //dd($request->hasFile('img'));
        $filename = '';

        if($request->hasFile('img')){

            $filename = $request->getSchemeAndHttpHost() . '/assets/img/' . time() . '.' . $request->img->extension();

            echo ($request->img->move(public_path('/assets/img/'), $filename));
        }

        $place = Place::find($request['pid']);

        $place->name = $request['name'] ? $request['name'] : $place->name;


        if($filename) {

            $ex = explode("assets", $place->image);
            if (count($ex) > 1){
                $path = public_path('/assets' . $ex[1]);
                //dd($path, File::exists($path));
                if (File::exists($path)) {
                    File::delete($path);
                }
            }


            $place->image = $filename;
        }


        $place->save();

        //delete old image




        return redirect('/place');
    }
}
