
export interface Appointment extends AddAppointment{
  id: number,
}

export interface AddAppointment {
  title: string,
  startDate: Date,
  endDate: Date,
}
