import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment';

export function firebaseServiceProviderFactory(): Firestore {

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
    const db : Firestore = getFirestore(app);
    
    return db;
}
