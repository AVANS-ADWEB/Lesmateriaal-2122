import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot } from 'firebase/firestore';
import { BehaviorSubject, combineLatest, map, mergeMap, Observable, of, Subscriber } from 'rxjs';
import { Event } from '../models/event';
import { ActivityService } from './activity.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  //    { name: "Rock Chergter", date: "30/09/2022" } as unknown as Event
  // ];
  //Option 1:
  
  public $events : Observable<Event[]>;

  constructor(
    private firestore: Firestore, //option 1: use Firestore object (see firebaseServiceProviderFactory)
    private firebase: FirebaseService, //option 2: use custom generic FirebaseService,
    private activityService: ActivityService
  ) { 

    //Option 1: Using Firebase SDK directly
    this.$events = new Observable((sub: Subscriber<Event[]>) => {
   
      let unsubscribe = onSnapshot(collection(this.firestore, 'events'), (querySnapshot) => {
        const items: Event[] = [];
        querySnapshot.forEach((doc) => {
          let event = doc.data() as Event;
          event.id = doc.id;
          event.activities = [];//tmpm
          event.participants = [];
          items.push(event);
        });

        sub.next(items);
      });
  });

    //OR
    //Option 2:
    //this.$events = this.firebase.collection<Event>('events');


  }

  create(event: any) {
    
    //Option 1: Using Firebase SDK directly
    //{...event} is a workarround to fix error that addDoc does not allow the class Event
    addDoc(collection(this.firestore, 'events'), {...event});

    //OR
    //Option 2: Generic Service
    //this.firebase.AddDoc('events', event);
  }

  getEvent(id: string): Observable<Event> {

    //Option 1: Using Firebase SDK directly
    const $event = new Observable((sub: Subscriber<any>) => {
      const unsub = onSnapshot(doc(this.firestore, "events", id), (doc) => {
        let event : any = doc.data();
        event.activities = [];
        event.participants = [];
        sub.next(event);
      });
    });

    const $activities = this.activityService.getActivities(id);

    return combineLatest([$event, $activities]).pipe(
      map(results => {
        const event = results[0];
        event.activities = results[1];
        return event;
      })
    );
  }
}
