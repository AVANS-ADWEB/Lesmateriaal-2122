import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, mergeMap, Observable, switchMap } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  
  $particpants: Observable<any[]>;

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  //TypeError: Cannot read properties of undefined (reading 'pipe')
  ngOnInit(): void {

    //get active event 
    this.$particpants = this.route.paramMap.pipe(switchMap(params => {
        
        let eventId = String(params.get('id'));

        //events/{eventId}/participants

        return this.eventService.getParticipants(eventId)
       
    }));
  }

}
