import { Injectable } from '@angular/core';

// we krijgen gelukkig types van Firebase!
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, Firestore, getFirestore, onSnapshot } from "firebase/firestore";
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  db: Firestore;

  constructor() { 
    //INSTRUCTIES FIREBASE

      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      // Loaded from environment.ts
      // if not working copy environment.example.ts and rename to environment.ts
      const firebaseConfig = environment.firebase;
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      // Initialize Cloud Firestore and get a reference to the service
      this.db = getFirestore(app);

  }

  //based on https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
  collection<T>(path: string) : Observable<T[]>{

    return new Observable((sub: Subscriber<any>) => {
   
        let unsubscribe = onSnapshot(collection(this.db, path), (querySnapshot) => {
          const items: T[] = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data() as T);
          });

          sub.next(items);
        });
    });
  }


  AddDoc(path: string, doc: any) : Promise<any>{
    //based on https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    return addDoc(collection(this.db, path), {...doc});  
  }
}
