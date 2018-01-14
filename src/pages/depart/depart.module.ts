import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepartPage } from './depart';

@NgModule({
  declarations: [
    DepartPage,
  ],
  imports: [
    IonicPageModule.forChild(DepartPage),
  ],
})
export class DepartPageModule {}
