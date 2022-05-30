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

  public activities: any[] = [
    { name: 'Blik gooien', min: 2, max: 8, participants: [] },
    { name: 'Pingpong', min: 2, max: 4, participants: []}
  ];

  
  constructor() {
    //mag ik hier wel zijn?
    this.firebase.user
  }


  ngOnInit(): void {
  }

}
