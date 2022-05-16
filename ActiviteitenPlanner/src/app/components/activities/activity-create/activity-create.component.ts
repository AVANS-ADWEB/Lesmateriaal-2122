import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.scss']
})
export class ActivityCreateComponent implements OnInit {

  @Input()
  public eventId: String;

  @Output()
  public onCancel = new EventEmitter();

  @Output()
  public onSubmit = new EventEmitter();

  activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private activityService: ActivityService) { }

  ngOnInit(): void {
    this.activityForm = this.formBuilder.group({
      name: '',
      min: 2,
      max: 5
    }); //empty form

    this.activityForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(f => {
      console.log(f);
    })
  }

  submit(){
    let activity = this.activityForm.value;
    this.activityService.create(this.eventId, activity);
    this.onSubmit.emit(activity);
  }

}
