/**
 * Modelo de dados (coleção)
 * Clientes
 */

//importação da biblioteca
const { model, Schema } = require('mongoose')

//criação da estrutura de dados ("coleção") que será usada no banco
const clinteSchema = new Schema({
    nomeCliente: {
        type: String
    },
    foneCliente: {
        type: String
    },
    cpf: {
        type: String,
        unique: true,
        index: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false})

//importação do modelo de dados
//obs: Clientes será o nome da coleção (mongodb-> clientes)
module.exports = model('Clientes', clinteSchema)