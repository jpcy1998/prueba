import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import * as io from 'socket.io-client'
declare var $: any

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private socket
  public mensajes: String[] = ['Admin: Hola 😂']
  public escr = ''
  private timer
  // public cont: number = 0

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.socket = io()
  }


  ngOnInit(): void {
    this.socket.on('connect',() => {
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          // Connected, let's sign-up for to receive messages for this room
          console.log(id)
          this.socket.emit('room', id);
        }
      })
   })

    this.socket.on('mensaje:server', (data) => {
      this.mensajes.push(data.usuario + ': ' + data.mensaje)
    })

    // this.socket.on('contadorUsuarios', (cont) => {
    //   this.cont = cont
    // })

    this.socket.on('mensaje:serverEscr', (data) => {
      clearTimeout(this.timer)
      this.escr = data.usuario + ' esta escribiendo . . .'
      this.timer = setTimeout(() => this.escr = '', 1000);
    })
  }

  public enviarMensaje() {
    //console.log(usuario ,mensaje)
    this.socket.emit('mensaje:usuario', {
      usuario: $('#usuario2').val(),
      mensaje: $('#mensaje2').val()
    })
    $('#mensaje2').val('')
  }

  public notificarEscr() {
    this.socket.emit('mensaje:usuarioEscr', {
      usuario: $('#usuario2').val()
    })
  }


}
