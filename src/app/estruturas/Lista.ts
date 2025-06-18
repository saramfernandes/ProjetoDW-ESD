export class NoLista<T> {
  valor: T;
  anterior: NoLista<T> | null = null;
  proximo: NoLista<T> | null = null;
  indice: number = 0;

  constructor(
    valor: T,
    anterior: NoLista<T> | null = null,
    proximo: NoLista<T> | null = null,
    indice: number = 0
  ) {
    this.valor = valor;
    if (anterior) this.anterior = anterior;
    if (proximo) this.proximo = proximo;
    this.indice = indice;
  }

  toString(): string {
    return String(this.valor);
  }
}

export class Lista<T> {
  public primeiro: NoLista<T> | null = null;
  public ultimo: NoLista<T> | null = null;
  public tamanho: number = 0;

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
    this.atualizarIndices();
  }

  atualizarIndices(): void {
    let atual = this.primeiro;
    let idx = 0;
    while (atual) {
      atual.indice = idx;
      idx++;
      atual = atual.proximo;
    }
  }

  // Busca um nó da lista baseado no índice passado.
  // Para ser um pouco mais performático, inicia a
  // busca a partir inicio OU fim, dependendo de
  // qual é mais perto do índice.
  obterNoPorIndice(indice: number): NoLista<T> | null {
    if (indice < 0 || indice >= this.tamanho) return null;

    if (indice < this.tamanho / 2) {
      // Percorre do início
      let atual = this.primeiro;
      let idx = 0;
      while (atual && idx < indice) {
        atual = atual.proximo;
        idx++;
      }
      return atual;
    } else {
      // Percorre do final
      let atual = this.ultimo;
      let idx = this.tamanho - 1;
      while (atual && idx > indice) {
        atual = atual.anterior;
        idx--;
      }
      return atual;
    }
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
      callback(atual.valor);
      atual = atual.proximo;
    }
  }
}
