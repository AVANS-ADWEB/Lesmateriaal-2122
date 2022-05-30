import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  @Input()
  public activities: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addParticipant(activity: any, event: any){
    event.dropData.activity = activity;
    activity.participants.push(event.dropData);
  }
}
