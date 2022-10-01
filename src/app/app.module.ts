import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCardModule} from "@angular/material/card";
import {LayoutModule} from "@angular/cdk/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatGridListModule} from "@angular/material/grid-list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarEventViewComponent } from './components/calendar-event-view/calendar-event-view.component';
import {AppointmentsStore} from "./Store/appointments.store";
import { AddAppointmentModalComponent } from './components/add-appointment-modal/add-appointment-modal.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TransformNumbersToStringPipe } from './pipes/transform-numbers-to-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarEventViewComponent,
    AddAppointmentModalComponent,
    TransformNumbersToStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgbModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
