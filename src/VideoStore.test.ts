import { Statement } from "./Statement";
import { Movie } from "./Movie";
import { Rental } from "./Rental";

describe("Videostore tests", () => {
  let statement: Statement;

  beforeEach(() => {
    statement = new Statement("Fred");
  });

  test("test Single New Release Statement", () => {
    statement.addRental(
      new Rental(new Movie("The Cell", Movie.NEW_RELEASE), 3)
    );
    statement.generate();
    expect(statement.getTotal()).toBe(9);
    expect(statement.getFrequentRenterPoints()).toBe(2);
  });

  test("testDualNewReleaseStatement", () => {
    statement.addRental(
      new Rental(new Movie("The Cell", Movie.NEW_RELEASE), 3)
    );
    statement.addRental(
      new Rental(new Movie("The Tigger Movie", Movie.NEW_RELEASE), 3)
    );
    statement.generate();
    expect(statement.getTotal()).toBe(18);
    expect(statement.getFrequentRenterPoints()).toBe(4);
  });

  test("testSingleChildrensStatement", () => {
    statement.addRental(
      new Rental(new Movie("The Tigger Movie", Movie.CHILDRENS), 3)
    );
    statement.generate();
    expect(statement.getTotal()).toBe(1.5);
    expect(statement.getFrequentRenterPoints()).toBe(1);
  });

  test("testMultipleRegularStatement", () => {
    statement.addRental(
      new Rental(new Movie("Plan 9 from Outer Space", Movie.REGULAR), 1)
    );
    statement.addRental(new Rental(new Movie("8 1/2", Movie.REGULAR), 2));
    statement.addRental(new Rental(new Movie("Eraserhead", Movie.REGULAR), 3));

    statement.generate();
    expect(statement.getTotal()).toBe(7.5);
    expect(statement.getFrequentRenterPoints()).toBe(3);
  });

  test("Test Multiple Regular Statement Format", () => {
    statement.addRental(
      new Rental(new Movie("Plan 9 from Outer Space", Movie.REGULAR), 1)
    );
    statement.addRental(new Rental(new Movie("8 1/2", Movie.REGULAR), 2));
    statement.addRental(new Rental(new Movie("Eraserhead", Movie.REGULAR), 3));

    expect(statement.generate()).toBe(
      "Rental Record for Fred\n" +
        "\tPlan 9 from Outer Space\t2.0\n" +
        "\t8 1/2\t2.0\n" +
        "\tEraserhead\t3.5\n" +
        "You owed 7.5\n" +
        "You earned 3 frequent renter points\n"
    );
  });
});
