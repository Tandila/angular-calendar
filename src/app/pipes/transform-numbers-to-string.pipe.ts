import { Pipe, PipeTransform } from '@angular/core';
import {Calendar} from "../components/calendar-event-view/calendar-event-view.component";

@Pipe({
  name: 'transformNumbersToString'
})
export class TransformNumbersToStringPipe implements PipeTransform {

  transform(value: Array<Calendar>): Array<string> {
    const result = [];
    for(let i=0; i<value.length; i++) {
      result.push(value[i].date.toString())
    }
    return result;
  }

}
