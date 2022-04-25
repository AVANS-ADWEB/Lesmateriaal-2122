import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../models/event';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public $events : Observable<Event[]>;

  constructor(private firebase: FirebaseService) { 

    //DUMMY DATA
    // this._events = [
    //    { name: "Paaspop", date: "11/04/2022" } as unknown as Event,
    //    { name: "Pinkpop", date: "22/07/2022" } as unknown as Event,
    //    { name: "Slowlands", date: "30/04/2022" } as unknown as Event,
    //    { name: "Rock Chergter", date: "30/09/2022" } as unknown as Event
    // ];
    
    //DUMMY
    this.$events = this.firebase.collection<Event>('events');
  }

  
  create(event: any) {
    //dummy solution
    // this._events.push(event);
    // this.$events.next(this._events);

    this.firebase.AddDoc('events', event);
  }
}
