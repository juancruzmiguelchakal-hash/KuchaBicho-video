/**
 * CSRF PROTECTION MIDDLEWARE
 * ==========================
 * Protección contra Cross-Site Request Forgery
 * 
 * FUNCIONAMIENTO:
 * 1. El frontend hace GET a /api/csrf-token para obtener el token
 * 2. El frontend incluye el token en el header 'x-csrf-token' en todas las peticiones POST/PUT/DELETE
 * 3. El servidor valida el token antes de procesar la petición
 */

const { doubleCsrf } = require('csrf-csrf');

// Configuración de CSRF con double-submit cookie pattern
const {
    generateToken,
    doubleCsrfProtection,
} = doubleCsrf({
    // Secreto para firmar los tokens
    getSecret: () => process.env.CSRF_SECRET || 'fallback-csrf-secret-change-in-production',

    // Nombre de la cookie
    cookieName: '__Host-csrf', // Prefijo __Host- para máxima seguridad

    // Opciones de la cookie
    cookieOptions: {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 1000 * 60 * 60, // 1 hora
    },

    // Header donde el frontend envía el token
    getTokenFromRequest: (req) => req.headers['x-csrf-token'],

    // Tamaño del token
    size: 64,

    // Métodos ignorados (GET, HEAD, OPTIONS no necesitan CSRF)
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

/**
 * Middleware para generar y enviar el token CSRF
 */
const csrfTokenHandler = (req, res) => {
    const token = generateToken(req, res);
    res.json({ csrfToken: token });
};

/**
 * Middleware de protección CSRF
 * Usar en rutas que modifican datos (POST, PUT, DELETE)
 */
const csrfProtection = (req, res, next) => {
    try {
        doubleCsrfProtection(req, res, next);
    } catch (error) {
        console.warn(`⚠️ CSRF validation failed for ${req.ip}: ${error.message}`);
        return res.status(403).json({
            success: false,
            error: 'Token CSRF inválido o expirado. Recarga la página e intenta nuevamente.'
        });
    }
};

module.exports = {
    generateToken,
    csrfTokenHandler,
    csrfProtection,
    doubleCsrfProtection
};
