<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Function to validate email
function validateEmail(string $email): bool {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to sanitize input
function sanitizeInput(string $data): string {
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

// Function to save submission to JSON file
function saveSubmission(array $data): bool {
    $filename = 'submissions.json';
    
    // If file doesn't exist, create it with the first submission
    if (!file_exists($filename)) {
        $submissions = [$data];
        return file_put_contents($filename, json_encode($submissions, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
    }
    
    // For existing file, append new submission efficiently
    $jsonData = json_encode($data, JSON_UNESCAPED_UNICODE);
    
    // Read the file content
    $content = file_get_contents($filename);
    if ($content === false) {
        return false;
    }
    
    // Remove the closing bracket and add new submission
    $content = rtrim($content, "\n]");
    $newContent = $content . ",\n    " . $jsonData . "\n]";
    
    return file_put_contents($filename, $newContent) !== false;
}

// Handle POST request (form submission)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Validate required fields
        $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
        $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
        $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
        
        $errors = [];
        
        // Validate name
        if (empty($name)) {
            $errors[] = 'Name is required';
        } elseif (strlen($name) < 2) {
            $errors[] = 'Name must be at least 2 characters long';
        }
        
        // Validate email
        if (empty($email)) {
            $errors[] = 'Email is required';
        } elseif (!validateEmail($email)) {
            $errors[] = 'Please provide a valid email address';
        }
        
        // Validate message
        if (empty($message)) {
            $errors[] = 'Message is required';
        } elseif (strlen($message) < 10) {
            $errors[] = 'Message must be at least 10 characters long';
        }
        
        // If there are validation errors, return them
        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $errors
            ]);
            exit();
        }
        
        // Prepare submission data
        $submission = [
            'id' => uniqid(),
            'name' => $name,
            'email' => $email,
            'message' => $message,
            'timestamp' => time()
        ];
        
        // Save to JSON file
        if (saveSubmission($submission)) {
            http_response_code(200);
            echo json_encode([
                'status' => 'success',
                'message' => 'Thank you for your submission! We will get back to you soon.',
                'submission_id' => $submission['id']
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'status' => 'error',
                'message' => 'Failed to save your submission. Please try again.'
            ]);
        }
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'An unexpected error occurred. Please try again later.'
        ]);
    }
} else {
    // Handle GET request - return form info or redirect
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Method not allowed. Please use POST to submit the form.'
    ]);
}