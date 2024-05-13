<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Helyszín szerkesztése') }}
        </h2>
    </x-slot>

    <body>
        <p>Pálya szerkesztése: {{ $p['name'] }}</p>
        <img src={{ $p['image']}} width="200px">
        <form method="POST" action="{{route('place.replace')}}" enctype="multipart/form-data">
            @csrf
            @method('PATCH')


            <label for="name">Név:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="place_image">Helyszín képe:</label>
            <input type="file" id="img" name="img" />
            <input hidden type="number" id="pid" name="pid" value="{{$p['id']}}" />



            <input style="color: blue"  type="submit" value="Szerkesztés">
        </form>
        @if ($errors->any())
            <ul style="color: red">
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach

            </ul>
        @endif


    </body>

    </x-app-layout>
