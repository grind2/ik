<?php session_start();

unset($_SESSION['CurrentUser']['un']);
unset($_SESSION['CurrentUser']['admin']);

header("location:index.php");
exit;
?>