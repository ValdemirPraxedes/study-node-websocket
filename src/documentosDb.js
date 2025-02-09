import documentosColecao from "./config/dbConnect.js";

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({nome});
  
    return documento;
  }

  function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne({nome}, {$set: {texto}});
    return atualizacao;
}

function obterDocumentos() {
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function adicionarDocumento(nomeDocumento) {
  const documento = documentosColecao.insertOne({nome: nomeDocumento, texto: ""});
  return documento;
}

function excluirDocumento(nome) {
  const resultado = documentosColecao.deleteOne({nome});
  return resultado;
}

  export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento }; 