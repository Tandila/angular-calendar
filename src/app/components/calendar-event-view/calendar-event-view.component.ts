import {Component, OnInit, ViewChild} from '@angular/core';
import {AppointmentsStore} from "../../Store/appointments.store";
import {Observable} from "rxjs";
import {Appointment} from "../../interfaces/appointment.interface";
import {AddAppointmentModalComponent} from "../add-appointment-modal/add-appointment-modal.component";

export interface Calendar {
  date: Date,
  isPartOfCurrentMonth: boolean,
}

@Component({
  selector: 'app-calendar-event-view',
  templateUrl: './calendar-event-view.component.html',
  styleUrls: ['./calendar-event-view.component.scss']
})
export class CalendarEventViewComponent implements OnInit {
  @ViewChild('addAppointmentModalComponent')
  addAppointmentModalComponent: AddAppointmentModalComponent | undefined;

  public appointments$: Observable<Array<Appointment>> = this.appointmentStore.getAppointmentsObservable();

  public readonly weeks = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun'
  ];

  public currentMonth: number = 8;
  public currentYear: number = 2022;
  public currentDate: Date = new Date(this.currentYear, this.currentMonth, 1);
  public calendar: Array<Calendar> = [];

  private temp = {
    date: new Date(),
    ispartOfCurrentMonth: false,
  }

  private appointments: Array<Appointment> | undefined;

  constructor(private appointmentStore: AppointmentsStore) {
  }

  ngOnInit(): void {
    this.setUpCalendar(this.currentYear, this.currentMonth);
    this.appointments$.subscribe(res => {
      this.appointments = res;
    })
  }

  onDateChange(increase: boolean): void {
    if (increase) {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    } else {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth, 1);
    this.resetCalendar();
    this.setUpCalendar(this.currentYear, this.currentMonth);
  }

  public getAppointments(date: Date): Array<Appointment> {
    if (this.appointments) {
      return this.appointments.filter(res => {
        return res.startDate.getDate() === date.getDate() &&
          res.startDate.getFullYear() === date.getFullYear() &&
          res.startDate.getMonth() === date.getMonth()
      });
    }
    return [];
  }

  public openAddAppointmentModal(date: Date) {
    this.addAppointmentModalComponent?.openVerticallyCentered({
      year: this.currentYear,
      month: date.getMonth(),
      day: date.getDate()
    });
  }

  public deleteAppointment(id: number): void {
    this.appointmentStore.removeAppointment(id);
  }

  dropped($event: any) {
    this.appointmentStore.editAppointment($event.item.data.id, new Date($event.container.id));
  }

  private resetCalendar(): void {
    this.calendar = [];
  }

  private setUpCalendar(year: number, month: number): void {
    const firstDay = new Date(year, month, 1);
    const numberOfDays = this.getDaysInMonth(year, month);
    const previousMonth = month - 1 < 0 ? 11 : month - 1;
    const numberOfDaysOfPreviousMonth = this.getDaysInMonth(year, previousMonth);
    for (let i = firstDay.getDay() - 1; i > 0; i--) {
      this.calendar.push({
        date: new Date(this.currentYear, previousMonth, numberOfDaysOfPreviousMonth - i + 1),
        isPartOfCurrentMonth: false
      });
    }
    for (let i = 1; i <= numberOfDays; i++) {
      this.calendar.push({date: new Date(this.currentYear, this.currentMonth, i), isPartOfCurrentMonth: true});
    }
    const extraDays = 42 - this.calendar.length;
    let nextMonth = month + 1;
    let tempYear = year;
    if (nextMonth > 11) {
      nextMonth = 0;
      tempYear++;
    }
    for (let i = 1; i <= extraDays; i++) {
      this.calendar.push({date: new Date(tempYear, nextMonth, i), isPartOfCurrentMonth: false});
    }
  }

  private getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}
