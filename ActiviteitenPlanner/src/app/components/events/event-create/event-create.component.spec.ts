import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

import { EventCreateComponent } from './event-create.component';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
  let debugElement: DebugElement;
  let mockEventServiceObject: EventService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCreateComponent ],
      providers: [
        {provide: EventService, useValue: { create: () => {}  }} //hier kan hij leeg zijn
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //Nodig voor SPY
    debugElement = fixture.debugElement;
    mockEventServiceObject = debugElement.injector.get(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to add Event', () => {

    //arrange
    let createSpy = spyOn<EventService, any>(mockEventServiceObject, 'create');

    component.event = new Event()
    {
        name: 'Test Event'
    };

    //act
    component.createEvent();

    //assert
    expect(createSpy).toHaveBeenCalled();

  })
});
