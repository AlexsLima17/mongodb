/**
 * Modulo de conexão com o banco de dados
 * Uso de framework mongooose
 */
 
//importação do mongoose
const mongoose = require('mongoose')
 
//configuração do banco de dados
// ip/link do servidor,autenticação
// ao final da url definir o nome do banco de dados
//exemplo: /dbclientes
const url = 'mongodb+srv://admin:123Senac@cluster01.bzzae.mongodb.net/dbclientes'
 
//validação (evitar a abertura de varias conexões)
let conectado = false
 
// metodo para conectar com o banco de dados
const conectar = async () => {
    if(!conectado) {
        //conectar com o banco de dados
        try {
        await mongoose.connect(url) //conectar
        conectado = true //setar a variavel
        console.log("MongoDB Conectado")    
        } catch (error) {
            console.error(error)
        }
    }
}
 
// metodo para desconectar com o banco de dados
const desconectar = async () => {
    if(conectado) {
        //desconectar
        try {
            await mongoose.disconnect(url) //desconectar
            conectado = false //setar variavel
            console.log("MongoDB Desconectado")
        } catch (error) {
           
        }
    }
}
 
//exportar para o main os metodos conectar e desconectar
module.exports = {conectar, desconectar}
 