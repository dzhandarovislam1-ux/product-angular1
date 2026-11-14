import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Collection } from '../collection';
import { Color } from '../enums/color';
import { vi } from 'vitest';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the company name from the component property', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.componentInstance.isLoading.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Горный путь');
  });

  it('should show the page after two seconds and update the clock every second', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-01T00:00:00'));

    try {
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.loading-screen')).not.toBeNull();

      vi.advanceTimersByTime(1000);
      expect(fixture.componentInstance.currentDate().getTime()).toBe(
        new Date('2025-01-01T00:00:01').getTime(),
      );
      expect(fixture.componentInstance.isLoading()).toBe(true);

      vi.advanceTimersByTime(1000);
      expect(fixture.componentInstance.isLoading()).toBe(false);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.loading-screen')).toBeNull();
      fixture.destroy();
    } finally {
      vi.useRealTimers();
    }
  });

  it('should toggle the header task and keep the counter at zero or above', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.decrementCounter();
    expect(app.counter()).toBe(0);
    app.incrementCounter();
    app.toggleHeaderTask();
    expect(app.counter()).toBe(1);
    expect(app.isShowingDate()).toBe(false);
    app.decrementCounter();
    expect(app.counter()).toBe(0);
    expect(app.formattedCurrentDate()).toBeTruthy();
    fixture.destroy();
  });

  it('should display live input text beside the input', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.isLoading.set(false);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.live-input input') as HTMLInputElement;

    input.value = 'Привет';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.live-input output')?.textContent).toBe('Привет');
    fixture.destroy();
  });

  it('should enable search only when every bound field is complete', async () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.isLoading.set(false);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const searchButton = compiled.querySelector<HTMLButtonElement>('.search-button')!;
    expect(searchButton.disabled).toBe(true);

    app.selectedLocation = 'Алтай';
    fixture.detectChanges();
    expect(app.selectedLocation).toBe('Алтай');
    expect(searchButton.disabled).toBe(true);
    app.selectedDate = '2026-12-01';
    fixture.detectChanges();
    expect(searchButton.disabled).toBe(true);
    app.selectedParticipants = '4';
    fixture.detectChanges();

    expect(app.selectedParticipants).toBe('4');
    expect(app.canSearch()).toBe(true);
    expect(searchButton.disabled).toBe(false);
    fixture.destroy();
  });

  it('should render benefits and gallery cards from their collections', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.isLoading.set(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('.program-benefit')).toHaveLength(3);
    expect(compiled.querySelectorAll('.program-image')).toHaveLength(4);
    fixture.destroy();
  });

  it('should save the latest visit and increment the visit count', () => {
    localStorage.setItem('visitCount', '2');
    const fixture = TestBed.createComponent(App);

    expect(localStorage.getItem('visitCount')).toBe('3');
    expect(Number.isNaN(Date.parse(localStorage.getItem('lastVisitDate') ?? ''))).toBe(false);
    fixture.destroy();
  });

  it('should identify the three primary colors', () => {
    const app = TestBed.createComponent(App).componentInstance;

    expect(app.isPrimaryColor(Color.Red)).toBe(true);
    expect(app.isPrimaryColor(Color.Green)).toBe(true);
    expect(app.isPrimaryColor(Color.Blue)).toBe(true);
    expect(app.isPrimaryColor(Color.Yellow)).toBe(false);
  });
});

describe('Collection', () => {
  it('should get, replace, delete, and clear items', () => {
    const items = new Collection(['first', 'second']);

    expect(items.getAll()).toEqual(['first', 'second']);
    expect(items.get(1)).toBe('second');
    expect(items.replace(1, 'updated')).toBe(true);
    expect(items.get(1)).toBe('updated');
    expect(items.delete(0)).toBe(true);
    expect(items.getAll()).toEqual(['updated']);
    items.clear();
    expect(items.getAll()).toEqual([]);
    expect(items.delete(0)).toBe(false);
  });
});
