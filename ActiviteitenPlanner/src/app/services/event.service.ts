import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  create(event: Event) {
    this._events.push(event);
    this.$events.next(this._events);
  }

  private _events: Event[];

  public $events : BehaviorSubject<Event[]>;

  constructor() { 
    this._events = [
       { name: "Paaspop", date: "11/04/2022" } as unknown as Event,
       { name: "Pinkpop", date: "22/07/2022" } as unknown as Event,
       { name: "Slowlands", date: "30/04/2022" } as unknown as Event,
       { name: "Rock Chergter", date: "30/09/2022" } as unknown as Event
    ];

    this.$events = new BehaviorSubject<Event[]>(this._events);
  }



}
