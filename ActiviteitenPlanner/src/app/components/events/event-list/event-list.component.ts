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


  constructor(public eventService: EventService) {  }

  /**
   * we kunnen rechtstreeks van uit de template naar de eventservice.$events gaan
   * en dan via de ASYNC pipe de inhoud bekijken
   * OF
   * we schrijven zelf de code om te subscriben en slaan de events op in de component. 
   * Let op! Bij deze oplossing moet je zelf ook de subscription bijhouden
   * en verwijderen bij de ngOnDestroy;
   */
  ngOnInit(): void {
    this.subscription = this.eventService.$events.subscribe(events => {
      this.events = events;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
