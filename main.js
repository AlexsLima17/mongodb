/**
 * Processo principal
 * Estudo do CRUD com MongoDB
 */

// Importação do módulo de conexão (database.js)
const { conectar, desconectar } = require('./database')

// Importação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes')

// Importação do pacote string-similarity para aprimorar a busca por nome
const stringSimilarity = require('string-similarity')

// CRUD Create - Função para adicionar um novo cliente
const criarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })
        
        // Salva os dados do cliente no banco
        await novoCliente.save()
        console.log("✅ Cliente adicionado com sucesso!")

    } catch (error) {
        // Tratamento de exceções específicas
        if (error.code === 11000) {
            console.log(`⚠️ Erro: O CPF ${cpfCli} já está cadastrado!`)
        } else {
            console.log("❌ Erro ao adicionar cliente:", error)
        }
    }
}

// CRUD Read - Função para listar todos os clientes cadastrados
const listarClientes = async () => {
    try {
        const clientes = await clienteModel.find().sort({ nomeCliente: 1 })
        
        if (clientes.length === 0) {
            console.log("📭 Nenhum cliente cadastrado!")
        } else {
            console.table(clientes) // Exibe os clientes em formato de tabela
        }
    } catch (error) {
        console.log("❌ Erro ao listar clientes:", error)
    }
}

// CRUD Read - Função para buscar um cliente específico
const buscarCliente = async (nome) => {
    try {
        const clientes = await clienteModel.find({ 
            nomeCliente: new RegExp(nome, 'i') 
        })

        // Validação: Se não existir o cliente pesquisado
        if (clientes.length === 0) {
            console.log("⚠️ Cliente não cadastrado!")
            return
        }

        // Calcula a similaridade entre os nomes retornados e o nome pesquisado
        const nomesClientes = clientes.map(cliente => cliente.nomeCliente)
        const match = stringSimilarity.findBestMatch(nome, nomesClientes)
        
        // Cliente com melhor similaridade
        const melhorCliente = clientes.find(cliente => cliente.nomeCliente === match.bestMatch.target)

        // Formatação da data 
        const clienteFormatado = {
            nomeCliente: melhorCliente.nomeCliente,
            foneCliente: melhorCliente.foneCliente,
            cpf: melhorCliente.cpf,
            dataCadastro: melhorCliente.dataCadastro?.toLocaleDateString('pt-br') || "Data não informada"
        }

        console.log("🔍 Cliente encontrado:")
        console.log(clienteFormatado)

    } catch (error) {
        console.log("❌ Erro ao buscar cliente:", error)
    }
}

// Execução da aplicação
const app = async () => {
    await conectar()

    // CRUD - Create (Criar um cliente)
    // await criarCliente("João Silva", "99999-1111", "123.456.789-92")

    // CRUD - Read (Listar clientes)
    // await listarClientes()

    // CRUD - Read (Buscar um cliente específico)
    await buscarCliente("mario")

    await desconectar()
}

console.clear()
app()
