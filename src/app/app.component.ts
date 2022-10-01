import {Component, OnInit} from '@angular/core';
import {AppointmentsStore} from "./Store/appointments.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedDate: any;
  title = 'something';

  constructor(private appointmentsStore: AppointmentsStore) {
  }

  ngOnInit() {
    this.appointmentsStore.addAppointment({title: 'test', startDate: new Date(), endDate: new Date()});
    this.appointmentsStore.addAppointment({title: 'default title', startDate: new Date(), endDate: new Date()});
    this.appointmentsStore.addAppointment({title: 'test 2', startDate: new Date(2022, 8, 25), endDate: new Date()});
  }
}
