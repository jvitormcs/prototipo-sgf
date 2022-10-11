const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = db.define('User',{
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome_user: {
            type: DataTypes.STRING(220),
            allowNull: false,
            require: true,
        },
        email_user: {
            type: DataTypes.STRING(50),
            allowNull: false,
            require: true,
        },
        senha_user: {
            type: DataTypes.STRING(220),
            allowNull: false,
            require: true,
        },
        
}, {timestamps: false, freezeTableName: true})


module.exports = User