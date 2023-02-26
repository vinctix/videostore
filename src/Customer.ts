import { Movie } from "./Movie";
import { Rental } from "./Rental";

export class Customer {
  private readonly rentales: Rental[] = [];

  constructor(private readonly name: string) {}

  addRental(rental: Rental) {
    this.rentales.push(rental);
  }

  getName() {
    return this.name;
  }

  statement() {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
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

      frequentRenterPoints++;

      if (
        each.getMovie().getPriceCode() == Movie.NEW_RELEASE &&
        each.getDaysRented() > 1
      )
        frequentRenterPoints++;

      result +=
        "\t" + each.getMovie().getTitle() + "\t" + thisAmount.toFixed(1) + "\n";
      totalAmount += thisAmount;
    });

    result += "You owed " + totalAmount.toFixed(1) + "\n";
    result +=
      "You earned " + frequentRenterPoints + " frequent renter points\n";

    return result;
  }
}
