<?php
header('Content-Type: application/json');

// Récupérer les données POST
$data = json_decode(file_get_contents('php://input'), true);
$ip = $data['ip'] ?? '';
$code = $data['code'] ?? '';

// Vérifier le code de déblocage
if ($code === '123') {
    try {
        // Chemin vers le fichier des IPs bloquées
        $blockedIpsFile = 'blocked_ips.txt';
        
        // Lire les IPs bloquées
        $blockedIps = file_exists($blockedIpsFile) ? 
            file($blockedIpsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) : 
            [];
        
        // Retirer l'IP de la liste
        $blockedIps = array_diff($blockedIps, [$ip]);
        
        // Sauvegarder la nouvelle liste
        file_put_contents($blockedIpsFile, implode("\n", $blockedIps));
        
        echo json_encode(['success' => true, 'message' => 'IP débloquée avec succès']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erreur lors du déblocage']);
    }
} else {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Code de déblocage incorrect']);
}
?> 