-- ============================================
-- KUCHABICHO DATABASE SCHEMA
-- ============================================
-- Script para crear la base de datos y tablas
-- Ejecutar en MySQL Workbench o línea de comandos

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS kuchabicho
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kuchabicho;

-- ============================================
-- TABLA: contacts
-- ============================================
-- Almacena los mensajes del formulario de contacto

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR(20) NULL,
  ip_address VARCHAR(45) NULL, -- IPv6 compatible
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  read_at DATETIME NULL,
  responded_at DATETIME NULL,
  
  -- Índices para búsquedas frecuentes
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: users (para futuro sistema de login)
-- ============================================
-- Ya preparada con buenas prácticas de seguridad

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  name VARCHAR(100) NOT NULL,
  role ENUM('admin', 'user', 'guest') DEFAULT 'user',
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login DATETIME NULL,
  failed_login_attempts INT DEFAULT 0,
  locked_until DATETIME NULL,
  
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: sessions (para persistir sesiones en DB)
-- ============================================
-- Usar con express-mysql-session en producción

CREATE TABLE IF NOT EXISTS sessions (
  session_id VARCHAR(128) PRIMARY KEY,
  expires INT UNSIGNED NOT NULL,
  data MEDIUMTEXT,
  
  INDEX idx_expires (expires)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
