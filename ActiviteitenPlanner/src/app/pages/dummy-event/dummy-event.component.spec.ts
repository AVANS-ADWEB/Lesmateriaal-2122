import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyEventComponent } from './dummy-event.component';

xdescribe('DummyEventComponent', () => {
  let component: DummyEventComponent;
  let fixture: ComponentFixture<DummyEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
