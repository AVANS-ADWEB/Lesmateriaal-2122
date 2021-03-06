import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummyEventComponent } from './pages/dummy-event/dummy-event.component';
import { EventComponent } from './pages/event/event.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AveragePipePipe } from './helpers/average-pipe.pipe';
import { ActivityListComponent } from './components/activities/activity-list/activity-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventCreateComponent } from './components/events/event-create/event-create.component';
import { EventListComponent } from './components/events/event-list/event-list.component';
import { EventsComponent } from './pages/events/events.component';
import { Firestore } from 'firebase/firestore';
import { firebaseServiceProviderFactory } from './helpers/firebaseServiceProviderFactory';
import { ActivityCreateComponent } from './components/activities/activity-create/activity-create.component';
import { ParticipantListComponent } from './components/participants/participant-list/participant-list.component';
import { BarsComponent } from './helpers/bars/bars.component';
import { BarsPipe } from './helpers/bars/bars.pipe';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { AuthComponent } from './components/auth/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    DummyEventComponent,
    EventComponent,
    ParticipantsComponent,
    AveragePipePipe,
    BarsPipe,
    ActivityListComponent,
    EventCreateComponent,
    EventListComponent,
    EventsComponent,
    ActivityCreateComponent,
    ParticipantListComponent,
    BarsComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule, //zie activity-create,
    DragAndDropModule
  ],
  providers: [{
    provide: Firestore,
    useFactory: firebaseServiceProviderFactory,
    deps: []
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
