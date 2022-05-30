import { Injectable } from '@angular/core';

// we krijgen gelukkig types van Firebase!
// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, Firestore, getFirestore, onSnapshot } from "firebase/firestore";
import { debounceTime, Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  logout() {
    signOut(this.auth);
  }

  db: Firestore;
  cache: any;//dict
  auth: any;
  user$: Observable<any>;

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

      this.auth = getAuth(app);

      this.user$ = new Observable((subscribers: any) => {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            subscribers.next(user);
          } else {
            subscribers.next(null);
          }
        });
        
      })


  }

  login(email:string, password:string){
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }

  loginGoogle(){
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential : any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

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
