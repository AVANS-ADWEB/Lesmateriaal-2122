import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyEventComponent } from './pages/dummy-event/dummy-event.component';
import { EventComponent } from './pages/event/event.component';

const routes: Routes = [
  { path: 'events/dummy-event', component: DummyEventComponent},
  { path: 'events/{id}', component: EventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
