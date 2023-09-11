<?php
session_start();
if(isset($_POST['Submit'])){

    $text = isset($_POST['text']) ? $_POST['text'] : '';
    $options[] = isset($_POST['options']) ? preg_split("/\r\n|\n|\r/", $_POST['options']) : '';
    $multivote = isset($_POST['multi_vote']) ? $_POST['multi_vote'] == "yes" : '';
    $deadline = isset($_POST['deadline']) ? $_POST['deadline'] : '';

    $ansgen = [];
    foreach ($options as $o){
        //$ansgen[] = [$o => 0];
    }

    $tempid = "poll" . (count($_SESSION['polls'])+1);
    $_SESSION['users'][$tempid] = [ 'id' => $tempid, 'question' => $text, 'options' => $options,
        'isMultiple' => $multivote, 'createdAt' => date("Y-m-d"), 'deadline' => $deadline,
        'answers' => $options, 'voted' => []
    ];

    echo '<script>alert("Sikeres létrehozás!")</script>';
    echo '<script>window.location.replace("index.php");</script>';
}
?>

<form action="" method="post" name="Create_Form" novalidate>
    <label for="text">Szavazás szövegezése:</label>
    <input type="text" id="text" name="text">
    <br>
    <label for="options">Választási lehetőségek:</label>
    <textarea id="options" name="options"></textarea>
    <br>
    <label for="multi_vote">Lehetséges-e több szavazat leadása:</label>
    <input type="radio" id="multi_vote" name="multi_vote" value="yes">Igen
    <input type="radio" id="multi_vote" name="multi_vote" value="no">Nem
    <br>
    <label for="deadline">Leadás határideje:</label>
    <input type="date" id="deadline" name="deadline">
    <br>
    <input name="Submit" type="submit" value="Leadás">
</form>
