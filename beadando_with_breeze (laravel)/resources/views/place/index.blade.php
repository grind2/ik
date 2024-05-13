
<x-app-layout>
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

<x-slot name="header">
    <h2 class="font-semibold text-xl text-gray-800 leading-tight">
        {{ __('Helyszínek listája') }}
    </h2>
</x-slot>

<table>
    <tr>
        <th>Név</th>
        <th>kép</th>
        <th>actions</th>

    </tr>
    @foreach ($places as $p)

            <tr>
                <td><a href="/place/{{$p['id']}}">{{ $p['name'] }}</a></td>
                <td><img width="500"  src="{{ $p['image'] }}"/></td>
                <td>
                    <form method="GET" action="/place/edit/{{ $p['id'] }}">
                        @csrf
                        @method('PATCH')
                        <input type="submit" value="Szerkesztés">✏️
                    </form>
                    <form method="POST" action="/place/{{ $p['id'] }}">
                        @csrf
                        @method('DELETE')
                        <input type="submit" value="Törlés">❌
                    </form>
                </td>
            </tr>



    @endforeach
</table>


</x-app-layout>
