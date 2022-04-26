import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, onSnapshot } from 'firebase/firestore';
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs';
import { Event } from '../models/event';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public $events : Observable<Event[]>;

  constructor(
    private firestore: Firestore, //option 1: use Firestore object (see firebaseServiceProviderFactory)
    private firebase: FirebaseService, //option 2: use custom generic FirebaseService 
  ) { 

    //DUMMY DATA
    // this._events = [
    //    { name: "Paaspop", date: "11/04/2022" } as unknown as Event,
    //    { name: "Pinkpop", date: "22/07/2022" } as unknown as Event,
    //    { name: "Slowlands", date: "30/04/2022" } as unknown as Event,
    //    { name: "Rock Chergter", date: "30/09/2022" } as unknown as Event
    // ];
    

    //Option 1:
    this.$events = new Observable((sub: Subscriber<any>) => {
   
      let unsubscribe = onSnapshot(collection(this.firestore, 'events'), (querySnapshot) => {
        const items: Event[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data() as Event);
        });

        sub.next(items);
      });
  });

    //OR
    //Option 2:
    //this.$events = this.firebase.collection<Event>('events');


  }

  
  create(event: any) {
    
    //Option 1: Using Firebase directly
    //{...event} is a workarround to fix error that addDoc does not allow the class Event
    addDoc(collection(this.firestore, 'events'), {...event});

    //OR
    //Option 2: Generic Service
    //this.firebase.AddDoc('events', event);
  }
}
