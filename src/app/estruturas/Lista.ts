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

export class List<T> {
  private first: NoLista<T> | null = null;
  private last: NoLista<T> | null = null;
  private length: number = 0;

  isEmpty(): boolean {
    return this.length === 0;
  }

  pushFirst(e: T): void {
    const newE = new NoLista(e, null, this.first);
    if (this.isEmpty()) {
      this.last = newE;
    } else {
      this.first!.anterior = newE;
    }
    this.first = newE;
    this.length++;
  }

  pushLast(e: T): void {
    const newE = new NoLista(e, this.last, null);
    if (this.isEmpty()) {
      this.first = newE;
    } else {
      this.last!.proximo = newE;
    }
    this.last = newE;
    this.length++;
  }

  push(e: T): void {
    this.pushLast(e);
  }

  pushOrdered(e: T): void {
    const newE = new NoLista(e);

    if (this.isEmpty()) {
      this.first = this.last = newE;
    } else {
      let current = this.first;

      while (current && String(current.valor).localeCompare(String(e)) < 0) {
        current = current.proximo;
      }

      if (!current) {
        newE.anterior = this.last;
        this.last!.proximo = newE;
        this.last = newE;
      } else if (!current.anterior) {
        newE.proximo = this.first;
        this.first!.anterior = newE;
        this.first = newE;
      } else {
        newE.anterior = current.anterior;
        newE.proximo = current;
        current.anterior!.proximo = newE;
        current.anterior = newE;
      }
    }

    this.length++;
  }

  pushAt(index: number, e: T): void {
    if (index > this.length || index < 0) throw new Error('Illegal Index');
    if (index === 0) {
      this.pushFirst(e);
    } else if (index === this.length) {
      this.pushLast(e);
    } else {
      let current = this.first!;
      for (let i = 0; i < index; i++) {
        current = current.proximo!;
      }
      const newE = new NoLista(e, current.anterior, current);
      current.anterior!.proximo = newE;
      current.anterior = newE;
      this.length++;
    }
  }

  popFirst(): T | null {
    if (this.isEmpty()) return null;
    const popped = this.first!;
    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.first = popped.proximo;
      this.first!.anterior = null;
    }
    this.length--;
    return popped.valor;
  }

  popLast(): T | null {
    if (this.isEmpty()) return null;
    const popped = this.last!;
    if (this.length === 1) {
      this.first = null;
      this.last = null;
    } else {
      this.last = popped.anterior;
      this.last!.proximo = null;
    }
    this.length--;
    return popped.valor;
  }

  popAt(index: number): T | null {
    if (index >= this.length || index < 0) throw new Error('Illegal Index');
    if (index === 0) return this.popFirst();
    if (index === this.length - 1) return this.popLast();

    let current = this.first!;
    for (let i = 0; i < index; i++) {
      current = current.proximo!;
    }

    current.anterior!.proximo = current.proximo;
    current.proximo!.anterior = current.anterior;
    this.length--;
    return current.valor;
  }

  isPresent(e: T): boolean {
    let current = this.first;
    while (current) {
      if (current.valor === e) return true;
      current = current.proximo;
    }
    return false;
  }

  view(): string {
    let current = this.first;
    const values: string[] = [];
    while (current) {
      values.push(current.toString());
      current = current.proximo;
    }
    return values.join(' ');
  }

  getFirst(): NoLista<T> | null {
    return this.first;
  }

  getLast(): NoLista<T> | null {
    return this.last;
  }

  getLength(): number {
    return this.length;
  }
}
