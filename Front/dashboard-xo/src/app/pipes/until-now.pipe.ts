import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'untilNow'})
export class UntilNow implements PipeTransform {

  transform(value: Date): string {
    const now: number = new Date().getTime();
    const date: number = new Date(value).getTime();
    const seconds: number = Math.round(Math.abs(now - date) / 1000);
    const minutes: number = Math.trunc(seconds / 60);
    const hours: number = Math.trunc(minutes / 60);
    const days: number = Math.trunc(hours / 24);
    const months: number = Math.trunc(days / 30.417);
    const years: number = Math.trunc(months / 12);
    if (seconds <= 59) {
        return 'Il y a ' + seconds + (seconds <= 1 ? ' seconde' : ' secondes');
    } else if (minutes <= 59) {
        return 'Il y a ' + minutes + (minutes === 1 ? ' minute' : ' minutes');
    } else if (hours <= 23) {
        const min = Math.round(((minutes / 60) - hours) * 60);
        return 'Il y a ' + hours + (hours === 1 ? ' heure ' : ' heures ') + (min === 0 ? '' : min);
    } else if (days <= 30) {
      return 'Il y a ' + days + (days === 1 ? ' jour' : ' jours');
    } else if (months <= 11) {
      return 'Il y a ' + months + ' mois';
    } else {
        return 'Il y a ' + years + (years === 1 ? ' an' : ' ans');
    }
  }
}
