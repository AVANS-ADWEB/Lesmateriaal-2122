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
    { name: 'Blik gooien', min: 2, max: 8 },
    { name: 'Pingpong', min: 2, max: 4}
  ];

  
  public poules: any[] = [];

  constructor() {

    //add 3 pules
    for(var i = 0; i < 3; i++)
    {
      this.addPoule("Poule " + (i + 1));
    }
  }

  public addPoule(name: string){

    this.poules.push({
      name: name,
      players: this.participants
    });
  }


  ngOnInit(): void {
  }

}
