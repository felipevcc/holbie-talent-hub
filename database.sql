-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS holbie_talent_hub;
USE holbie_talent_hub;

-- Tabla "company_profiles"
CREATE TABLE IF NOT EXISTS company_profiles (
  profile_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(255),
  industry VARCHAR(255),
  about_us TEXT,
  location VARCHAR(255),
  website VARCHAR(512),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "professional_profiles"
CREATE TABLE IF NOT EXISTS professional_profiles (
  profile_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  is_user BOOLEAN NOT NULL DEFAULT TRUE,
  headline VARCHAR(255),
  about_me TEXT,
  location VARCHAR(255),
  job_name VARCHAR(255),
  kind_job ENUM('REMOTE', 'ONSITE', 'BOTH'),
  job_type ENUM('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'CONTRACT', 'VOLUNTEER', 'OTHER'),
  salary_min INT,
  salary_max INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "company_professional_profiles" n:m
CREATE TABLE IF NOT EXISTS company_professional_profiles (
  company_id BIGINT UNSIGNED NOT NULL,
  professional_profile_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (company_id, professional_profile_id),
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (professional_profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "projects"
CREATE TABLE IF NOT EXISTS projects (
  project_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  repository VARCHAR(255),
  website VARCHAR(512),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "professional_profiles_projects"
CREATE TABLE IF NOT EXISTS professional_profiles_projects (
  profile_id BIGINT UNSIGNED NOT NULL,
  project_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (profile_id, project_id),
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "users" 
CREATE TABLE IF NOT EXISTS users (
  user_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ACADEMY-STUDENTS', 'ACADEMY-STAFF', 'ACADEMY-TALENT-COORDINATOR', 'COMPANY-STAFF', 'COMPANY-CTO', 'COMPANY-CEO', 'COMPANY-ADMIN', 'COMPANY-RECLUTER') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  company_id BIGINT UNSIGNED NULL,
  professional_id BIGINT UNSIGNED NULL UNIQUE,
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "professional_profile_contacts"
CREATE TABLE IF NOT EXISTS professional_profile_contacts (
  contact_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  contact_type VARCHAR(50),
  contact_info VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  profile_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "company_contacts"
CREATE TABLE IF NOT EXISTS company_contacts (
  contact_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  contact_type VARCHAR(50),
  contact_info VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  company_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "project_contacts"
CREATE TABLE IF NOT EXISTS project_contacts (
  contact_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  contact_type VARCHAR(50),
  contact_info VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  project_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "education"
CREATE TABLE IF NOT EXISTS education (
  education_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  institution VARCHAR(255),
  degree VARCHAR(255),
  field_of_study VARCHAR(255),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  profile_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "professional_profile_multimedia"
CREATE TABLE IF NOT EXISTS professional_profile_multimedia (
  media_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  media_type VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  profile_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "company_multimedia"
CREATE TABLE IF NOT EXISTS company_multimedia (
  media_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  media_type VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  profile_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "education_multimedia"
CREATE TABLE IF NOT EXISTS education_multimedia (
  media_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  media_type VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  education_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (education_id) REFERENCES education(education_id) ON DELETE CASCADE
);

-- Tabla "project_multimedia"
CREATE TABLE IF NOT EXISTS project_multimedia (
  media_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  media_type VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  project_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "skills"
CREATE TABLE IF NOT EXISTS skills (
  skill_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla "experience"
CREATE TABLE IF NOT EXISTS experience (
  experience_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(255),
  position VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  profile_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "applications"
CREATE TABLE IF NOT EXISTS applications (
  application_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  status ENUM('PENDING', 'IN_PROGRESS', 'REJECTED', 'FINISHED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  company_id BIGINT UNSIGNED NOT NULL,
  professional_id BIGINT UNSIGNED NOT NULL,
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);

-- Tabla "ratings"
CREATE TABLE IF NOT EXISTS ratings (
  rating_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  positive_rating BOOLEAN NOT NULL DEFAULT TRUE,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  sender_id BIGINT UNSIGNED NOT NULL,
  receiver_id BIGINT UNSIGNED NOT NULL,
  UNIQUE KEY (sender_id, receiver_id),
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tabla "project_ratings"
CREATE TABLE IF NOT EXISTS project_ratings (
  rating_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  positive_rating BOOLEAN NOT NULL DEFAULT TRUE,
  comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  company_id BIGINT UNSIGNED NOT NULL,
  project_id BIGINT UNSIGNED NOT NULL,
  UNIQUE KEY (company_id, project_id),
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "messages"
CREATE TABLE IF NOT EXISTS messages (
  message_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  subject VARCHAR(255),
  content TEXT,
  type_connection ENUM('APPLICATION', 'PROJECT') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  sender_id BIGINT UNSIGNED NOT NULL,
  receiver_id BIGINT UNSIGNED NOT NULL,
  application_id BIGINT UNSIGNED NULL,
  project_id BIGINT UNSIGNED NULL,
  FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (application_id) REFERENCES applications(application_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "professional_skills"
CREATE TABLE IF NOT EXISTS professional_skills (
  profile_id BIGINT UNSIGNED NOT NULL,
  skill_id BIGINT UNSIGNED NOT NULL,
  proficiency_level INT DEFAULT 1,
  PRIMARY KEY (profile_id, skill_id),
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- Tabla "project_skills"
CREATE TABLE IF NOT EXISTS project_skills (
  project_id BIGINT UNSIGNED NOT NULL,
  skill_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (project_id, skill_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- Tabla "filters_professional"
CREATE TABLE IF NOT EXISTS filters_professional (
  company_id BIGINT UNSIGNED NOT NULL,
  profile_id BIGINT UNSIGNED NOT NULL,
  rating INT,
  PRIMARY KEY (company_id, profile_id),
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE -- no es un usuario, es un perfil ideal de filtro
);

-- Tabla "company_capstone_projects"
CREATE TABLE IF NOT EXISTS company_capstone_projects (
  company_id BIGINT UNSIGNED NOT NULL,
  project_id BIGINT UNSIGNED NOT NULL,
  kind TEXT,
  active BOOLEAN,
  PRIMARY KEY (company_id, project_id),
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
);

-- Tabla "favorite_profiles"
CREATE TABLE IF NOT EXISTS favorite_profiles (
  company_id BIGINT UNSIGNED NOT NULL,
  profile_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (company_id, profile_id),
  FOREIGN KEY (company_id) REFERENCES company_profiles(profile_id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES professional_profiles(profile_id) ON DELETE CASCADE
);
