import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {

  public event: Event = new Event();

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
  }

  createEvent(){
    this.eventService.create(this.event);
    this.event = new Event();
  }

}
