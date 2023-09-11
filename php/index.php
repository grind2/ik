<?php
session_start();

?>
<!DOCTYPE html>
<html>
<head>
    <title>Voting App</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<h1>Voting App</h1>
<p>Welcome to our voting app, where you can browse and vote on various ballot papers.</p>
<a href="login.php">Click here to log in!</a>
<a href="registration.php">Click here to register!</a>
<a href="ballot.php">Create your own ballot!</a>
<?php
if (isset($_SESSION['CurrentUser']['un'])){
    echo "<p>Logged in as " . $_SESSION['CurrentUser']['un'] . ($_SESSION['CurrentUser']['admin'] ? " (Adminisztrátor) " : " (Felhasználó) ") . '<a href="logout.php">Logout.</a></p>';
}

?>


<h2>Active Ballot Papers</h2>
    <?php
        $polls = [
            'poll1' => [
                'id' => 'poll1',
                'question' => 'Szeretnéd-e, hogy legyen INGYEN Pöttyös automata a Lágymányoson?',
                'options' => ['igen', 'nem'],
                'isMultiple' => False,
                'createdAt' => '2022-12-04',
                'deadline' => '2022-12-12',
                'answers' => ['igen' => 2, 'nem' => 0],
                'voted' => ['userid1', 'userid2']
              ],
            'poll2' => [
                'id' => 'poll2',
                'question' => 'Miket tartalmazzon a Pöttyös automata?',
                'options' => ['Klasszikus Túró Rudi', 'Karamellás Guru', 'Tejszelet', 'Fitness Rudi'],
                'isMultiple' => True,
                'createdAt' => '2022-12-03',
                'deadline' => '2023-04-20',
                'answers' => ['Klasszikus Túró Rudi' => 3, 'Karamellás Guru' => 3, 'Tejszelet' => 3, 'Fitness Rudi' => 2],
                'voted' => ['userid1', 'userid2', 'userid3']
                ],
            'poll3' => [
                'id' => 'poll3',
                'question' => 'Milyen magas legyen a Pöttyös automata?',
                'options' => ['1m', '2m', '3m'],
                'isMultiple' => False,
                'createdAt' => '2022-12-04',
                'deadline' => '2023-03-11',
                'answers' => ['1m' => 2, '2m' => 1, '3m' => 0],
                'voted' => ['userid1', 'userid2', 'userid3']
            ],
            'poll4' => [
                'id' => 'poll4',
                'question' => 'Milyen súlya legyen a Pöttyös automatának?',
                'options' => ['80kg', '110kg', 'Nem érdekel'],
                'isMultiple' => False,
                'createdAt' => '2022-12-05',
                'deadline' => '2024-12-13',
                'answers' => ['80kg' => 0, '110kg' => 0, 'Nem érdekel' => 3],
                'voted' => ['userid1', 'userid2', 'userid3']
            ]
        ];


        $users = [
            'userid1' => [
                'id' => 'userid1',
                'username' => 'admin',
                'email' => 'email1@email.hu',
                'password' => 'admin',
                'isAdmin' => True
            ],
            'userid2' => [
                'id' => 'userid2',
                'username' => 'user2',
                'email' => 'email2@email.hu',
                'password' => 'user2',
                'isAdmin' => False
            ],
            'userid3' => [
                'id' => 'userid3',
                'username' => 'user3',
                'email' => 'email3@email.hu',
                'password' => 'user3',
                'isAdmin' => False
            ],
        ];

        if(!isset($_SESSION['polls'])){
            $_SESSION['polls'] = $polls;
        } else {
            $polls = $_SESSION['polls'];
        }

        if(!isset($_SESSION['users'])){
            $_SESSION['users'] = $users;
        } else {
            $users = $_SESSION['users'];
        }



        $active_ballots = [];
        $closed_ballots = [];
        foreach($polls as $b) {
            if ($b['deadline'] > date("Y-m-d")) {
                $active_ballots[] = $b;
            } else {
                $closed_ballots[] = $b;
            }
        }
        function my_sort($a,$b)
        {
            if ($a['createdAt']==$b['createdAt']) return 0;
            return ($a['createdAt']>$b['createdAt']) ? -1 : 1;
        }

        uasort($active_ballots, "my_sort");
        uasort($closed_ballots, "my_sort");

    ?>
    <main class="page-content">

        <?php foreach($active_ballots as $ab) : ?>
            <div class="card">
                <div class="content">
                    <h2 class="title"><?= $ab['id'] ?></h2>

                    <p class="copy">
                        <br>Létrehozás időpontja: <?= $ab['createdAt'] ?></br>
                        <br>Leadás határideje: <?= $ab['deadline'] ?></br>
                    </p>

                    <button class="btn" onclick="window.location.href='vote.php?pollid=<?= $ab['id'] ?>';">Szavazás</button>
                </div>
            </div>

        <?php endforeach; ?>

    </main>


<h2>Closed Ballot Papers</h2>
<main class="page-content">
    <?php foreach($closed_ballots as $ab) : ?>
        <div class="card closed">
            <div class="content">
                <h2 class="title"><?= $ab['id'] ?></h2>

                <p class="copy">
                    <br>Létrehozás időpontja: <?= $ab['createdAt'] ?></br>
                    <br>Leadás határideje: <?= $ab['deadline'] ?></br>
                </p>
            </div>
        </div>

    <?php endforeach; ?>
</main>

</body>
</html>