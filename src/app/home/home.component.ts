import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public salas: String[] = ['Sala 1','Sala 2','Sala 3']

  constructor() { }

  ngOnInit() {
  }

}
