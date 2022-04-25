import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {

  public events: Event[];
  subscription: Subscription;


  constructor(public eventService: EventService) {
   }

  ngOnInit(): void {
    console.log('tik tok');
    this.subscription = this.eventService.$events.subscribe(events => {
      this.events = events;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
