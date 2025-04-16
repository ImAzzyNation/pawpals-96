
<?php
require_once '../config.php';

$stmt = $pdo->query('SELECT * FROM pets WHERE type = "lost" ORDER BY created_at DESC');
$pets = $stmt->fetchAll();

echo json_encode($pets);
?>
