import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { app_component } from './app.component';
import { new_teatro_component } from './new-teatro/new-teatro.component';
import { add_nome_component } from './add-nome/add-nome.component';

@NgModule({
  declarations: [
    app_component,
    new_teatro_component,
    add_nome_component
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [app_component]
})

export class AppModule { }
