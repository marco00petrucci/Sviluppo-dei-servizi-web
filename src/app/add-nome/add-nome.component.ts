import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-nome',
  templateUrl: './add-nome.component.html',
  styleUrls: ['./add-nome.component.css']
})

export class add_nome_component {
  @Output() add_nome_event = new EventEmitter<string>();

  constructor() { }

  nuovo_spettacolo(nominativo: string) {
    this.add_nome_event.emit(nominativo);
  }
}