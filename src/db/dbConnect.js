import mongoose from "mongoose";
import { MongoClient } from "mongodb";

let documentosColecao;
let usuariosColecao;


try {
        const cliente = new MongoClient(process.env.DB_CONNECTION_STRING);
        await cliente.connect();
    
        const db = cliente.db("alura-websockets");
        documentosColecao = db.collection("documentos");
        usuariosColecao = db.collection("usuarios");
        
    
        console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
        console.log(erro);
}




export { documentosColecao, usuariosColecao };