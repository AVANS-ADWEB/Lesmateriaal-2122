import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from 'firebase/firestore';
import { Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  selectedId: string;

  $event : Observable<Event>;

  //ophalen uit firebase
  constructor(public eventService: EventService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    //get active event
    this.$event = this.route.paramMap.pipe(switchMap(params => {
        
        this.selectedId = String(params.get('id'));
        return this.eventService.getEvent(this.selectedId);

    }));
  }

}
