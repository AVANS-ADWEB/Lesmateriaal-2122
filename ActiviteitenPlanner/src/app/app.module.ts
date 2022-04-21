import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DummyEventComponent } from './pages/dummy-event/dummy-event.component';
import { EventComponent } from './pages/event/event.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AveragePipePipe } from './helpers/average-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DummyEventComponent,
    EventComponent,
    ParticipantsComponent,
    AveragePipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
