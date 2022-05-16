import { Injectable } from '@angular/core';
import { Firestore, addDoc, doc, collection, onSnapshot } from 'firebase/firestore';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

    
  constructor(private firestore: Firestore) {

  }

  create(eventId: any, activity: any) {
    
    //Option 1: Using Firebase SDK directly
    //{...event} is a workarround to fix error that addDoc does not allow the class Event
    const activitiesRef = collection(this.firestore, `events/${eventId}/activities`);
    addDoc(activitiesRef, {...activity});

    //OR
    //Option 2: Generic Service
    //this.firebase.AddDoc('events', event);
  }

  getActivities(eventId: any)
  {
    const activitiesRef = collection(this.firestore, `events/${eventId}/activities`);
    return new Observable((sub: Subscriber<any[]>) => {
   
      let unsubscribe = onSnapshot(activitiesRef, (querySnapshot) => {
        const items: any[] = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data() as any);
        });

        sub.next(items);
      });
    });
  }
}
