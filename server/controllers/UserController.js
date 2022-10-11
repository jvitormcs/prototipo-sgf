const User = require('../models/modelUser')
const bcrypt = require('bcrypt')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-token')


module.exports= class UserController {
    
    

    static async Register(req, res){
        const {nome, email, senha} = req.body
        

        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if(!senha){
            res.status(422).json({message: 'A senha é obrigatório'})
            return
        }

        if(email == undefined){

            res.status(400).json({message: 'O e-mail invalido'})
            return
        }
        
        const userExists = await User.findOne({ where: {email_user: email} })

        
        if (userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
        return
    }
    
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(senha, salt)

        const user = {
            nome_user: nome,
            email_user: email.toLowerCase(),
            senha_user: passwordHash,
        }

        try{
            await User.create(user)
            await createUserToken(user, req, res)
        } catch(err){
            res.status(500).json({ message: err })
        }
    
    }

    static async Login(req, res){
        
        const { senha } = req.body

        let { email } = req.body
        
        console.log(email)

        email = email.toLowerCase()

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'})
        }
        
        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }

        const user = await User.findOne({where: {email_user: email}})
        if(!user){
            res.status(422).json({message: 'Não há usuário cadastrado com este e-mail!'})
            return
        }


        const passwordMatch = bcrypt.compareSync(senha, user.senha_user)

    

        if(!passwordMatch){
            res.status(422).json({message: 'Senha incorreta'})
            return
        }

        await createUserToken(user, req, res)
        
    
    }

    static async checkUser(req, res) {
        let currentUser
    
        console.log(req.headers.authorization)
    
        if (req.headers.authorization) {
          const token = getToken(req)
          const decoded = jwt.verify(token, 'D!RMJik2Q45ZnXx!CRkZ')
    
          currentUser = await User.findById(decoded.id)
    
          currentUser.password = undefined
        } else {
          currentUser = null
        }
    
        res.status(200).send(currentUser)
      }



}