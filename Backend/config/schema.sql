create database if not exists grafico;
use grafico;

create table if not exists grafico (
    id int primary key auto_increment,
    nome varchar(100) not null,
    valor int not null
);

CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    period_name VARCHAR(50) NOT NULL,
    total_inscritos INT NOT NULL
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_agendamento DATE NOT NULL,
    total_agendamentos INT NOT NULL
);

INSERT INTO cursos (course_name, period_name, total_inscritos) VALUES
('Administração', 'Manhã', 32),
('Administração', 'Tarde', 49),
('Automação Residencial e Robótica', 'Manhã', 4),
('Automação Residencial e Robótica', 'Tarde', 5),
('Informática', 'Manhã', 31),
('Informática', 'Tarde', 49),
('Inglês Básico - Pré Intermediário (Diurno)', 'Manhã 1', 30),
('Inglês Básico - Pré Intermediário (Diurno)', 'Manhã 2', 20),
('Inglês Básico - Pré Intermediário (Diurno)', 'Tarde 1', 51),
('Inglês Básico - Pré Intermediário (Diurno)', 'Tarde 2', 24),
('Inglês Intermediário (Sábados)', 'Manhã', 93),
('Inglês Pré Intermediário (Noturno)', 'Noite', 14);

INSERT INTO agendamentos (data_agendamento, total_agendamentos) VALUES
('2025-10-08', 1),
('2025-10-09', 3),
('2025-10-10', 7),
('2025-10-13', 28),
('2025-10-14', 55),
('2025-10-15', 120),
('2025-10-16', 54),
('2025-10-17', 70),
('2025-10-20', 53),
('2025-10-21', 37),
('2025-10-22', 28),
('2025-10-23', 29),
('2025-10-24', 43);
