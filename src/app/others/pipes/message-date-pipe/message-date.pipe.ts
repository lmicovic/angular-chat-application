import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageDate',
  standalone: true
})
/**
 * Format Message createdTime.
 */
export class MessageDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    const messageDate = new Date(value);
    const nowDate = new Date();
    
    // Today - format [08:00h, Today]
    if(nowDate.getDate() === messageDate.getDate() && nowDate.getMonth() === messageDate.getMonth() && nowDate.getFullYear() === messageDate.getFullYear()) {
      
      return messageDate.getHours() + ":" + (("" + messageDate.getMinutes()).length === 1 ? messageDate.getMinutes() + "0" : messageDate.getMinutes()) + "h, Today";

    }

    // Yesterday - format [8:00h]
    else if(this.isOneDayLess(nowDate, messageDate) === true) {

      return messageDate.getHours() + ":" + (("" + messageDate.getMinutes()).length === 1 ? messageDate.getMinutes() + "0" : messageDate.getMinutes()) + "h, Yesterday";

    }
    // One Week
    else if(this.isOneWeekLess(nowDate, messageDate)) {
      
      return messageDate.getHours() + ":" + (("" + messageDate.getMinutes()).length === 1 ? messageDate.getMinutes() + "0" : messageDate.getMinutes()) + "h, " + this.getDayName(nowDate);

    }

    return messageDate.getHours() + ":" + (("" + messageDate.getMinutes()).length === 1 ? messageDate.getMinutes() + "0" : messageDate.getMinutes()) + "h, " + messageDate.getDate() + "." + (messageDate.getMonth() + 1) + "." + messageDate.getFullYear();
  }
  
  /**
   * Returns true if date2 is less than one day than date1
   * @param date1 
   * @param date2 
   * @returns 
   */
  private isOneDayLess(date1: Date, date2: Date) {

    let dateTemp1 = structuredClone(date1);
    let dateTemp2 = structuredClone(date2);

    // Set to Midnight
    dateTemp1.setHours(0, 0, 0);
    dateTemp2.setHours(0, 0, 0);
    
    // Calculate difference in millisecond between date1 and date2
    const difference = Math.abs(dateTemp1.getTime() - dateTemp2.getTime());
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;       // 24h

    // Check if date1 is yesturday compared to date2
    return difference === oneDayInMilliseconds;

  }

  /**
   * Returns true if date2 is between 2 and 6 days less than date1
   * @param date1 
   * @param date2 
   * @returns boolean
   */
  private isOneWeekLess(date1: Date, date2: Date) {

    const dateTemp1 = new Date(date1);

    const sixDaysLess = new Date(dateTemp1);
    sixDaysLess.setDate(dateTemp1.getDate() - 6);

    const twoDaysLess = new Date(dateTemp1);
    twoDaysLess.setDate(dateTemp1.getDate() - 2);

    return date2 >= sixDaysLess && date2 <= twoDaysLess;

  }  

  /**
   * Returns the name of the day
   * @param date 
   * @returns dayName
   */
  private getDayName(date: Date) {

    const DaysOfWeek = [
      'Sunday',    // 0
      'Monday',    // 1
      'Tuesday',   // 2
      'Wednesday', // 3
      'Thursday',  // 4
      'Friday',    // 5
      'Saturday'   // 6
    ];

    const dayIndex = date.getDay();
    return DaysOfWeek[dayIndex];

  }

}
