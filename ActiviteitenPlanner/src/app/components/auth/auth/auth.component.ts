import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public form: any = {};

  constructor(public firebase: FirebaseService) { }

  ngOnInit(): void {

  }

  login(){
    this.firebase.login(this.form.email, this.form.password);
  }

  logout(){
    this.firebase.logout();
  }

}
