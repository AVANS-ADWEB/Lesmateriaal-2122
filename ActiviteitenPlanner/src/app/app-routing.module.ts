import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyEventComponent } from './pages/dummy-event/dummy-event.component';
import { EventComponent } from './pages/event/event.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  { path: 'events/:id', component: EventComponent},
  { path: 'events/dummy-event', component: DummyEventComponent},
  { path: '', component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
