import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  nome: string = '';

  constructor(private serviceEvent: EventoService){ }

  cadastrar() {
    if (this.nome.trim()) {
      this.serviceEvent.adicionarParticipante(this.nome.trim());
      this.nome = '';
    }
  }

  desfazerUltimaChegada() {
    this.serviceEvent.desfazerUltimaChegada();
  }
}
