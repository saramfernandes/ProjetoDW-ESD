import { Lista, Pessoa } from './Lista';

export class BuscaBinaria {
  static buscarPorNome(nome: string, lista: Lista<Pessoa>): boolean {
    let inicio = 0;
    let fim = lista.obterTamanho() - 1;
    const termo = nome.toLowerCase();

    while (inicio <= fim) {
      const meio = Math.floor((inicio + fim) / 2);
      const noMeio = lista.obterNoPorIndice(meio);
      if (!noMeio) return false;
      const valorMeio = noMeio.valor.nome.toLowerCase();

      if (valorMeio === termo) {
        return true;
      } else if (valorMeio < termo) {
        inicio = meio + 1;
      } else {
        fim = meio - 1;
      }
    }
    return false;
  }
}
