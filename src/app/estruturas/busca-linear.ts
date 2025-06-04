import { Lista } from './Lista';

export class BuscaLinear {
  buscarPorNome(query: string, lista: Lista<string>): Lista<string> {
    const resultados = new Lista<string>();
    let atual = lista.primeiro;
    const termo = query.toLowerCase();

    while (atual) {
      if (String(atual.valor).toLowerCase().includes(termo)) {
        resultados.inserirOrdenado(atual.valor);
      }
      atual = atual.proximo;
    }

    return resultados;
  }
}
