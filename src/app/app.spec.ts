import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Collection } from '../collection';
import { Color } from '../enums/Color';

describe('App', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the company name from the component property', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Горный путь');
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
