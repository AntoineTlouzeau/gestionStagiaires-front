INSERT INTO public.skill (skill_name) VALUES
    ('Python'),
    ('JavaScript'),
    ('C++'),
    ('C#'),
    ('Ruby'),
    ('Swift'),
    ('TypeScript'),
    ('Go'),
    ('Rust'),
    ('PHP'),
    ('Kotlin'),
    ('Scala'),
    ('Haskell'),
    ('Perl'),
    ('Objective-C'),
    ('Lua'),
    ('Dart'),
    ('F#'),
    ('Groovy'),
    ('R'),
   	('Java');

INSERT INTO public.team (id_team, is_week_even, "name", project_end_date, project_start_date, url_backlog, url_repository) VALUES
    (1, true, 'Team Alpha', '2023-04-01 00:00:00', '2023-06-01 00:00:00', 'https://example.com/backlog/team_alpha', 'https://github.com/team_alpha'),
    (2, false, 'Team Beta', '2023-05-02 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_beta', 'https://github.com/team_beta'),
    (3, true, 'Team Gamma', '2023-06-03 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_gamma', 'https://github.com/team_gamma'),
    (4, false, 'Team Delta', '2023-07-04 00:00:00', '2023-06-01 00:00:00', 'https://example.com/backlog/team_delta', 'https://github.com/team_delta'),
    (5, true, 'Team Epsilon', '2023-08-05 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_epsilon', 'https://github.com/team_epsilon'),
    (6, false, 'Team Zeta', '2023-09-06 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_zeta', 'https://github.com/team_zeta'),
    (7, true, 'Team Eta', '2023-04-07 00:00:00', '2023-06-01 00:00:00', 'https://example.com/backlog/team_eta', 'https://github.com/team_eta'),
    (8, false, 'Team Theta', '2023-05-08 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_theta', 'https://github.com/team_theta'),
    (9, true, 'Team Iota', '2023-06-09 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_iota', 'https://github.com/team_iota'),
    (10, false, 'Team Kappa', '2023-07-10 00:00:00', '2023-06-01 00:00:00', 'https://example.com/backlog/team_kappa', 'https://github.com/team_kappa'),
    (11, true, 'Team Lambda', '2023-08-11 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_lambda', 'https://github.com/team_lambda'),
    (12, false, 'Team Mu', '2023-09-12 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_mu', 'https://github.com/team_mu'),
    (13, true, 'Team Nu', '2023-04-13 00:00:00', '2023-10-01 00:00:00', 'https://example.com/backlog/team_nu', 'https://github.com/team_nu'),
    (14, false, 'Team Xi', '2023-05-14 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_xi', 'https://github.com/team_xi'),
    (15, true, 'Team Omicron', '2023-06-15 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_omicron', 'https://github.com/team_omicron'),
    (16, false, 'Team Pi', '2023-07-16 00:00:00', '2023-06-01 00:00:00', 'https://example.com/backlog/team_pi', 'https://github.com/team_pi'),
    (17, true, 'Team Rho', '2023-08-17 00:00:00', '2023-07-01 00:00:00', 'https://example.com/backlog/team_rho', 'https://github.com/team_rho'),
    (18, false, 'Team Sigma', '2023-09-18 00:00:00', '2023-08-01 00:00:00', 'https://example.com/backlog/team_sigma', 'https://github.com/team_sigma'),
    (19, true, 'Team Tau', '2023-04-19 00:00:00', '2023-09-01 00:00:00', 'https://example.com/backlog/team_tau', 'https://github.com/team_tau'),
    (20, false, 'Team Upsilon', '2023-05-20 00:00:00', '2023-01-01 00:00:00', 'https://example.com/backlog/team_upsilon', 'https://github.com/team_upsilon');

