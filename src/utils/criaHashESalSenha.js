import { randomBytes, scryptSync, timingSafeEqual  } from "crypto";

function criaHashESalSenha(senhaDigitada) {
  const salSenha = randomBytes(16).toString("hex");

  const hashSenha = scryptSync(senhaDigitada, salSenha, 64).toString("hex");

  return { salSenha, hashSenha };
}

function criaHash(senha, sal) {
  return scryptSync(senha, sal, 64).toString("hex");
}

function verificarHashIguais(hash1, hash2) {
  return timingSafeEqual(Buffer.from(hash1, 'hex'), Buffer.from(hash2, 'hex'));
}

export {criaHashESalSenha, criaHash, verificarHashIguais};