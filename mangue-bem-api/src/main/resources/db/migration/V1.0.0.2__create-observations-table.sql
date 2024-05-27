CREATE TABLE observations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted BIT(1) NOT NULL,
    specie_id INT NOT NULL,
    city_ibge_id VARCHAR(255) NOT NULL,
    state_ibge_id VARCHAR(255) NOT NULL,
    approval_status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL,
    revised_by INT,
    FOREIGN KEY (revised_by) REFERENCES users(id),
    FOREIGN KEY (specie_id) REFERENCES species(id)
);