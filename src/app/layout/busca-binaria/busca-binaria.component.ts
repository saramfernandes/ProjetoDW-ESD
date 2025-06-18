import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { BuscaBinaria } from '../../estruturas/busca-binaria';

@Component({
  selector: 'app-busca-binaria',
  imports: [CommonModule, FormsModule],
  templateUrl: './busca-binaria.component.html',
  styles: ''
})
export class BuscaBinariaComponent {
  nome: string = '';
  resultado: boolean | null = null;

  constructor(private eventoService: EventoService) {}

  buscar() {
    const lista = this.eventoService.getListaAlfabetica();
    this.resultado = BuscaBinaria.buscarPorNome(this.nome, lista);
  }
}
