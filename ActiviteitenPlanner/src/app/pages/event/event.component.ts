import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  @ViewChild('modalContent') 
  modalContent: ElementRef | undefined;

  //ophalen uit firebase
  constructor(public eventService: EventService, public route: ActivatedRoute, private modalService: NgbModal) { }


  //TypeError: Cannot read properties of undefined (reading 'pipe')
  ngOnInit(): void {

    //get active event 
    this.$event = this.route.paramMap.pipe(switchMap(params => {
        
        this.selectedId = String(params.get('id'));
        console.log(this.selectedId);

        return this.eventService.getEvent(this.selectedId);

    }));
  }

  createActivity(){
    this.modalService.open(this.modalContent, {ariaLabelledBy: 'Create ACtivity'}).result.then((result: any) => {
        console.log(result);
    });
  }

}
