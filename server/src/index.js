/**
 * KUCHABICHO BACKEND - SERVIDOR PRINCIPAL
 * =======================================
 * Servidor Express seguro con todas las protecciones OWASP
 * 
 * SEGURIDAD IMPLEMENTADA:
 * ✅ Helmet - Headers HTTP seguros
 * ✅ CORS - Control de origen cruzado
 * ✅ Rate Limiting - Protección DoS (5 req/min por IP)
 * ✅ CSRF Protection - Tokens anti-CSRF
 * ✅ Secure Sessions - HttpOnly, Secure, SameSite cookies
 * ✅ Prepared Statements - Anti-SQLi
 * ✅ Input Validation - Anti-XSS
 * ✅ Authentication Middleware - BAC prevention
 */

// Cargar variables de entorno PRIMERO
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

// Middlewares de seguridad
const { apiLimiter, strictLimiter } = require('./middleware/rateLimiter');
const { doubleCsrfProtection } = require('./middleware/csrfProtection');

// Rutas
const contactRoutes = require('./routes/contact');
const csrfRoutes = require('./routes/csrf');

// Database
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// 1. HELMET - Headers de seguridad HTTP
// ==========================================
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"], // Necesario para algunos estilos inline
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", process.env.FRONTEND_URL || 'http://localhost:5173'],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false, // Desactivar si tienes problemas con recursos externos
}));

// ==========================================
// 2. CORS - Control de origen cruzado
// ==========================================
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // Permitir cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-csrf-token', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ==========================================
// 3. BODY PARSING
// ==========================================
app.use(express.json({ limit: '10kb' })); // Limitar tamaño del body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ==========================================
// 4. SESIONES SEGURAS
// ==========================================
/**
 * CONFIGURACIÓN DE COOKIES DE SESIÓN
 * ===================================
 * - HttpOnly: true - Previene acceso desde JavaScript (anti-XSS)
 * - Secure: true (en producción) - Solo HTTPS
 * - SameSite: 'strict' - Previene CSRF
 */
app.use(session({
    name: '__Host-session', // Prefijo __Host- para máxima seguridad
    secret: process.env.SESSION_SECRET || 'change-this-in-production-min-32-chars',
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,           // ✅ No accesible desde JavaScript
        secure: process.env.NODE_ENV === 'production', // ✅ Solo HTTPS en producción
        sameSite: 'strict',       // ✅ Protección CSRF
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        path: '/',
    },

    // En producción, usar un store como Redis o MySQL
    // Por ahora usamos MemoryStore (no recomendado para producción)
}));

// ==========================================
// 5. TRUST PROXY (para obtener IP real detrás de proxy/load balancer)
// ==========================================
app.set('trust proxy', 1);

// ==========================================
// 6. RATE LIMITING GLOBAL
// ==========================================
app.use('/api/', apiLimiter);

// ==========================================
// 7. RUTAS
// ==========================================

// Ruta de salud (sin protección CSRF)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Ruta para obtener token CSRF (sin protección CSRF obviamente)
app.use('/api/csrf-token', csrfRoutes);

// Aplicar protección CSRF a rutas que modifican datos
app.use('/api/contact', strictLimiter, doubleCsrfProtection, contactRoutes);

// ==========================================
// 8. MANEJO DE ERRORES
// ==========================================

// 404 - Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Recurso no encontrado'
    });
});

// Error handler global
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Error de CSRF
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            success: false,
            error: 'Token CSRF inválido. Recarga la página e intenta nuevamente.'
        });
    }

    // Error genérico
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Error interno del servidor'
            : err.message
    });
});

// ==========================================
// 9. INICIAR SERVIDOR
// ==========================================
async function startServer() {
    // Probar conexión a base de datos
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.warn('⚠️ Servidor iniciando sin conexión a base de datos');
        console.warn('   Configura las variables DB_* en el archivo .env');
    }

    app.listen(PORT, () => {
        console.log('=========================================');
        console.log('🔒 KUCHABICHO BACKEND - SERVIDOR SEGURO');
        console.log('=========================================');
        console.log(`✅ Servidor corriendo en puerto ${PORT}`);
        console.log(`✅ Entorno: ${process.env.NODE_ENV || 'development'}`);
        console.log(`✅ CORS habilitado para: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
        console.log('');
        console.log('🛡️  PROTECCIONES ACTIVAS:');
        console.log('   • Helmet (headers seguros)');
        console.log('   • Rate Limiting (5 req/min)');
        console.log('   • CSRF Protection');
        console.log('   • Secure Sessions (HttpOnly, SameSite)');
        console.log('   • Prepared Statements (anti-SQLi)');
        console.log('   • Input Validation (anti-XSS)');
        console.log('=========================================');
    });
}

startServer();

module.exports = app;
