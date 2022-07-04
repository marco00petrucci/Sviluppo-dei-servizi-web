import { Component, Input } from '@angular/core';
import { teatro_service } from './teatro.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class app_component {
  title: string = "Sviluppo-dei-servizi-web";
  lista_teatri: string[] = [];
  platea: any[] = []; palchetto: any[] = [];
  chiave_teatro: string = '';
  @Input() info_prenotazione: string | undefined;
  utente: string = '';
  show_el = {
    search_add_spettacolo: true,
    lista_spettacoli: false,
    add_nome: false,
    teatro: true,
  }

  constructor(private service: teatro_service) { }

  // se si sceglie di cercare uno spettacolo
  cerca_spettacolo(chiave: string) {
    if (chiave !== '') {
      this.service.get_spettacolo(chiave).subscribe({
        next: (x: any) => {
          const prenotazione = JSON.parse(x);
          this.platea = prenotazione.slice(0, 7);
          this.palchetto = prenotazione.slice(7);
          this.chiave_teatro = chiave;
          this.show_el.add_nome = true;
        },
        error: (err: any) => console.error(`Errore nell'observer: ${JSON.stringify(err)}`)
      });
    }
    else alert("Inserisci una chiave valida.") // se non viene inserito niente nel campo input
  }

  // se si cerca di creare uno spettacolo, lo inserisce nella lista degli spettacoli
  push_spettacolo(new_teatro: string) {
    this.lista_teatri.push(new_teatro);
  }

  // mostra se il posto è libero o occupato
  mostra_prenotazione(prenotato_da: string, riga: number, colonna: number, teatro: any[]): void {
    let dove: string;
    if (teatro.length === 7) dove = 'della platea';
    else dove = 'del palchetto';

    // se si cerca di prenotare un posto libero
    if (this.utente && prenotato_da === '') {
      teatro[riga][colonna] = this.utente;
      const prenotazione = this.platea.concat(this.palchetto);
      this.service.set_spettacolo(this.chiave_teatro, prenotazione).subscribe({
        next: () => {
          this.info_prenotazione = `Il posto P${riga + 1}-${colonna + 1} ${dove} è stato prenotato da ${this.utente} con successo! 🎥`;
          this.utente = '';
        },
        error: (err) => console.error(`Errore nell'observer: ${JSON.stringify(err)}`),
      });
    }

    // se il posto è gia prenotato ma non si effettua una prenotazione
    else if (this.utente == '' && prenotato_da) this.info_prenotazione = `Il posto P${riga + 1}-${colonna + 1} ${dove} è già occupato da ${prenotato_da}.`;

    // se si cerca di prenotare un posto già prenotato
    else if (prenotato_da) this.info_prenotazione = `Impossibile prenotare il posto P${riga + 1}-${colonna + 1} ${dove} perché è già occupato da ${prenotato_da}.`;

    // se non viene effettuata nessuna prenotazione
    else this.info_prenotazione = `Il posto P${riga + 1}-${colonna + 1} ${dove} è libero 🎬`;
  }

  // cambia colore del posto in base alla presenza di prenotazioni
  cambia_colore(prenotato_da: string): string {
    return prenotato_da !== '' ? "rgb(213, 30, 30)" : "rgb(62, 174, 62)";
  }
}