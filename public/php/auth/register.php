
<?php
require_once '../config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['email']) || empty($data['password']) || empty($data['first_name']) || empty($data['last_name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

try {
    // Check if email exists
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(['error' => 'Email already exists']);
        exit;
    }

    // Insert new user
    $stmt = $pdo->prepare('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)');
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt->execute([
        $data['first_name'],
        $data['last_name'],
        $data['email'],
        $hashedPassword
    ]);

    // Get the created user
    $userId = $pdo->lastInsertId();
    $stmt = $pdo->prepare('SELECT id, first_name, last_name, email, created_at FROM users WHERE id = ?');
    $stmt->execute([$userId]);
    $user = $stmt->fetch();

    echo json_encode($user);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Registration failed']);
}
?>
