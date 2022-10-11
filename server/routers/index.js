const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const FinancasController = require('../controllers/FinancasController')

router.post('/singin', UserController.Register)
router.post('/login', UserController.Login)

router.post('/financas', FinancasController.registerTransacao)
router.get('/getFinancas/:email', FinancasController.getTransacao)
router.put('/updateFinancas')
router.delete('/deleteFinancas')

module.exports = router