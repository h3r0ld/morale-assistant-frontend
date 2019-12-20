import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeFormatter'})
export class TimeFormatterPipe implements PipeTransform {

    transform(value: number, ...args: any[]) {
        const hours = Math.floor(value / 360);
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value - (minutes * 60));
        
        return `${hours > 0 ? hours + ':' : ''}${minutes}:${seconds.toLocaleString('hu', { minimumIntegerDigits: 2, useGrouping: false})}`;
    }
}