export class Pilha {
  private topo: No | null = null;

  estaVazia(): boolean {
    return this.topo === null;
  }

  insere(nome: string): void {
    const novoNo = new No(nome, this.topo);
    this.topo = novoNo;
  }

  // espiaTopo(): string | null {
  //   return this.topo ? this.topo.nome : null;
  // }

  getTopo(): No | null {
  return this.topo;
}

  ver(): string[] {
    const nomes: string[] = [];
    let aux = this.topo;
    while (aux) {
      nomes.push(aux.nome);
      aux = aux.anterior;
    }
    return nomes;
  }
}

export class No {
  constructor(
    public nome: string,
    public anterior: No | null = null
  ) {}
}
