/**
 * CSRF TOKEN ROUTE
 * ================
 * Endpoint para obtener el token CSRF
 */

const express = require('express');
const { csrfTokenHandler } = require('../middleware/csrfProtection');

const router = express.Router();

/**
 * GET /api/csrf-token
 * Devuelve un token CSRF para el frontend
 */
router.get('/', csrfTokenHandler);

module.exports = router;
