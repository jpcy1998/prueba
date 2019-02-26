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
private mensajes:String[]=['Admin: Bienvenidos al chat 😁']

  constructor() {
    this.socket = io()
  }

  ngOnInit(): void {
    this.socket.on('mensaje:server',(data) =>{
      this.mensajes.push(data.usuario+': '+data.mensaje)
    })
  }

  public makako() {
    //console.log(usuario ,mensaje)
    this.socket.emit('mensaje:usuario',{
      usuario: $('#usuario').val(),
      mensaje: $('#mensaje').val()
    })
    $('#mensaje').val('')
  }

}
