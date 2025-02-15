import { emitirExcluirDocumento, emitirTextoEditor, selecionarDocumento } from "./socket-front-documento.js";

const socket = io();

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuariosConectados = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem titulo";



textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", (evento) => {
  evento.preventDefault();
  emitirExcluirDocumento(nomeDocumento);
})

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`o documento ${nome} foi excluído com sucesso!`);
    window.location.href = "/";
  }
}

function tratarAutorizacaoSucesso(payloadToken) {
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.nome });
}

function atualizarInterfaceUsuarios(usuariosNoDocumento) {
  listaUsuariosConectados.innerHTML = "";


  usuariosNoDocumento.forEach(usuario => {
    listaUsuariosConectados.innerHTML += `<li class="list-group-item">${usuario}</li>`;
  });


}



export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };