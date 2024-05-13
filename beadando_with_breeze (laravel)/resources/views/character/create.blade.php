<x-app-layout>

    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Karakter létrehozása') }}
        </h2>
    </x-slot>

<body>
    <form method="POST" action="/character">
        @csrf
        <label for="name">Név:</label><br>
        <input type="text" id="name" name="name"><br>
        <label for="defence">védekező képesség (0-3):</label><br>
        <input type="number" id="defence" name="defence"><br>
        <label for="strength">támadó képesség (0-20):</label><br>
        <input type="number" id="strength" name="strength"><br>
        <label for="accuracy">pontosság képesség (0-20):</label><br>
        <input type="number" id="accuracy" name="accuracy"><br>
        <label for="magic">mágikus képesség (0-20):</label><br>
        <input type="number" id="magic" name="magic"><br>
        <input type="hidden" name="enemy" value="off">
        @if (Auth::user()->admin)
            <label for="enemy">játszható ellenséges karakter:</label><br>
            <input type="checkbox" id="enemy" name="enemy"><br><br>
        @endif



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