INSERT INTO public.intern (id_intern, email, firstname, hired_at, hired_by, is_deleted, lastname, phone_number, presence_type, trainings, url_cv) VALUES
    (1, 'email1@gmail.com', 'John', NULL, NULL, false, 'Doe', '1020304958', 'HYBRIDE', NULL, 'generic_path/cv1'),
    (2, 'email2@gmail.com', 'Alice', NULL, NULL, false, 'Smith', NULL, 'DISTANCIEL', NULL, 'generic_path/cv2'),
    (3, 'email3@gmail.com', 'Bob', NULL, NULL, true, 'Johnson', '2029384756', 'PRESENTIEL', NULL, NULL),
    (4, 'email4@gmail.com', 'Emily', '2023-07-29 12:34:56', 'HR123', false, 'Brown', NULL, 'HYBRIDE', NULL, 'generic_path/cv4'),
    (5, 'email5@gmail.com', 'Michael', NULL, NULL, false, 'Miller', '9876543210', 'DISTANCIEL', NULL, NULL),
    (6, 'email6@gmail.com', 'Sophia', NULL, NULL, true, 'Davis', '8901234567', 'PRESENTIEL', NULL, 'generic_path/cv6'),
    (7, 'email7@gmail.com', 'William', '2023-07-29 09:15:30', 'HR456', false, 'Taylor', '7778889999', 'HYBRIDE', NULL, 'generic_path/cv7'),
    (8, 'email8@gmail.com', 'Emma', NULL, NULL, false, 'Anderson', NULL, 'DISTANCIEL', NULL, NULL),
    (9, 'email9@gmail.com', 'James', NULL, NULL, true, 'Wilson', '5554443333', 'PRESENTIEL', NULL, 'generic_path/cv9'),
    (10, 'email10@gmail.com', 'Olivia', '2023-07-29 16:28:45', 'HR789', false, 'Thomas', '1112223333', 'HYBRIDE', NULL, 'generic_path/cv10'),
    (11, 'email11@gmail.com', 'Daniel', NULL, NULL, false, 'Martinez', NULL, 'DISTANCIEL', NULL, NULL),
    (12, 'email12@gmail.com', 'Ava', NULL, NULL, true, 'Robinson', '4445556666', 'PRESENTIEL', NULL, 'generic_path/cv12'),
    (13, 'email13@gmail.com', 'David', '2023-07-29 14:59:26', 'HR987', false, 'Clark', '6667778888', 'HYBRIDE', NULL, 'generic_path/cv13'),
    (14, 'email14@gmail.com', 'Isabella', NULL, NULL, false, 'Rodriguez', NULL, 'DISTANCIEL', NULL, NULL),
    (15, 'email15@gmail.com', 'Joseph', NULL, NULL, true, 'Lee', '9990001111', 'PRESENTIEL', NULL, 'generic_path/cv15'),
    (16, 'email16@gmail.com', 'Sophie', '2023-07-29 10:20:30', 'HR654', false, 'Scott', '1234567890', 'HYBRIDE', NULL, 'generic_path/cv16'),
    (17, 'email17@gmail.com', 'Alexander', NULL, NULL, false, 'Perez', NULL, 'DISTANCIEL', NULL, NULL),
    (18, 'email18@gmail.com', 'Charlotte', NULL, NULL, true, 'Turner', '4441118888', 'PRESENTIEL', NULL, 'generic_path/cv18'),
    (19, 'email19@gmail.com', 'Matthew', '2023-07-29 08:15:45', 'HR321', false, 'Baker', '7774441111', 'HYBRIDE', NULL, 'generic_path/cv19'),
    (20, 'email20@gmail.com', 'Amelia', NULL, NULL, false, 'Bell', NULL, 'DISTANCIEL', NULL, NULL);

-- Team Alpha skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (1, 'Java'),
    (1, 'Python');

-- Team Beta skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (2, 'JavaScript'),
    (2, 'C++'),
    (2, 'Ruby');

-- Team Gamma skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (3, 'Swift');

-- Team Delta skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (4, 'Go'),
    (4, 'PHP');

