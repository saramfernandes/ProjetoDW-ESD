export class NoLista<T> {
  valor: T;
  anterior: NoLista<T> | null = null;
  proximo: NoLista<T> | null = null;

  constructor(
    valor: T,
    anterior: NoLista<T> | null = null,
    proximo: NoLista<T> | null = null
  ) {
    this.valor = valor;
    if (anterior) this.anterior = anterior;
    if (proximo) this.proximo = proximo;
  }

  toString(): string {
    return String(this.valor);
  }
}

export class Lista<T> {
  private primeiro: NoLista<T> | null = null;
  private ultimo: NoLista<T> | null = null;
  private tamanho: number = 0;

  estaVazia(): boolean {
    return this.tamanho === 0;
  }

  inserirOrdenado(valor: T): void {
    const novoNo = new NoLista(valor);

    if (this.estaVazia()) {
      this.primeiro = this.ultimo = novoNo;
    } else {
      let atual = this.primeiro;

      while (atual && String(atual.valor).localeCompare(String(valor)) < 0) {
        atual = atual.proximo;
      }

      if (!atual) {
        novoNo.anterior = this.ultimo;
        this.ultimo!.proximo = novoNo;
        this.ultimo = novoNo;
      } else if (!atual.anterior) {
        novoNo.proximo = this.primeiro;
        this.primeiro!.anterior = novoNo;
        this.primeiro = novoNo;
      } else {
        novoNo.anterior = atual.anterior;
        novoNo.proximo = atual;
        atual.anterior!.proximo = novoNo;
        atual.anterior = novoNo;
      }
    }

    this.tamanho++;
  }

  contem(valor: T): boolean {
    let atual = this.primeiro;
    while (atual) {
      if (atual.valor === valor) return true;
      atual = atual.proximo;
    }
    return false;
  }

  verLista(): string {
    let atual = this.primeiro;
    const valores: string[] = [];
    while (atual) {
      valores.push(atual.toString());
      atual = atual.proximo;
    }
    return valores.join(' ');
  }

  obterPrimeiro(): NoLista<T> | null {
    return this.primeiro;
  }

  obterUltimo(): NoLista<T> | null {
    return this.ultimo;
  }

  obterTamanho(): number {
    return this.tamanho;
  }

  paraCada(callback: (valor: T) => void): void {
  let atual = this.primeiro;
  while (atual) {
    callback(atual.valor); // aqui chama a função que você passou, com o valor do nó
    atual = atual.proximo;
  }
}
}
