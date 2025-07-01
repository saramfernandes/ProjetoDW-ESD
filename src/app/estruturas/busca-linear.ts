import { Lista, Pessoa } from './Lista';

export class BuscaLinear {
  static buscarPorNome(query: string, lista: Lista<Pessoa>): Lista<Pessoa> {
    const resultados = new Lista<Pessoa>();
    let atual = lista.primeiro;
    const termo = query.toLowerCase();

    while (atual) {
      if (atual.valor.nome.toLowerCase().includes(termo)) {
        resultados.inserirOrdenado(atual.valor);
      }
      atual = atual.proximo;
    }

    return resultados;
  }
}