-- Team Epsilon skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (5, 'Kotlin'),
    (5, 'Scala'),
    (5, 'Haskell');

-- Team Zeta skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (6, 'Perl');

-- Team Eta skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (7, 'Objective-C'),
    (7, 'Lua');

-- Team Theta skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (8, 'Dart'),
    (8, 'F#');

-- Team Iota skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (9, 'Groovy'),
    (9, 'Rust');

-- Team Kappa skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (10, 'R');

-- Team Lambda skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (11, 'C#'),
    (11, 'Python');

-- Team Mu skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (12, 'Ruby');

-- Team Nu skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (13, 'Java'),
    (13, 'Swift');

-- Team Xi skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (14, 'TypeScript');

-- Team Omicron skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (15, 'Go');

-- Team Pi skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (16, 'Rust'),
    (16, 'PHP');

-- Team Rho skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (17, 'Kotlin'),
    (17, 'Scala');

-- Team Sigma skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (18, 'Haskell'),
    (18, 'Perl');

-- Team Tau skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (19, 'Objective-C'),
    (19, 'Lua');

-- Team Upsilon skills
INSERT INTO public.team_skills (team_id_team, skills_skill_name) VALUES
    (20, 'Dart'),
    (20, 'F#');

-- Team Alpha
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (1, 1, '2023-09-28 16:33:56.889', '2023-07-28 17:32:42.926'),
    (2, 1, '2023-09-15 11:25:38.312', '2023-07-15 09:45:16.709'),
    (3, 1, '2023-10-05 09:10:20.515', '2023-08-05 08:15:42.927');

-- Team Beta
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (4, 2, '2023-09-30 14:17:53.125', '2023-07-30 10:35:22.871'),
    (5, 2, '2023-10-20 16:29:40.108', '2023-08-20 09:55:47.713');

-- Team Gamma
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (6, 3, '2023-10-15 13:10:35.320', '2023-08-15 11:22:16.829');

-- Team Delta
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (7, 4, '2023-10-10 09:43:17.961', '2023-08-10 07:55:12.459'),
    (8, 4, '2023-09-25 17:50:32.602', '2023-07-25 16:00:48.917');

-- Team Epsilon
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (9, 5, '2023-10-05 15:22:40.411', '2023-08-05 14:05:32.082'),
    (10, 5, '2023-09-15 12:05:59.768', '2023-07-15 10:20:18.115');

-- Team Zeta
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (11, 6, '2023-10-18 08:30:45.902', '2023-08-18 07:10:56.612'),
    (12, 6, '2023-09-30 14:55:27.458', '2023-07-30 13:30:18.990');

-- Team Eta
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (13, 7, '2023-09-20 11:25:38.311', '2023-07-20 09:45:16.709');

-- Team Theta
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (14, 8, '2023-10-10 15:17:53.124', '2023-08-10 13:35:22.871'),
    (15, 8, '2023-10-05 16:29:40.108', '2023-08-05 15:55:47.713');

-- Team Iota
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (16, 9, '2023-09-25 12:10:35.319', '2023-07-25 11:22:16.829'),
    (17, 9, '2023-10-20 10:15:12.624', '2023-08-20 09:25:46.824');

-- Team Kappa
INSERT INTO public.intern_team (id_intern, id_team, end_date, start_date) VALUES
    (18, 10, '2023-10-15 15:23:17.961', '2023-08-15 13:35:12.459'),
    (19, 10, '2023-10-05 17:50:32.601', '2023-08-05 15:00:48.917'),
    (20, 10, '2023-09-28 10:55:20.628', '2023-07-28 09:50:42.926');

-- Inserting mock data for the "role" table
INSERT INTO public.role (role_name) VALUES
('Admin'),
('Manager');

