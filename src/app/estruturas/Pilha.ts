export class Pilha<T> {
  private topo: No<T> | null = null;

  estaVazia(): boolean {
    return this.topo === null;
  }

  insere(valor: T): void {
    const novoNo = new No(valor, this.topo);
    this.topo = novoNo;
  }

  pop(): T | null {
    if (this.topo === null) return null;
    const valor = this.topo.valor;
    this.topo = this.topo.anterior;
    return valor;
  }

  // espiaTopo(): string | null {
  //   return this.topo ? this.topo.nome : null;
  // }

  getTopo(): No<T> | null {
    return this.topo;
  }

  ver(): T[] {
    const valores: T[] = [];
    let aux = this.topo;
    while (aux) {
      valores.push(aux.valor);
      aux = aux.anterior;
    }
    return valores;
  }
}

export class No<T> {
  constructor(
    public valor: T,
    public anterior: No<T> | null = null
  ) {}
}
