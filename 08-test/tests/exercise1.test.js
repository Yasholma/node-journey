const { fizzBuzz } = require("../exercise1");

describe("fizzBuzz", () => {
  it("should throw an exception if input is not a number", () => {
    const args = [false, [], {}, true, "", null, undefined];
    args.forEach((notNumber) => expect(() => fizzBuzz(notNumber)).toThrow());
  });

  it("should return FizzBuzz if input is divisible by 3 and 5 without remainder", () => {
    const result = fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
  });

  it("should return Fizz if input is only divisible by 3 without remainder", () => {
    const result = fizzBuzz(9);
    expect(result).toMatch(/Fizz/);
  });

  it("should return Buzz if input is only divisible by 5 without remainder", () => {
    const result = fizzBuzz(10);
    expect(result).toMatch(/Buzz/);
  });

  it("should return input if input is not divisible by 3 or 5 without remainder", () => {
    const result = fizzBuzz(4);
    expect(result).toBe(4);
  });
});
