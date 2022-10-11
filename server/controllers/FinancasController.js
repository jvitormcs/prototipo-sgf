const Financas = require('../models/modelFinancas')
const User = require('../models/modelUser')

module.exports = class FinancasController{

    static async registerTransacao(req, res) {

        const { tipo_transacao, valor, email } = req.body
        
        if(!tipo_transacao){
            res.status(422).json({message: 'Tipo da transação não foi escolhida'})
            return
        }

        if(!valor){
            res.status(422).json({message: 'O valor da transação não pode fincar em branco'})
            return
        }
        
        const user = await User.findOne({where: {email_user: email}})
    
        
        if(!user.id_user){
            res.status(422).json({message: 'O id do usuário não pode ficar em branco'})
            return
        }
        

        const transacao = {
            tipo_transacao,
            valor,
            id_user: user.id_user
        }

        try{

            await Financas.create(transacao)
            res.status(200).json({message: 'Transação cadastrada com sucesso'})

        } catch(err){
            res.status(500).json({ message: err })
        }


    }
    static async getTransacao(req, res) {

        const {email}  = req.params

       const user = await User.findOne({where: {email_user: email}})

        const transacao = await Financas.findAll({
            where: {
                id_user: user.id_user
            }
        })

        try{
            res.status(200).json(transacao)

        }
        catch(err){
            res.status(401).json({message: 'Houve um erro ao buscar as informações'})
        }

    }

}

