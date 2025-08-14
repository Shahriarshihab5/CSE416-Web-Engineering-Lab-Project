<?php include 'db.php';

$token = $_GET['token'];
$stmt = $conn->prepare("SELECT * FROM users WHERE reset_token=? AND token_expire > NOW()");
$stmt->bind_param("s", $token);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newpass = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt = $conn->prepare("UPDATE users SET password=?, reset_token=NULL, token_expire=NULL WHERE id=?");
    $stmt->bind_param("si", $newpass, $user['id']);
    $stmt->execute();
    echo "Password reset successful. <a href='index.php'>Login</a>";
}
?>
<!-- Form to enter new password -->
