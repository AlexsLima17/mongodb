/**
 * Modulo de conexão co o banco de dados
 * Uso do framework mongoose
 */

//Importação do mongoose
const mongoose = require('mongoose')

//configuração do banco dados 
//ip/link do servidor, autenticação
//ao final da url definir o nome do banco de dados 
//exemplo: /dbcliente
const url = 'mongodb+srv://admin:123Senac@cluster01.xdmri.mongodb.net/'

//validação (evitar a abertura de várias conexões)
let conectado = false 

//metodo para conectar com o banco de dados 
const conectar = async () => {
    //se não estiver conectado
    if(!conectado){
        //conectar com banco de dados 
        try{
            await mongoose.connect(url)//conectar
            conectado = true // setar variável
            console.log("MongoDB Conectado")
        } catch (error) {
            console.error(error)
        }
    }
}

//metodo para desconectar com o banco de dados 
const desconectar = async () => {
    //se estiver conectado
    if(conectado){
        //desconectar
        try {
            await mongoose.disconnect(url) // desconectar
            conectado = false //setar variável
            console.log("MongoDB Desconectado")
        } catch (error) {

        }
    }
}

//exportar para o main os metodos conectar e desconectar
module.exports = {conectar, desconectar}