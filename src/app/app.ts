import { Component, OnDestroy, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Collection } from '../collection';
import { Color } from '../enums/color';
import './training';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnDestroy {
  public readonly companyName = 'Горный путь';
  public readonly tourTypes = new Collection(['Пешие туры', 'Восхождения', 'Экскурсии']);
  public readonly tourDurations = new Collection([1, 3, 5, 7]);
  public readonly tourLocations = ['Алтай', 'Кавказ', 'Хибины'];
  public readonly participantOptions = [4, 5, 6, 7, 8];
  public readonly programBenefits = [
    {
      icon: '↗',
      title: 'Опытный гид',
      description: 'Для сопровождения каждой группы мы приглашаем профессиональных гидов.',
    },
    {
      icon: '◇',
      title: 'Безопасный поход',
      description: 'Продумываем маршрут и заботимся о безопасности на каждом этапе.',
    },
    {
      icon: '✦',
      title: 'Личные цели',
      description: 'Подберём программу под ваш опыт и поможем достичь новых высот.',
    },
  ];
  public readonly galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85',
      alt: 'Горное озеро среди скал',
    },
    {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=85',
      alt: 'Заснеженные горные вершины',
    },
    {
      src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85',
      alt: 'Путешественник на горной тропе',
    },
    {
      src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=85',
      alt: 'Горный пейзаж на закате',
    },
  ];
  public readonly currentDate = signal(new Date());
  public readonly formattedCurrentDate = computed(() =>
    this.currentDate().toLocaleString('ru-RU', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }),
  );
  public readonly counter = signal(0);
  public readonly isShowingDate = signal(true);
  public readonly liveInputValue = signal('');
  public readonly isLoading = signal(true);
  public readonly canSearch = computed(() => {
    const { location, date, participants } = this.tourSearch();
    return Boolean(location && date && participants);
  });

  private readonly tourSearch = signal({ location: '', date: '', participants: '' });
  private readonly dateTimer: ReturnType<typeof setInterval>;
  private readonly loadingTimer: ReturnType<typeof setTimeout>;

  public constructor() {
    this.saveLastVisitDate();
    this.saveVisitCount();
    this.dateTimer = setInterval(() => this.currentDate.set(new Date()), 1000);
    this.loadingTimer = setTimeout(() => this.isLoading.set(false), 2000);
  }

  public ngOnDestroy(): void {
    clearInterval(this.dateTimer);
    clearTimeout(this.loadingTimer);
  }

  public get selectedLocation(): string {
    return this.tourSearch().location;
  }

  public set selectedLocation(location: string) {
    this.tourSearch.update((search) => ({ ...search, location }));
  }

  public get selectedDate(): string {
    return this.tourSearch().date;
  }

  public set selectedDate(date: string) {
    this.tourSearch.update((search) => ({ ...search, date }));
  }

  public get selectedParticipants(): string {
    return this.tourSearch().participants;
  }

  public set selectedParticipants(participants: string) {
    this.tourSearch.update((search) => ({ ...search, participants }));
  }

  public decrementCounter(): void {
    this.counter.update((value) => Math.max(0, value - 1));
  }

  public incrementCounter(): void {
    this.counter.update((value) => value + 1);
  }

  public toggleHeaderTask(): void {
    this.isShowingDate.update((isShowingDate) => !isShowingDate);
  }

  public updateLiveInput(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.liveInputValue.set(event.target.value);
    }
  }

  public isPrimaryColor(color: Color): boolean {
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
