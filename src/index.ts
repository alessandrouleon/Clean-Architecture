import Conta from "./conta";
import ContaCorrente from "./conta-corrente";
import ContaPoupanca from "./conta-poupanca";

function processarSaque(conta: Conta) {
  conta.sacar(160);
  console.log("Saldo:", conta.getSaldo());
}

const poupanca = new ContaPoupanca(200);
processarSaque(poupanca); // OK

const corrente = new ContaCorrente(1250, true);
processarSaque(corrente); // OK (saldo = -50)


