<x-app-layout>

<x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ __('Helyszín létrehozása') }}
    </h2>
</x-slot>

<body>
    <form method="POST" action="{{route('place.store')}}" enctype="multipart/form-data">
        @csrf
        <label for="name">Név:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="img">Helyszín képe:</label>
        <input type="file" id="img" name="img"/>



        <input style="color: blue"  type="submit" value="Létrehozás">
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
