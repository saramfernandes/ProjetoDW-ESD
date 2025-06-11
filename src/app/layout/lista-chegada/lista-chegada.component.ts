import { Component } from '@angular/core';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-lista-chegada',
  imports: [],
  templateUrl: './lista-chegada.component.html',
  styleUrl: './lista-chegada.component.scss'
})
export class ListaChegadaComponent {

   constructor(private serviceEvent: EventoService){ }

  get listaChegada() {
    return this.serviceEvent.getListaChegada();
  }

}
