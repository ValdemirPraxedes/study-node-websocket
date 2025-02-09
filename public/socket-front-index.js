import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();


function emitirAdicionarDocumento(nomeDocumento){
 socket.emit("adicionar_documento", nomeDocumento);
}

socket.emit("obter_documentos", (documentos) => {
    documentos.forEach(documento => {
        inserirLinkDocumento(documento.nome);
    });
    
});


socket.on("adicionar_documento_interface", (nome) => {
    inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
    alert(`O documento ${nome} já existe`);
})

socket.on("excluir_documento_sucesso", (nome)=> {
    removerLinkDocumento(nome);
});

export {emitirAdicionarDocumento};