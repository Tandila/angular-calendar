import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {AddAppointment, Appointment} from "../interfaces/appointment.interface";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsStore {
  private uniqueId = 0;
  private store: Array<Appointment> = [];
  private storeChange: BehaviorSubject<Array<Appointment>> = new BehaviorSubject<Array<Appointment>>([]);

  constructor() {
  }

  getAppointmentsObservable(): Observable<Array<Appointment>> {
    return this.storeChange;
  }

  addAppointment(appointment: AddAppointment): void {
    this.store.push({...appointment, id: ++this.uniqueId});
    this.notify();
  }

  removeAppointment(id: number): void {
    this.store = this.store.filter((appointment: Appointment) => appointment.id !== id);
    this.notify();
  }

  editAppointment(id: number, startDate: Date): void {
    const index = this.store.findIndex(appointment => appointment.id === id);
    if(index != -1) {
      this.store[index].startDate = startDate;
      this.notify();
    }
  }

  private notify(): void {
    this.storeChange.next(this.store);
  }

}
