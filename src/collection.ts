export class Collection<T> {
  private items: T[];

  constructor(items: readonly T[] = []) {
    this.items = [...items];
  }

  getAll(): T[] {
    return [...this.items];
  }

  get(index: number): T | undefined {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  delete(index: number): boolean {
    if (!this.isValidIndex(index)) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  replace(index: number, item: T): boolean {
    if (!this.isValidIndex(index)) {
      return false;
    }

    this.items[index] = item;
    return true;
  }

  private isValidIndex(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index < this.items.length;
  }
}
