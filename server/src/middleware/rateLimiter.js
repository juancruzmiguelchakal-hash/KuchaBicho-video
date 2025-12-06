/**
 * RATE LIMITER MIDDLEWARE
 * =======================
 * Protección contra DoS/DDoS y spam
 * 
 * CONFIGURACIÓN:
 * - Máximo 5 solicitudes por minuto por IP
 * - Mensaje de error personalizado en español
 */

const rateLimit = require('express-rate-limit');

/**
 * Rate limiter general para la API
 * Límite: 5 requests por minuto por IP
 */
const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 5, // Máximo 5 solicitudes por ventana

    // Mensaje de error
    message: {
        success: false,
        error: 'Demasiadas solicitudes. Por favor, espera un momento antes de intentar nuevamente.',
        retryAfter: 60
    },

    // Headers estándar de rate limit
    standardHeaders: true, // Devuelve info en headers `RateLimit-*`
    legacyHeaders: false, // Deshabilita headers `X-RateLimit-*`

    // Función para obtener la IP (compatible con proxies)
    keyGenerator: (req) => {
        return req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    },

    // Handler cuando se excede el límite
    handler: (req, res, next, options) => {
        console.warn(`⚠️ Rate limit excedido para IP: ${req.ip}`);
        res.status(429).json(options.message);
    }
});

/**
 * Rate limiter más estricto para endpoints sensibles (login, registro, contacto)
 * Límite: 3 requests por minuto por IP
 */
const strictLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 3,
    message: {
        success: false,
        error: 'Has excedido el límite de intentos. Espera 1 minuto.',
        retryAfter: 60
    },
    standardHeaders: true,
    legacyHeaders: false
});

/**
 * Rate limiter para autenticación (anti brute-force)
 * Límite: 5 intentos por 15 minutos por IP
 */
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    message: {
        success: false,
        error: 'Demasiados intentos de autenticación. Cuenta temporalmente bloqueada.',
        retryAfter: 900
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true // No cuenta requests exitosos
});

module.exports = {
    apiLimiter,
    strictLimiter,
    authLimiter
};
