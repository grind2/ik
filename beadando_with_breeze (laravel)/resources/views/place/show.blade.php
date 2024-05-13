<x-app-layout>
    @if (Auth::user()->admin || Auth::id() == $c['user_id'])
    <h1>Karakter részletei</h1>
    <ul>
        <li><b>Név: </b>{{ $c['name'] }}</li>
        <li><b>védekező: </b>{{ $c['defence'] }}</li>
        <li><b>támadó: </b>{{ $c['strength'] }}</li>
        <li><b>pontosság: </b>{{ $c['accuracy'] }}</li>
        <li><b>mágikus: </b>{{ $c['magic'] }}</li>
    </ul>

    <a style="color: blue" href="/character/{{$c->id}}/edit">Szerkesztés</a>
    <a style="color: blue" href="/contest/{{$c->id}}">Új mérkőzés</a>

    @else
    <h1 style="color: red">Nincs hozzáférés!</h1>
    @endif

</x-app-layout>
