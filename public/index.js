import { emitirAdicionarDocumento } from "./socket-front-index.js";
import { obterCookie, removerCookie } from "./utils/cookies.js";


const tokenJwt = obterCookie("tokenJwt");

const botaoLogout = document.getElementById("botao-logout");

botaoLogout.addEventListener("click", () => {
    removerCookie("tokenJwt");
    alert("Usuário deslogado com sucesso!");
    window.location.href = "/login/index.html";
});

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");


form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value = "";
});

function inserirLinkDocumento(nome) {
    listaDocumentos.innerHTML += `<a href="./documento/index.html?nome=${nome}" class="list-group-item list-group-item-action" id="documento-${nome}">${nome}</a>`;

}

function removerLinkDocumento(nome) {

    const documento = document.getElementById(`documento-${nome}`);

    listaDocumentos.removeChild(documento);
}

export { inserirLinkDocumento, removerLinkDocumento };
