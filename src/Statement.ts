import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Statement {
  private readonly rentales: Rental[] = [];
  private totalAmount = 0;
  private frequentRenterPoints = 0;

  constructor(private readonly customerName: string) {}

  addRental(rental: Rental) {
    this.rentales.push(rental);
  }

  getName() {
    return this.customerName;
  }

  generate() {
    this.totalAmount = 0;
    this.frequentRenterPoints = 0;
    let result = "Rental Record for " + this.getName() + "\n";

    this.rentales.forEach((each) => {
      let thisAmount = 0;

      switch (each.getMovie().getPriceCode()) {
        case Movie.REGULAR:
          thisAmount += 2;
          if (each.getDaysRented() > 2) {
            thisAmount += (each.getDaysRented() - 2) * 1.5;
          }
          break;
        case Movie.NEW_RELEASE:
          thisAmount += each.getDaysRented() * 3;
          break;
        case Movie.CHILDRENS:
          thisAmount += 1.5;
          if (each.getDaysRented() > 3)
            thisAmount += (each.getDaysRented() - 3) * 1.5;
          break;
      }

      this.frequentRenterPoints++;

      if (
        each.getMovie().getPriceCode() == Movie.NEW_RELEASE &&
        each.getDaysRented() > 1
      )
        this.frequentRenterPoints++;

      result +=
        "\t" + each.getMovie().getTitle() + "\t" + thisAmount.toFixed(1) + "\n";
      this.totalAmount += thisAmount;
    });

    result += "You owed " + this.totalAmount.toFixed(1) + "\n";
    result +=
      "You earned " + this.frequentRenterPoints + " frequent renter points\n";

    return result;
  }

  getTotal(): any {
    return this.totalAmount;
  }

  getFrequentRenterPoints(): any {
    return this.frequentRenterPoints;
  }
}
