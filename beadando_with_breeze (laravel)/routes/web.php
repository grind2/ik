<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ProfileController;
use App\Models\Character;
use App\Models\Contest;
use App\Models\Place;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

Route::get('/', function () {
    return view('welcome', [
        'charcount' => App\Models\Character::all()->count(),
        'contcount' => App\Models\Contest::all()->count(),
    ]);
});



Route::get('/contest/{id}/{contestid?}/{placeid?}/{enemycid?}/{attackType?}', function ($id, $contestid = null, $placeid = null, $enemycid = null, $attackType = null) {

    $character = Character::find($id);

    if ($contestid == null){
        $contestid = Contest::create([
            'win' => null,
            'history' => '',
            'user_id' => Auth::id()
        ])->id;

        $placeid = rand(0, Place::all()->count());
        $enemycid = rand(0, Character::all()->count());

        $character->contests()->attach($contestid);
    }

    //$character->contests[$pid]->pivot->hero_hp = 100;
    //Character::find($id)->contests[Character::find($id)->contests->count()-1]->pivot->hero_hp = 100;

    //később szimultán
    //$pid = $character->contests()->pivot->where('contest_id', $contestid)->pivot->id;
    $pid = $character->contests()->count()-1;

    $myhp = $character->contests[$pid]->pivot->hero_hp;
    $enhp = $character->contests[$pid]->pivot->enemy_hp;

    $enemy = Character::find($enemycid);

    $orig_myhp = $myhp;
    $orig_enhp = $enhp;

    // to method
    // ally attack
    if (!is_null($attackType)){



    switch ($attackType) {
        case 'melee':
            $enhp = $enhp - (($character['strength'] * 0.7 + $character['accuracy'] * 0.1 + $character['magic'] * 0.1) - $enemy['defence']);
            break;
        case 'ranged':
            $enhp = $enhp - (($character['strength'] * 0.1 + $character['accuracy'] * 0.7 + $character['magic'] * 0.1) - $enemy['defence']);
            break;
        case 'special':
            $enhp = $enhp - (($character['strength'] * 0.1 + $character['accuracy'] * 0.1 + $character['magic'] * 0.7) - $enemy['defence']);
            break;
    }

    // enemy attack
    $attackTypeEnemy = ['melee','ranged','special'][array_rand([0, 1, 2])];
    switch ($attackTypeEnemy) {
        case 'melee':
            $myhp = $myhp - (($enemy['strength'] * 0.7 + $enemy['accuracy'] * 0.1 + $enemy['magic'] * 0.1) - $character['defence']);
            break;
        case 'ranged':
            $myhp = $myhp - (($enemy['strength'] * 0.1 + $enemy['accuracy'] * 0.7 + $enemy['magic'] * 0.1) - $character['defence']);
            break;
        case 'special':
            $myhp = $myhp - (($enemy['strength'] * 0.1 + $enemy['accuracy'] * 0.1 + $enemy['magic'] * 0.7) - $character['defence']);
            break;
    }
    $contest = Contest::find($contestid);

    if ($enhp <= 0){
        $enhp = 0;
        $contest->win = true;
    };

    if ($myhp <= 0){
        $myhp = 0;
        $contest->win = false;
    };


    //hp edit
    $character->contests()->updateExistingPivot($contestid, [
        'hero_hp' => $myhp,
        'enemy_hp' => $enhp,
    ]);

    //history edit

    $contest->history = '<li>' . $character['name'] . ': ' . $attackType . ' attack - ' . ($orig_enhp - $enhp) . ' damage 🟢</li>' .
                        '<li>' . $enemy['name'] . ': ' . $attackTypeEnemy . ' attack - ' . ($orig_myhp - $myhp) . ' damage 🔻</li>' . $contest->history;
    $contest->save();

}

    return view('/contest', [
        'contest' => Contest::find($contestid),
        'place' => Place::find($placeid),
        'enemyc' => Character::find($enemycid),
        'c' =>  $character,
        'hero_hp' => $myhp,
        'enemy_hp' => $enhp
    ]);

})->name('contest');

