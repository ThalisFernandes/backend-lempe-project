const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Lempe8596@R3cife",
        database: 'lempe'
    }
);
function buscarClientes(pool, id){  
        let query = id ? `SELECT * FROM clientes WHERE cliente_id = ${id}`: "SELECT * FROM clientes;";
        let response = pool.query(query, (err, ress)=> ress);
        return response; 
}

function inserirCliente(pool, data){
    let query = "INSERT INTO contato_clientes(id_cliente, nome_do_contato, telefone_contato,  setor, ramal, sexo, responsavel_certificados, resp_notas_fiscais, resp_orcamentos, receb_emails_ch_lote, receb_emails_sd_lote, cargo, acesso_sistema, alterar_senha, data_nasc) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"

}   

const clientesRotas = (app)=>{
    app.route('/api/clientes/:id?')
    .get(async (req, res)=>{
        let cliente_id = req.params['id'] ? req.params['id'] : null; 
        let result = await buscarClientes(connection, cliente_id);
        
        res.status(200).json({"resultado": result});    
    })  
    .post((req, res)=>{ 
        res.status(200).json({"resultado": "em construcao"})
    })  
    .put((req, res)=> res)
    .delete((req, res)=> res)
}