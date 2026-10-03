import { useState } from "react";

function Senha() {
  const [senha, setSenha] = useState("");
  const [senhaEmitida, setSenhaEmitida] = useState("");
  const [fila, setFila] = useState([]);
  const [numeroLaboratorio, setNumeroLaboratorio] = useState(0);
  const [numeroClinica, setNumeroClinica] = useState(0);
  const [senhaChamando, setSenhaChamando] = useState("");

  function emitirSenha() {
    if (senha === "") {
      alert("Escolha o tipo de atendimento.");
      return;
    }

    let numero;
    let prefixo;

    if (senha === "laboratorio") {
      numero = numeroLaboratorio + 1;
      prefixo = "L";
      setNumeroLaboratorio(numero);
    } else {
      numero = numeroClinica + 1;
      prefixo = "C";
      setNumeroClinica(numero);
    }

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

    const proximaSenha = fila[0];

    setSenhaChamando(proximaSenha);

    setFila((filaAtual) => filaAtual.slice(1));
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
        <option value="laboratorio">Laboratório</option>
        <option value="clinica">Clínica</option>
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
            {senha === "laboratorio"
              ? "Laboratório"
              : "Clínica"}
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
            <p key={index}>{senhaDaFila} -{" "}
            {senhaDaFila.startsWith("L") ? "Laboratório" : "Clínica"}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Senha;