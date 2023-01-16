const mysql = require('mysql');

const connection = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Lempe8596@R3cife",
        database: 'lempe'
    }
);


function inserirInstrumento(req){
    console.log(req.body);
    let insertValues = [];
    for ([key, value] of Object.entries(req.body) ){
            insertValues.push(value);
    }
    console.log(insertValues);
    let query = `INSERT INTO instrumento (nome_instrumento, cod_tag_instrumento, num_serie, tag, tipo_instrumento, modelo, fabrincante, proxima_calibracao, calibrar_cada, intrumento_ativo, faixas, cliente_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    
    let ultimoInstrumentoInserido;
    try{
        ultimoInstrumentoInserido =  connection.query(query, [...insertValues],(err, result) => {
            if (err) throw err;
            return result.affectedRows;
          });
    } catch(e) {
        return e;
    }
    return ultimoInstrumentoInserido;
}

const instrumentoRoutes= (app)=>{
    app.route('/api/instrumento/:id?')
    .get(async (req, res)=>{
        let id = req.params['id'] ? req.params['id']: null;
        let getInstrumento = id !== null 
            ? `SELECT * FROM instrumento WHERE codigo = ${id};`
            : 'SELECT * FROM instrumento;';
        connection.query(getInstrumento, (err, result)=>{
            result.length > 0 ? res.status(200).send({message:"Sucesso", result:result})
            : res.status(400).send({message:"Erro", result:result});
        });
    })
    .post(async (req, res)=>{
       const result = await inserirInstrumento(req);
       result 
       ? res.status(200).send({message:"Sucesso"})
       : res.status(400).send({message:"Error"});
    })
    .put((req, res)=>{})
    .delete((req, res)=>{})
}



module.exports = instrumentoRoutes;