import { Component } from '@angular/core';
import { Collection } from '../collection';
import { Color } from '../enums/color';
import './training';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly companyName = 'Горный путь';
  readonly tourTypes = new Collection(['Пешие туры', 'Восхождения', 'Экскурсии']);
  readonly tourDurations = new Collection([1, 3, 5, 7]);

  constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.Red, Color.Green, Color.Blue].includes(color);
  }

  private saveLastVisitDate(): void {
    localStorage.setItem('lastVisitDate', new Date().toISOString());
  }

  private saveVisitCount(): void {
    const storedCount = Number(localStorage.getItem('visitCount'));
    const visitCount = Number.isSafeInteger(storedCount) && storedCount >= 0 ? storedCount : 0;

    localStorage.setItem('visitCount', String(visitCount + 1));
  }
}
