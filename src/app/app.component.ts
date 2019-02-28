import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client'
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private socket
  public mensajes: String[] = ['Admin: 😁']
  public escr = ''
  private timer
  public cont: number = 0

  constructor() {
    this.socket = io()
  }

  ngOnInit(): void {
    this.socket.on('mensaje:server', (data) => {
      this.mensajes.push(data.usuario + ': ' + data.mensaje)
    })

    this.socket.on('contadorUsuarios', (cont) => {
      this.cont = cont
    })

    this.socket.on('mensaje:serverEscr', (data) => {
      clearTimeout(this.timer)
      this.escr = data.usuario + ' esta escribiendo . . .'
      this.timer = setTimeout(() => this.escr = '', 1000);
    })
  }

  public enviarMensaje() {
    //console.log(usuario ,mensaje)
    this.socket.emit('mensaje:usuario', {
      usuario: $('#usuario').val(),
      mensaje: $('#mensaje').val()
    })
    $('#mensaje').val('')
  }

  public notificarEscr() {
    this.socket.emit('mensaje:usuarioEscr', {
      usuario: $('#usuario').val()
    })
  }

}