Route::get('/place/create', [PlaceController::class, 'create'])->name('place.create');
Route::patch('/place/replace', [PlaceController::class, 'replace'])->name('place.replace');
Route::post('/place/store', [PlaceController::class, 'store'])->name('place.store');

Route::get('/place', function () {
    return view('place.index', [
        'places' => App\Models\Place::all()
    ]);
});




Route::post('/place', function () {

    request()->validate([
        'name' => 'required'
    ]);

    dd(request('image'));

    Place::create([
        'name' => request('name'),
        'image' => 'required|image|mimes:png,jpg,jpeg|max:2048'
    ]);

    return redirect('place');
});

Route::get('/character', function () {
    return view('character.index', [
        'chars' => App\Models\Character::all()
    ]);
});



Route::post('/character', function () {

    request()->validate([
        'name' => 'required',
        'defence' => 'required|integer|between:0,3',
        'strength' => 'required|integer|between:0,20',
        'accuracy' => 'required|integer|between:0,20',
        'magic' => 'required|integer|between:0,20',
        'strength' => Rule::prohibitedIf(request('strength') + request('accuracy') + request('magic') > 20),
        'accuracy' => Rule::prohibitedIf(request('strength') + request('accuracy') + request('magic') > 20),
        'magic' => Rule::prohibitedIf(request('strength') + request('accuracy') + request('magic') > 20)
    ]);


    Character::create([
        'name' => request('name'),
        'enemy' => request('enemy') == "on",
        'defence' => request('defence'),
        'strength' => request('strength'),
        'accuracy' => request('accuracy'),
        'magic' => request('magic'),
        'user_id' => request('enemy') == "on" ? null : Auth::id()
    ]);

    return redirect('dashboard');
});

Route::get('/character/create', function () {
    return view('character.create', [
        'chars' => App\Models\Character::all()
    ]);
});

Route::get('/character/{id}', function ($id) {
    return view('character.show', [ 'c' => Character::find($id) ]);
});

Route::get('/character/{id}/edit', function ($id) {
    return view('character.edit', [ 'c' => Character::find($id) ]);
});

Route::patch('/character/{id}', function ($id) {

    request()->validate([
        'name' => 'required',
        'defence' => 'required|integer|between:0,3',
        'strength' => 'required|integer|between:0,20',
        'accuracy' => 'required|integer|between:0,20',
        'magic' => 'required|integer|between:0,20'
    ]);

    $character = Character::findOrFail($id);

    $character->update([
        'name' => request('name'),
        'enemy' => request('enemy') == "on",
        'defence' => request('defence'),
        'strength' => request('strength'),
        'accuracy' => request('accuracy'),
        'magic' => request('magic'),
        'user_id' => request('enemy') == "on" ? null : Auth::id()
    ]);

    return redirect('/character/' . $character->id);
});

Route::delete('/character/{id}', function ($id) {

    $character = Character::findOrFail($id);
    $character->delete();

    return redirect('/dashboard');
});


Route::get('/place/edit/{id}', function ($id) {
    return view('place.edit', [ 'p' => Place::find($id) ]);
});

Route::patch('/place/edit/{id}', function ($id) {

    request()->validate([
        'name' => 'required'
    ]);

    $place = Place::findOrFail($id);

    $place->update([
        'name' => request('name'),
        'image' => request('image') ? request('image') : $place['image']
    ]);

    return redirect('/place');
});

Route::delete('/place/{id}', function ($id) {

    $place = Place::findOrFail($id);
    $ex = explode("assets", $place->image);
    if (count($ex) > 1){
        $path = public_path('/assets' . $ex[1]);
        //dd($path, File::exists($path));
        if (File::exists($path)) {
            File::delete($path);
        }
    }


    $place->delete();

    return redirect('/place');
});


Route::get('/dashboard', function () {
    return view('dashboard', [
        'chars' => App\Models\Character::all()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
