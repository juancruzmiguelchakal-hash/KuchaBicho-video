/**
 * CONTACT ROUTES
 * ==============
 * Endpoint para el formulario de contacto
 * 
 * SEGURIDAD IMPLEMENTADA:
 * - Validación de input con express-validator
 * - Sanitización de datos (anti-XSS)
 * - Prepared statements (anti-SQLi)
 * - Rate limiting (aplicado en el router principal)
 * - Honeypot anti-bot
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');

const router = express.Router();

/**
 * Reglas de validación para el formulario de contacto
 */
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
        .escape(), // Sanitiza HTML (anti-XSS)

    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Email inválido')
        .normalizeEmail()
        .isLength({ max: 255 }).withMessage('Email demasiado largo'),

    body('message')
        .trim()
        .notEmpty().withMessage('El mensaje es requerido')
        .isLength({ min: 10, max: 1000 }).withMessage('El mensaje debe tener entre 10 y 1000 caracteres')
        .escape(), // Sanitiza HTML (anti-XSS)

    body('phone')
        .optional()
        .trim()
        .isMobilePhone('es-AR').withMessage('Número de teléfono inválido'),

    // Honeypot field - si está lleno, es un bot
    body('_honeypot')
        .custom((value) => {
            if (value && value.length > 0) {
                throw new Error('Bot detected');
            }
            return true;
        })
];

/**
 * POST /api/contact
 * Recibe un mensaje del formulario de contacto y lo guarda en la DB
 */
router.post('/', contactValidation, async (req, res) => {
    try {
        // Verificar errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Detectar si es un bot (honeypot)
            const honeypotError = errors.array().find(e => e.msg === 'Bot detected');
            if (honeypotError) {
                console.warn(`🤖 Bot detectado desde IP: ${req.ip}`);
                // Responder con éxito falso para no alertar al bot
                return res.status(200).json({ success: true, message: 'Mensaje enviado' });
            }

            return res.status(400).json({
                success: false,
                errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
            });
        }

        const { name, email, message, phone } = req.body;

        /**
         * PREPARED STATEMENT - PROTECCIÓN CONTRA SQLi
         * ============================================
         * CORRECTO: Usar placeholders (?) y pasar valores como array
         * 
         * NUNCA HACER (vulnerable a SQLi):
         * await query(`INSERT INTO contacts (name) VALUES ('${name}')`);
         */
        const sql = `
      INSERT INTO contacts (name, email, message, phone, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

        await query(sql, [name, email, message, phone || null, req.ip]);

        console.log(`✅ Nuevo mensaje de contacto de: ${email}`);

        res.status(201).json({
            success: true,
            message: 'Tu mensaje ha sido enviado. Te responderemos pronto!'
        });

    } catch (error) {
        console.error('Error guardando mensaje de contacto:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor. Por favor, intenta más tarde.'
        });
    }
});

/**
 * GET /api/contact
 * Lista todos los mensajes (solo para admins)
 * Nota: Agregar middleware isAuthenticated y hasRole('admin') en producción
 */
router.get('/', async (req, res) => {
    try {
        // PREPARED STATEMENT - safe from SQLi
        const messages = await query(`
      SELECT id, name, email, message, phone, created_at 
      FROM contacts 
      ORDER BY created_at DESC 
      LIMIT ?
    `, [50]);

        res.json({
            success: true,
            data: messages
        });

    } catch (error) {
        console.error('Error obteniendo mensajes:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
});

module.exports = router;
