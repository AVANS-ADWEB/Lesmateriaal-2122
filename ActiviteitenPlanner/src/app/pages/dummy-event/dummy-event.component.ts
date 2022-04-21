import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-event',
  templateUrl: './dummy-event.component.html',
  styleUrls: ['./dummy-event.component.scss']
})
export class DummyEventComponent implements OnInit {

  public participants: any[] = [
    { name: "Stijn", age: 32, email: "stijn@event.nl"},
    { name: "Robin", age: 28, email: "robin@event.nl"},
    { name: "Ger", age: 42, email: "ger@event.nl"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
