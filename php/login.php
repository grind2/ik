<?php session_start();

if(isset($_POST['Submit'])){

    $Username = isset($_POST['Username']) ? $_POST['Username'] : '';
    $Password = isset($_POST['Password']) ? $_POST['Password'] : '';

    $success = False;

    foreach ($_SESSION['users'] as $ids){
        if ($ids['username'] == $Username && $ids['password'] == $Password){
            $_SESSION['CurrentUser']['un'] = $Username;
            $_SESSION['CurrentUser']['admin'] = $ids['isAdmin'];

            header("location:index.php");
            exit;
        }
    }

    if (!$success) { $msg="<span style='color:red'>Sikertelen bejelentkezés</span>"; }
}
?>

<form action="" method="post" name="Login_Form" novalidate>
    <table width="400" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">
        <?php if(isset($msg)){?>
            <tr>
                <td colspan="2" align="center" valign="top"><?= $msg ?></td>
            </tr>
        <?php } ?>
        <tr>
            <td colspan="2" align="left" valign="top"><h3>Bejelentkezés</h3></td>
        </tr>
        <tr>
            <td align="right" valign="top">Felhasználónév</td>
            <td><input value="<?= $_POST['Username'] ?? "" ?>" name="Username" type="text" class="Input"></td>
        </tr>
        <tr>
            <td align="right">Jelszó</td>
            <td><input value="<?= $_POST['Password'] ?? "" ?>" name="Password" type="password" class="Input"></td>
        </tr>
        <tr>
            <td> </td>
            <td><input name="Submit" type="submit" value="Bejelentkezés" class="Button3"></td>
        </tr>
        <tr>
            <td colspan="2" align="left" valign="top"><a href="index.php"><- Vissza a főoldalra</a></td>
        </tr>
    </table>

</form>
