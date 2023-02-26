export class Movie {
  static readonly CHILDRENS = 2;
  static readonly REGULAR = 0;
  static readonly NEW_RELEASE = 1;

  constructor(private readonly title: string, private priceCode: number) {}

  getPriceCode(): number {
    return this.priceCode;
  }

  setPriceCode(code: number) {
    this.priceCode = code;
  }

  getTitle(): string {
    return this.title;
  }
}
