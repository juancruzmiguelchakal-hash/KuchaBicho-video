/**
 * AUTHENTICATION MIDDLEWARE
 * =========================
 * Control de acceso y autenticación (Broken Access Control prevention)
 * 
 * SEGURIDAD IMPLEMENTADA:
 * - Verificación de sesión activa
 * - Verificación de roles y permisos
 * - Protección contra acceso no autorizado
 */

const bcrypt = require('bcryptjs');

// Roles disponibles en el sistema
const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

/**
 * Middleware para verificar que el usuario está autenticado
 * Usar en rutas que requieren login
 */
const isAuthenticated = (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({
            success: false,
            error: 'No autorizado. Debes iniciar sesión para acceder a este recurso.'
        });
    }

    // Usuario autenticado, continuar
    next();
};

/**
 * Middleware factory para verificar roles específicos
 * @param {...string} allowedRoles - Roles permitidos para acceder al recurso
 * @returns {Function} Middleware de verificación de rol
 * 
 * @example
 * // Solo admins pueden acceder
 * router.delete('/users/:id', hasRole('admin'), deleteUser);
 * 
 * // Admins y users pueden acceder
 * router.get('/profile', hasRole('admin', 'user'), getProfile);
 */
const hasRole = (...allowedRoles) => {
    return (req, res, next) => {
        // Primero verificar autenticación
        if (!req.session || !req.session.userId) {
            return res.status(401).json({
                success: false,
                error: 'No autorizado. Debes iniciar sesión.'
            });
        }

        // Verificar rol
        const userRole = req.session.userRole;

        if (!userRole || !allowedRoles.includes(userRole)) {
            console.warn(`⚠️ Acceso denegado: Usuario ${req.session.userId} con rol ${userRole} intentó acceder a recurso restringido`);
            return res.status(403).json({
                success: false,
                error: 'Acceso denegado. No tienes permisos para realizar esta acción.'
            });
        }

        // Rol válido, continuar
        next();
    };
};

/**
 * Middleware para verificar que el usuario accede a sus propios recursos
 * Previene que un usuario acceda a datos de otros usuarios
 * @param {string} paramName - Nombre del parámetro que contiene el ID del recurso
 */
const isOwner = (paramName = 'userId') => {
    return (req, res, next) => {
        const resourceUserId = req.params[paramName];
        const currentUserId = req.session?.userId;

        // Admins pueden acceder a todo
        if (req.session?.userRole === ROLES.ADMIN) {
            return next();
        }

        // Verificar que el usuario accede a su propio recurso
        if (resourceUserId !== currentUserId?.toString()) {
            console.warn(`⚠️ Broken Access Control: Usuario ${currentUserId} intentó acceder a recurso de usuario ${resourceUserId}`);
            return res.status(403).json({
                success: false,
                error: 'Acceso denegado. No puedes acceder a recursos de otros usuarios.'
            });
        }

        next();
    };
};

/**
 * Hash de contraseña usando bcrypt
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} - Contraseña hasheada
 */
const hashPassword = async (password) => {
    const saltRounds = 12; // Factor de costo alto para mayor seguridad
    return await bcrypt.hash(password, saltRounds);
};

/**
 * Verificar contraseña contra hash
 * @param {string} password - Contraseña en texto plano
 * @param {string} hash - Hash almacenado
 * @returns {Promise<boolean>} - true si coinciden
 */
const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    ROLES,
    isAuthenticated,
    hasRole,
    isOwner,
    hashPassword,
    verifyPassword
};
