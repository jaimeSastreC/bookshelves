import { Component } from '@angular/core';
import * as firebase from 'firebase';
import {config} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookshelves';

  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDd2PFwXDt4y8vyic9bbJkEr6EC6iEIRG0",
      authDomain: "sastre-backend.firebaseapp.com",
      databaseURL: "https://sastre-backend.firebaseio.com",
      projectId: "sastre-backend",
      storageBucket: "sastre-backend.appspot.com",
      messagingSenderId: "927846473410",
      appId: "1:927846473410:web:8b701b90244026b753a55b",
      measurementId: "G-GZD9S39EXJ"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  // penser à ajouter > firebase.initializeApp(config);
}
