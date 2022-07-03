import { Component, Output, EventEmitter } from '@angular/core';
import { teatro_service } from '../teatro.service';

@Component({
  selector: 'app-newteatro',
  templateUrl: './new-teatro.component.html',
  styleUrls: ['./new-teatro.component.css']
})

export class new_teatro_component {
  @Output() new_teatro_event = new EventEmitter<string>();

  constructor(private service: teatro_service) { }

  crea_spettacolo() {
    this.service.nuovo_spettacolo().subscribe({
      next: (key: any) => {
        const platea = new Array(7).fill('').map(() => new Array(10).fill(''));
        const palchetto = new Array(4).fill('').map(() => new Array(6).fill(''));
        const prenotazione = platea.concat(palchetto);
        this.service.set_spettacolo(key, prenotazione).subscribe({
          next: () => this.new_teatro_event.emit(key),
          error: err => console.error(`Errore nell'observer: ${JSON.stringify(err)}`)
        })
      },
      error: err => console.error(`Errore nell'observer: ${JSON.stringify(err)}`)
    })
  }
}
