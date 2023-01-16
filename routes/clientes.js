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