<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{'Mérkőzés: ' . $c['name'] . ' vs. ' . $enemyc['name'] . ' (' . $place['name'] . ')'}}
        </h2>
    </x-slot>

    <div class="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        @if (Auth::user()->admin || Auth::id() == $c['user_id'])

        <div class="justify-between flex">

        @php
            $pid = $c->contests()->count()-1;
        @endphp

        <ul>
            <li>Karaktered részletei</li>
            <li><b>Név: </b>{{ $c['name'] }}</li>
            <li><b>védekező: </b>{{ $c['defence'] }}</li>
            <li><b>támadó: </b>{{ $c['strength'] }}</li>
            <li><b>pontosság: </b>{{ $c['accuracy'] }}</li>
            <li><b>mágikus: </b>{{ $c['magic'] }}</li>
            <li>CURRENT HP: {{ $hero_hp }}</li>
        </ul>

        <ul >

            @if ($contest->win == true)
                <h1>nyertél</h1>
            @elseif (is_null($contest->win))
                <li><a href="{{ route('contest', ['id' => $c['id'], 'contestid' => $contest['id'], 'placeid' => $place['id'], 'enemycid' => $enemyc['id'], 'attackType' => 'melee']) }}">Melee ⚔️</a></li>
                <li><a href="{{ route('contest', ['id' => $c['id'], 'contestid' => $contest['id'], 'placeid' => $place['id'], 'enemycid' => $enemyc['id'], 'attackType' => 'ranged']) }}">Ranged 🔫</a></li>
                <li><a href="{{ route('contest', ['id' => $c['id'], 'contestid' => $contest['id'], 'placeid' => $place['id'], 'enemycid' => $enemyc['id'], 'attackType' => 'special']) }}">Special (magic) 🔮</a></li>
            @else
                <h1>vesztettél</h1>
            @endif

            {!! $contest->history !!}


        </ul>

        <ul>
            <li>Ellenséges karakter részletei</l1>
            <li><b>Név: </b>{{ $enemyc['name'] }}</li>
            <li><b>védekező: </b>{{ $enemyc['defence'] }}</li>
            <li><b>támadó: </b>{{ $enemyc['strength'] }}</li>
            <li><b>pontosság: </b>{{ $enemyc['accuracy'] }}</li>
            <li><b>mágikus: </b>{{ $enemyc['magic'] }}</li>
            <li>CURRENT HP: {{ $enemy_hp /*$c->contests[$pid]->pivot->enemy_hp*/ }}</li>
        </ul>
        </div>

        <img src="{{$place['image']}}"/>


        @else
        <h1 style="color: red">Nincs hozzáférés!</h1>
        @endif

</x-app-layout>
