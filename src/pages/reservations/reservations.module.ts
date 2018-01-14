import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationsPage } from './reservations';

@NgModule({
  declarations: [
    ReservationsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationsPage),
  ],
})
export class ReservationPageModule {}
