import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-time-zones',
  template: `
    <div class="mt-3" *ngIf="city">
      <p class="fs-3"> {{ value }} </p>
    </div>
  `
})

export class TimeZonesComponent implements OnChanges {
  @Input() city : string = "";
  @Input() continent : string = "";
  API = "https://worldtimeapi.org/api/timezone/"; 
  value = '';

  ngOnChanges(): void {    
    this.city && this.getTime(`${this.API}${this.continent}/${this.city.split(' ').join('_')}`);
  }

  async getTime(timeZoneLink:string) {
    try {
      const response = await fetch (timeZoneLink);
      const data = await response.json();
      const offset = data.utc_offset;

      this.convertDateTime(offset);

    } catch(error) {
      console.log(`Oh no! ${error}`);
    }
  }

  addZeroBeforNumber(number:number):string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  convertDateTime(offset:String):void {
    let dateTime = new Date();

    const offsetMinutes = Number(offset.slice(0,3))*60 + dateTime.getTimezoneOffset();

    dateTime.setMinutes(dateTime.getMinutes() + offsetMinutes);

    const fullTime = {
      hours: this.addZeroBeforNumber(dateTime.getHours()),
      minutes: this.addZeroBeforNumber(dateTime.getMinutes()),
      seconds: this.addZeroBeforNumber(dateTime.getSeconds()),
    }

    this.value = `Now in ${this.city} is ${fullTime.hours}:${fullTime.minutes}:${fullTime.seconds}.`; 
  }
}
