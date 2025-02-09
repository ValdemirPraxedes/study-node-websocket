import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
    const usuario = usuariosColecao.findOne({nome});
  
    return usuario;
  }

  function atualizaUsuario(nome, senha) {
    const atualizacao = usuariosColecao.updateOne({nome}, {$set: {senha}});
    return atualizacao;
}

function obterUsuarios() {
  const usuarios = usuariosColecao.find().toArray();
  return usuarios;
}

function cadastrarUsuario({nome, senha}) {

  const {hashSenha, salSenha} = criaHashESalSenha(senha);

  const usuario = usuariosColecao.insertOne({nome, hashSenha,salSenha });
  return usuario;
}

function excluirUsuario(nome) {
  const resultado = usuariosColecao.deleteOne({nome});
  return resultado;
}

  export { encontrarUsuario, atualizaUsuario, obterUsuarios, cadastrarUsuario, excluirUsuario }; 