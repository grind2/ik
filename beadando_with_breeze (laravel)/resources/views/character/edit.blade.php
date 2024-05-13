<x-app-layout>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>Karakter szerkesztése: {{ $c->name }}</h1>
    <form method="POST" action="/character/{{ $c->id }}">
        @csrf
        @method('PATCH')
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


        <input style="color: blue" type="submit" value="Szerkesztés">
    </form>



    <form method="POST" action="/character/{{ $c->id }}">
        @csrf
        @method('DELETE')
        <input style="color:coral" type="submit" value="Törlés">
    </form>

    @if ($errors->any())
        <ul style="color: red">
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach

        </ul>
    @endif


</body>
</html>
</x-app-layout>
