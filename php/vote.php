<?php session_start();
$pollid = $_GET['pollid'];
$currentPoll = $_SESSION['polls'][$pollid];

if(isset($_POST['Submit'])){
    if (!isset($_POST['options']) && !isset($_POST['radio-group'])){
        echo '<script>alert("Válassz opciót!")</script>';
    } else {
        $ans = $_POST['options'] ?? $_POST['radio-group'];

        foreach ($ans as $a){
            $_SESSION['polls'][$pollid]['answers'][$a]++;
        }
        //print_r($_SESSION['polls'][$pollid]['answers']);



        echo '<script>alert("Sikeres szavazás!")</script>';
        //echo '<script>window.location.replace("index.php");</script>';
    }

}

?>
<form action="" method="post" name="Vote_Form" novalidate style="margin: 0 auto; width: 50%;">
    <h2><?= $currentPoll['question'] ?></h2>
    <fieldset <?= $currentPoll['isMultiple'] ? "" : 'hidden="hidden"'?>" >
        <legend>Több válaszlehetőség</legend>
        <?php foreach ($currentPoll['options'] as $option) : ?>
        <input type="checkbox" id=<?= $option ?> name="options[]" value="<?= $option ?>">
        <label for="option1"><?= $option ?></label>
        <br>
    <?php endforeach; ?>
    </fieldset>

    <fieldset <?= $currentPoll['isMultiple'] ? 'hidden="hidden"' : ""?>" >
        <legend>1 válaszlehetőség</legend>
    <?php foreach ($currentPoll['options'] as $option) : ?>
        <input type="radio" id=<?= $option ?> name="radio-group[]" value="<?= $option ?>">
        <label for="radio1"><?= $option ?></label>
        <br>
    <?php endforeach; ?>
    </fieldset>

    <input name="Submit" type="submit" value="Szavazás">
</form>

