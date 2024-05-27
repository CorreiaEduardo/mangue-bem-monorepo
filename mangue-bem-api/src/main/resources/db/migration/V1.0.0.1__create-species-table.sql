CREATE TABLE species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted BIT(1) NOT NULL,
    popular_name VARCHAR(255),
    description TEXT,
    approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
    revised_by INT,
    FOREIGN KEY (revised_by) REFERENCES users(id)
);