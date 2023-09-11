<?php session_start();

if(isset($_POST['Submit'])){


    $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
    $Email = isset($_POST['Email']) ? $_POST['Email'] : '';
    $Password = isset($_POST['Password']) ? $_POST['Password'] : '';
    $Password2 = isset($_POST['Password2']) ? $_POST['Password2'] : '';

    $success = True;
    $reasons = [];

    if ($Username == '' || $Email == '' || $Password == '' || $Password2 == ''){
        array_push($reasons, "Hiányos kitöltés!");
        $success = False;
    }

    if ($Password != $Password2){
        array_push($reasons, "A két beírt jelszó nem egyezik!");
        $success = False;
    }


    foreach ($_SESSION['users'] as $ids){
        if ($ids['username'] == $Username){
            array_push($reasons, "Már létezik ilyen felhasználónév!");
            $success = False;
        }
        if ($ids['email'] == $Email){
            array_push($reasons, "Ehhez az email címhez már van hozzárendelve felhasználó!");
            $success = False;
        }
    }


    if ($success) {
        $tempid = "userid" . (count($_SESSION['users'])+1);
        $_SESSION['users'][$tempid] = [ 'id' => $tempid, 'username' => $Username, 'email' => $Email, 'password' => $Password, 'isAdmin' => False];


        echo '<script>alert("Sikeres regisztráció! Kérlek jelentkezz be!")</script>';
        echo '<script>window.location.replace("login.php");</script>';
    }


}
?>

<form action="" method="post" name="Login_Form" novalidate>
    <table width="400" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">
        <?php if(!empty($reasons)) : ?>
                <?php foreach ($reasons as $r) : ?>
            <tr>
                <td colspan="2" align="center" style='color:red' valign="top"><?= $r ?></td>
            </tr>
            <?php endforeach; ?>
        <?php endif; ?>
        <tr>
            <td colspan="2" align="left" valign="top"><h3>Regisztráció</h3></td>
        </tr>
        <tr>
            <td align="right" valign="top">Felhasználónév</td>
            <td><input value="<?= $_POST['Username'] ?? "" ?>" name="Username" type="text" class="Input"></td>
        </tr>
        <tr>
            <td align="right" valign="top">E-Mail</td>
            <td><input value="<?= $_POST['Email'] ?? "" ?>" name="Email" type="email" class="Input"></td>
        </tr>
        <tr>
            <td align="right">Jelszó</td>
            <td><input value="<?= $_POST['Password'] ?? "" ?>" name="Password" type="password" class="Input"></td>
        </tr>
        <tr>
            <td align="right">Jelszó megint</td>
            <td><input value="<?= $_POST['Password2'] ?? "" ?>" name="Password2" type="password" class="Input"></td>
        </tr>
        <tr>
            <td> </td>
            <td><input name="Submit" type="submit" value="Regisztráció" class="Button3"></td>
        </tr>
        <tr>
            <td colspan="2" align="left" valign="top"><a href="index.php"><- Vissza a főoldalra</a></td>
        </tr>
    </table>


</form>
