const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./modelUser')

const Financas = db.define('Financas',{
        id_transacao: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_transacao: {
            type: DataTypes.STRING(100),
            allowNull: false,
            require: true,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            require: true,
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            require: true,
            defaultValue: 0
        },
        
}, {timestamps: false, freezeTableName: true})


Financas.belongsTo(User, {
    constraints: true,
    foreignKey: 'id_user',
    foreignKeyConstraint: 'id_user'
})

User.hasMany(Financas, {
    constraints: true,
    foreignKey: 'id_user',
    foreignKeyConstraint: 'id_user'
})


module.exports = Financas