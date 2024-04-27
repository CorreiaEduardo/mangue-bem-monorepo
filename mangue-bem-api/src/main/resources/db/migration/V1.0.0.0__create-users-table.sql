CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted BIT(1) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'VISITOR', 'CURATOR') NOT NULL
);
