import { useState } from "react";

function Senha() {
  const [senha, setSenha] = useState("");
  const [senhaEmitida, setSenhaEmitida] = useState("");
  const [fila, setFila] = useState([]);
  const [numeros, setNumeros] = useState({
    SP: 0,
    SE: 0,
    SG: 0
  });

  const [senhaChamando, setSenhaChamando] = useState("");
  const [ultimaSenhaFoiSP, setUltimaSenhaFoiSP] = useState(false);

  function emitirSenha() {
    if (senha === "") {
      alert("Escolha o tipo de atendimento.");
      return;
    }

   const numeroAtual = numeros[senha] + 1;
   setNumeros({
    ...numeros,
    [senha]: numeroAtual
   });
   const prefixo= senha;
   const numero = numeroAtual;

    const novaSenha = `${prefixo}${String(numero).padStart(3, "0")}`;

    setSenhaEmitida(novaSenha);

    setFila((filaAtual) => [
      ...filaAtual,
      novaSenha,
    ]);
  }

  function chamarProximaSenha() {
 if (fila.length === 0) {
 alert("Não há senhas na fila.");
 return;
 }

 let indice;

 if (!ultimaSenhaFoiSP) {
 indice = fila.findIndex((senha) => senha.startsWith("SP"));

 if (indice === -1) {
 indice = 0;
 }
 } else {
 indice = fila.findIndex((senha) => !senha.startsWith("SP"));

 if (indice === -1) {
 indice = 0;
 }
 }

 const proximaSenha = fila[indice];

 setSenhaChamando(proximaSenha);

 setUltimaSenhaFoiSP(proximaSenha.startsWith("SP"));

 setFila((filaAtual) =>
 filaAtual.filter((_, i) => i !== indice)
 );

  }

  return (
    <div>
      <h1>Emitir senha</h1>

      <label>Escolha o tipo de atendimento:</label>

      <select
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      >
        <option value="">Selecione</option>
        <option value="SP">SP - Senha Prioritária</option>
        <option value="SE">SE - Retirada de Exames</option>
        <option value="SG">SG - Senha Geral</option>
      </select>

      <br />
      <br />

      <button onClick={emitirSenha}>
        Emitir senha
      </button>

      <button onClick={chamarProximaSenha}>
        Chamar próxima senha
      </button>

      {senhaEmitida && (
        <div>
          <h2>Senha emitida!</h2>
          <h1>{senhaEmitida}</h1>

          <p>
            Atendimento:{" "}
            {senha}
          </p>
        </div>
      )}

      {senhaChamando && (
        <div>
          <h2>Senha chamada</h2>
          <h1>{senhaChamando}</h1>
        </div>
      )}

      {fila.length > 0 && (
        <div>
          <h2>Fila de atendimento</h2>

          {fila.map((senhaDaFila, index) => (
            <p key={index}>{senhaDaFila}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Senha;