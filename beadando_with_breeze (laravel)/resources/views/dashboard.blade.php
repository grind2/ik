<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Karakterlista') }}
        </h2>
    </x-slot>

    <style>
        table {
              border-collapse: collapse;
              border: 2px solid rgb(140 140 140);
              font-family: sans-serif;
              font-size: 0.8rem;
              letter-spacing: 1px;
            }

            caption {
              caption-side: bottom;
              padding: 10px;
              font-weight: bold;
            }

            thead,
            tfoot {
              background-color: rgb(228 240 245);
            }

            th,
            td {
              border: 1px solid rgb(160 160 160);
              padding: 8px 10px;
            }

            tbody > tr:nth-of-type(even) {
              background-color: rgb(237 238 242);
            }

            tfoot th {
              text-align: right;
            }

            tfoot td {
              font-weight: bold;
            }
    </style>
    <table>
        <tr>
            <th>Név</th>
            <th>védekező</th>
            <th>támadó</th>
            <th>pontosság</th>
            <th>mágikus</th>
        </tr>
        @foreach ($chars as $c)
        @if ($c['user_id'] == Auth::id() || Auth::user()->admin)
            <tr>
                <td><a href="/character/{{$c['id']}}">{{ $c['name'] }} {{ $c['user_id'] == Auth::id() ? '' : '😈' }}</a></td>
                <td>{{ $c['defence'] }}</td>
                <td>{{ $c['strength'] }}</td>
                <td>{{ $c['accuracy'] }}</td>
                <td>{{ $c['magic'] }}</td>
            </tr>
        @endif
        @endforeach
    </table>

</x-app-layout>
