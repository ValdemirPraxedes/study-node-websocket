import { definirCookie } from "../utils/cookies.js";


const socket = io();


function emitirAutenticarUsuario(dados) {
    console.log("função emitirAutenticarUsuario");
    socket.emit("autenticar_usuario", dados);
}


socket.on("autenticacao_sucesso", (token) => {
   // localStorage.setItem("token", token);
    definirCookie("tokenJwt", token);
    alert("Usuario autenticado com sucesso");
    window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("Nome do usuario ou senha invalidas!"));

export { emitirAutenticarUsuario }; 