import { Component } from '@angular/core';
import * as io from 'socket.io-client'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;

  usuario: string = 'makako'
  constructor() {
    this.socket = io()
  }

  public makako() {
    var mensaje = (<HTMLInputElement>document.getElementById('mensaje')).value;
    console.log(mensaje)
  }

}
