import { Injectable } from '@angular/core';

// we krijgen gelukkig types van Firebase!
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, Firestore, getFirestore, onSnapshot } from "firebase/firestore";
import { debounceTime, Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  db: Firestore;
  cache: any;//dict

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

    let cache = this.cache[path];
    if(cache)
      return cache;

    const $collection = new Observable((sub: Subscriber<any>) => {
   
        let unsubscribe = onSnapshot(collection(this.db, path), (querySnapshot) => {
          const items: T[] = [];
          querySnapshot.forEach((doc) => {
            let data : any = doc.data();
            data.id = doc.id;
            items.push(data as T);
          });

          sub.next(items);
        });
    });

    this.cache[path] = $collection;
    return $collection;
  }

  doc<T>(path: string, id: any) : Observable<T>{

    let cache = this.cache[path + id];
    if(cache)
      return cache;
    
    const $doc = new Observable((sub: Subscriber<T>) => {
      const unsub = onSnapshot(doc(this.db, path, id), (doc) => {
        let data : any = doc.data() as any;

        //BUT WHY
        if(data){
          debugger;
          data.id = doc.id;
          sub.next(data);
        }
        else {
          sub.next(undefined);
        }
       
      });
    });

    this.cache[path + id] = $doc;
    return $doc;
  }


  AddDoc(path: string, doc: any) : Promise<any>{
    //based on https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    return addDoc(collection(this.db, path), {...doc});  
  }
}
