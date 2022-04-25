import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  
  modal: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showModal(){
    this.modal = true;
  }

  hideModal(){
    this.modal = false;
  }



}
