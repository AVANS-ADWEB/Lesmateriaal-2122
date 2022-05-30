import { expressionType } from '@angular/compiler/src/output/output_ast';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EventService } from 'src/app/services/event.service';

import { EventComponent } from './event.component';

let eventService = {}; //stubje
let ar = {};

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventComponent ],
      providers: [
        {provide: EventService, useValue: {
          getEvent: () => of({name: 'Test Event'})
        }},
        {provide: ActivatedRoute, useValue: {
          paramMap: of({ get: () => 'test'})
        }}
      ]
    }) 
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    //wacht even tot de titel er staat
    fixture.detectChanges();
    //zoek alle HTML op
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Test Event');
  
  });
});
