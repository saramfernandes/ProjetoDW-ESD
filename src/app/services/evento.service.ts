import { EventEmitter, Injectable } from '@angular/core';
import { Lista, Pessoa } from '../estruturas/Lista';
import { Pilha } from '../estruturas/Pilha';
import { BuscaLinear } from '../estruturas/busca-linear';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  listaAlfabetica: Lista<Pessoa> = new Lista<Pessoa>();
  listaAlfabeticaOriginal: Lista<Pessoa> = new Lista<Pessoa>();
  listaChegada: Pilha<Pessoa> = new Pilha<Pessoa>();

  listaAlfabeticaChanged = new EventEmitter<Lista<Pessoa>>();
  listaAlfabeticaOriginalChanged = new EventEmitter<Lista<Pessoa>>();
  listaChegadaChanged = new EventEmitter<Pilha<Pessoa>>();

  constructor() { }

  adicionarParticipante(nome: string): void {
    const pessoa: Pessoa = {
      id: this.gerarId(),
      nome: nome,
      horario: new Date()
    };
    this.listaAlfabeticaOriginal.inserirOrdenado(pessoa);
    this.listaChegada.insere(pessoa);

    this.listaAlfabeticaOriginalChanged.emit(this.listaAlfabeticaOriginal);
    this.listaChegadaChanged.emit(this.listaChegada);

    this.listaAlfabetica = this.listaAlfabeticaOriginal;
    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
  }

  desfazerUltimaChegada(): void {
    const pessoaRemovida = this.listaChegada.pop();
    if (pessoaRemovida) {
      this.listaAlfabeticaOriginal.removerPorId(pessoaRemovida.id);
      this.listaAlfabeticaOriginalChanged.emit(this.listaAlfabeticaOriginal);
      this.listaChegadaChanged.emit(this.listaChegada);
      this.listaAlfabetica = this.listaAlfabeticaOriginal;
      this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
    }
  }

  private gerarId(): string {
    // Gera um id único simples (pode ser melhorado para UUID)
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  getListaAlfabetica(): Lista<Pessoa> {
    return this.listaAlfabeticaOriginal;
  }

  getListaChegada(): Pilha<Pessoa> {
    return this.listaChegada;
  }

  buscarPorQuery(query: string): void {
    this.listaAlfabetica = BuscaLinear.buscarPorNome(query, this.listaAlfabeticaOriginal);
    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
  }

  limparBusca(): void {
    this.listaAlfabetica = this.listaAlfabeticaOriginal;
    this.listaAlfabeticaChanged.emit(this.listaAlfabetica);
  }
}
