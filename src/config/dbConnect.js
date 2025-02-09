import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let documentosColecao;


try {
        const cliente = new MongoClient(process.env.DB_CONNECTION_STRING);
        await cliente.connect();
    
        const db = cliente.db("alura-websockets");
        documentosColecao = db.collection("documentos");
    
        console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
        console.log(erro);
}




export default documentosColecao;