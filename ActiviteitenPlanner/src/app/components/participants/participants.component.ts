import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  closeResult = '';

  @ViewChild('modalContent') 
  modalContent: ElementRef | undefined;
  
  selectedParticipant: any;

  @Input()
  public showEmailPopup: boolean = true;


  @Input()
  public participants: any[] = [];

  @Input()
  public activities: any[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    
  }

  dragEnd(event: any){
    console.log(event);
  }


  open(participant: any) {
    this.selectedParticipant = participant;
    this.modalService.open(this.modalContent, {ariaLabelledBy: 'Assign participant'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
     

    });
  }


}
