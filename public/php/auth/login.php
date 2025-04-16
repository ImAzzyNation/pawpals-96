
<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    unset($user['password']); // Don't send password back
    echo json_encode($user);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid credentials']);
}
?>
