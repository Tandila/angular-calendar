import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppointmentsStore} from "../../Store/appointments.store";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface ModalData {
  year: number,
  month: number,
  day: number,
}

@Component({
  selector: 'app-add-appointment-modal',
  templateUrl: './add-appointment-modal.component.html',
  styleUrls: ['./add-appointment-modal.component.scss']
})
export class AddAppointmentModalComponent implements OnInit {

  public appointmentsFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  })

  @ViewChild('content') modal: any;

  constructor(private modalService: NgbModal, private appointmentsStore: AppointmentsStore) {
  }

  ngOnInit(): void {

  }

  openVerticallyCentered(data: ModalData) {
    this.setDefaultValues(data);
    this.modalService.open(this.modal, {centered: true});
  }

  setDefaultValues(data: ModalData): void {
    let tomorrow = new Date(data.year, data.month, data.day);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.appointmentsFormGroup.controls['startDate'].setValue(new Date(data.year, data.month, data.day));
    this.appointmentsFormGroup.controls['endDate'].setValue(tomorrow);
  }

  addAppointment(): void {
    this.appointmentsStore.addAppointment({
      title: this.appointmentsFormGroup.controls['title'].value,
      startDate: this.appointmentsFormGroup.controls['startDate'].value,
      endDate: this.appointmentsFormGroup.controls['endDate'].value
    });

    this.appointmentsFormGroup.reset();
  }

}