-- Inserting mock data for the "manager" table
INSERT INTO public.manager (id_manager, email, lastname, firstname, password, salt, is_deleted, is_validated, phone_number, role_name)
VALUES
(1,'john@example.com', 'Doe', 'John', 'hashed_password_1', 'salt_1', false, true, '1234567890', 'Manager'),
(2,'alice@example.com', 'Smith', 'Alice', 'hashed_password_2', 'salt_2', false, true, '9876543210', 'Manager'),
(3,'bob@example.com', 'Johnson', 'Bob', 'hashed_password_3', 'salt_3', false, true, '5555555555', 'Manager'),
(4,'emily@example.com', 'Williams', 'Emily', 'hashed_password_4', 'salt_4', false, true, '4444444444', 'Manager'),
(5,'david@example.com', 'Brown', 'David', 'hashed_password_5', 'salt_5', false, true, '9999999999', 'Admin'),
(6,'emma@example.com', 'Lee', 'Emma', 'hashed_password_6', 'salt_6', false, true, '1111111111', 'Manager'),
(7,'michael@example.com', 'Miller', 'Michael', 'hashed_password_7', 'salt_7', false, true, '2222222222', 'Manager'),
(8,'olivia@example.com', 'Wilson', 'Olivia', 'hashed_password_8', 'salt_8', false, true, '3333333333', 'Admin'),
(9,'james@example.com', 'Davis', 'James', 'hashed_password_9', 'salt_9', false, true, '6666666666', 'Manager'),
(10,'sophia@example.com', 'Taylor', 'Sophia', 'hashed_password_10', 'salt_10', false, true, '7777777777', 'Manager'),
(11,'manager11@example.com', 'Last11', 'First11', 'hashed_password_11', 'salt_11', false, true, '9999999900', 'Manager'),
(12,'manager12@example.com', 'Last12', 'First12', 'hashed_password_12', 'salt_12', false, true, '8888888888', 'Manager'),
(13,'manager13@example.com', 'Last13', 'First13', 'hashed_password_13', 'salt_13', false, true, '4444444444', 'Manager'),
(14,'manager14@example.com', 'Last14', 'First14', 'hashed_password_14', 'salt_14', false, true, '7777777777', 'Manager'),
(15,'manager15@example.com', 'Last15', 'First15', 'hashed_password_15', 'salt_15', false, true, '5555555555', 'Manager');

-- Inserting relations between managers and skills in the "manager_skill" table
INSERT INTO manager_skill (id_manager, skill_name, level)
VALUES
-- Manager 1 skills
(1, 'JavaScript', 2),
(1, 'Java', 1),

-- Manager 2 skills
(2, 'C++', 2),

-- Manager 3 skills
(3, 'JavaScript', 3),
(3, 'Ruby', 1),
(3, 'Java', 2),

-- Manager 4 skills
(4, 'Python', 2),
(4, 'Go', 3),
(4, 'TypeScript', 1),

-- Manager 5 skills
(5, 'Java', 3),
(5, 'Ruby', 1),

-- Manager 6 skills
(6, 'Python', 1),

-- Manager 7 skills
(7, 'Java', 2),
(7, 'C++', 1),
(7, 'JavaScript', 3),

-- Manager 8 skills
(8, 'Python', 1),
(8, 'C#', 2),

-- Manager 9 skills
(9, 'JavaScript', 2),
(9, 'TypeScript', 3),

-- Manager 10 skills
(10, 'Java', 3),

-- Manager 11 skills
(11, 'Python', 1),
(11, 'C++', 3),

-- Manager 12 skills
(12, 'Java', 2),
(12, 'Go', 1),
(12, 'JavaScript', 3),

-- Manager 13 skills
(13, 'Go', 3),

-- Manager 14 skills
(14, 'Java', 2),
(14, 'C++', 1),
(14, 'TypeScript', 3),

-- Manager 15 skills
(15, 'Python', 3),
(15, 'Swift', 1);

-- Inserting mock data for team_managers table
INSERT INTO public.team_manager (id_team, id_manager)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(4, 3),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 2),
(11, 10),
(5, 2),
(8, 12),
(14, 14),
(15, 15);