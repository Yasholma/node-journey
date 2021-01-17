const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
  applyDiscount,
  notifyCustomer,
} = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the gretting message", () => {
    const result = greet("Cybertech");
    // expect(result).toMatch(/Cybertech/);
    expect(result).toContain("Cybertech");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given ID", () => {
    const result = getProduct(1);

    // expect(result).toEqual({
    //   id: 1,
    //   price: 10,
    // });

    expect(result).toMatchObject({ id: 1, price: 10 });

    expect(result).toHaveProperty("category", "phone");
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((falsy) => expect(() => registerUser(falsy)).toThrow());
  });

  it("should return a user object if valid username is passed", () => {
    const result = registerUser("cybertech");

    expect(result).toMatchObject({ username: "cybertech" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer");
      return { id: customerId, points: 11 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // mocking with jest
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "new mail" });
    mail.send = jest.fn();

    notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("new mail");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    // expect(mail.send).toHaveBeenCalledWith("new mail");
  });
});
