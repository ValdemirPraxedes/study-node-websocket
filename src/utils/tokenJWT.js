import jwt from 'jsonwebtoken';

function gerarToken(nome) {

    const token = jwt.sign({
                        nome: nome
                    }, process.env.CHAVE_SECRETA);
    return token;
}

function verificarToken(token) {
    const tokenDecodificado = jwt.verify(token, process.env.CHAVE_SECRETA);

    return tokenDecodificado;
}

export {gerarToken, verificarToken};