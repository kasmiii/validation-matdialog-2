import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { DialogOverviewExample } from './dialog-overview-example';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewExampleDialog } from './dialog-overview-dialog';

@NgModule({
  declarations: [DialogOverviewExample, DialogOverviewExampleDialog],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [DialogOverviewExample],
})
export class AppModule {}
