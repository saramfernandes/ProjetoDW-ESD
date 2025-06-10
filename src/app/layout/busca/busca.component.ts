import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-busca',
  imports: [CommonModule, FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  query: string = '';

  constructor(private eventoService: EventoService) { }

  buscar() {
    this.eventoService.buscarPorQuery(this.query);
  }

  limpar() {
    this.query = '';
    this.eventoService.buscarPorQuery(this.query);
  }
}
