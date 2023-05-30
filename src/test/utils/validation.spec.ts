import { emailValidation, validatePassword } from "../../utils/functions.js";
import { expect } from "chai";

describe("email validation", function () {
  it("should be false for invalid emails", function () {
    expect(emailValidation("")).to.equal(false);
    expect(emailValidation("aaa")).to.equal(false);
    expect(emailValidation("aaa@")).to.equal(false);
    expect(emailValidation("aaa@aaa")).to.equal(false);
    expect(emailValidation("aaa@aaa.")).to.equal(false);
  });

  it("should be true for a valid email", function () {
    expect(emailValidation("aaa@aaa.com")).to.equal(true);
  });
});

describe("password validation", function () {
  it("should be false for empty password", function () {
    expect(validatePassword("")).to.equal(false);
  });

  it("should be false for too short password", function () {
    expect(validatePassword("abc")).to.equal(false);
  });

  it("should be false for password with only alphanumeric characters", function () {
    expect(validatePassword("abcdefgh")).to.equal(false);
  });

  it("should be true for a password with capital letter, numbers and special chars", function () {
    expect(validatePassword("AbcGHdfghe!123@")).to.equal(true);
  });
});
