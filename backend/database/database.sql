CREATE DATABASE task_manager;

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tasks (title, description) VALUES
('Maghugas ng Plato', 'Hugasan ang mga pinagkainan kagabi bago matulog.'),
('Bumili ng Groceries', 'Bumili ng gatas, itlog, kape, at sabong panlaba.'),
('Mag-aral ng React Router', 'Panoorin ang tutorial tungkol sa useLocation at useNavigate.'),
('I-update ang README.md', 'Ayusin ang documentation para sa deployment sa Railway.'),
('Maglinis ng Kwarto', 'Mag-vacuum ng sahig at magpalit ng punda ng unan.'),
('Magbayad ng Kuryente', 'Magbayad gamit ang Gcash bago ang due date sa Biyernes.'),
('Mag-gym o Mag-exercise', 'Mag-cardio ng 30 minutes at mag-weights.'),
('Ayusin ang Database Indexes', 'Suriin kung mabilis ang takbo ng mga SELECT queries.'),
('Magbasa ng Tech Blog', 'Magbasa tungkol sa magagandang updates sa PostgreSQL 2026.'),
('I-backup ang Source Code', 'I-push ang pinakahuling working code sa GitHub repository.');