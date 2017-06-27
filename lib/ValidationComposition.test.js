import {
  notNull,
  notUndefined,
  notEmpty,
  required,
  isTrue,
  maxLength,
  composeValidation,
} from "./ValidationComposition";

describe("Validation Composition", () => {
  describe("notNull", () => {
    it("returns true if value !== null", () => {
      const subject = notNull()("");

      expect(subject).toBe(true);
    });

    it("returns an error explaining what's wrong if value === null", () => {
      const errorString = "You have to fill the field";
      const subject = notNull({ errorString })(null);

      expect(subject).toBe(errorString);
    });
  });

  describe("notUndefined", () => {
    it("returns true if value !== undefined", () => {
      const subject = notUndefined()("");

      expect(subject).toBe(true);
    });

    it("returns an error explaining what's wrong if value === undefined", () => {
      const errorString = "You have to fill the field";
      const subject = notUndefined({ errorString })(undefined);

      expect(subject).toBe(errorString);
    });
  });

  describe("notEmpty", () => {
    it('returns true if value !== ""', () => {
      const subject = notEmpty()("ok");

      expect(subject).toBe(true);
    });

    it("returns true if value === null", () => {
      const subject = notEmpty()(null);

      expect(subject).toBe(true);
    });

    it('returns an error explaining what is wrong if value === ""', () => {
      const errorString = "You have to fill the field";
      const subject = notEmpty({ errorString })("");

      expect(subject).toBe(errorString);
    });
  });

  describe("composeValidation", () => {
    it("executes the whole chain", () => {
      const validate1Spy = jest.fn(() => true);
      const validate2Spy = jest.fn(() => true);
      const validate3Spy = jest.fn(() => true);
      const state = "test";
      const props = { testProp: true };

      composeValidation(validate1Spy, validate2Spy, validate3Spy)(state, props);

      expect(validate1Spy).toHaveBeenCalledWith(state, props);
      expect(validate2Spy).toHaveBeenCalledWith(state, props);
      expect(validate3Spy).toHaveBeenCalledWith(state, props);
    });

    it("stops executing the chain after a fail", () => {
      const validate1Spy = jest.fn(() => true);
      const validate2Spy = jest.fn(() => false);
      const validate3Spy = jest.fn(() => true);
      const state = "test";
      const props = { testProp: true };

      composeValidation(validate1Spy, validate2Spy, validate3Spy)(state, props);

      expect(validate1Spy).toHaveBeenCalledWith(state, props);
      expect(validate2Spy).toHaveBeenCalledWith(state, props);
      expect(validate3Spy).not.toHaveBeenCalled();
    });

    it("returns the error of the one which failed first", () => {
      const validate1Spy = jest.fn(() => true);
      const validate2Spy = jest.fn(() => null);
      const validate3Spy = jest.fn(() => false);
      const state = "test";
      const props = { testProp: true };
      const subject = composeValidation(
        validate1Spy,
        validate2Spy,
        validate3Spy,
      )(state, props);

      expect(subject).toBe(null);
    });
  });

  describe("required", () => {
    it('returns true if value is "ok"', () => {
      const subject = required()("ok");

      expect(subject).toBe(true);
    });

    it("returns true if value is false", () => {
      const errorString = "You have to fill the field";
      const subject = required({ errorString })(false);

      expect(subject).toBe(true);
    });

    it("returns error if value is empty", () => {
      const errorString = "You have to fill the field";
      const subject = required({ errorString })("");

      expect(subject).toBe(errorString);
    });

    it("returns error if value is null", () => {
      const errorString = "You have to fill the field";
      const subject = required({ errorString })(null);

      expect(subject).toBe(errorString);
    });

    it("returns error if value is undefined", () => {
      const errorString = "You have to fill the field";
      const subject = required({ errorString })(undefined);

      expect(subject).toBe(errorString);
    });
  });

  describe("isTrue", () => {
    it("returns true if value is true", () => {
      const subject = isTrue()(true);

      expect(subject).toBe(true);
    });

    it("returns error if value is false", () => {
      const errorString = "You have to fill the field";
      const subject = isTrue({ errorString })(false);

      expect(subject).toBe(errorString);
    });

    it("returns error if value is null", () => {
      const errorString = "You have to fill the field";
      const subject = isTrue({ errorString })(null);

      expect(subject).toBe(errorString);
    });
  });

  describe("maxLength", () => {
    it("returns true if maxLength === 6 and value is 'a12345'", () => {
      const subject = maxLength({ max: 6 })("a12345");

      expect(subject).toBe(true);
    });

    it("returns error if maxLength === 2 and value is 'abc'", () => {
      const errorString = "You have to fill the field";
      const subject = maxLength({ max: 2, errorString })("abc");

      expect(subject).toBe(errorString);
    });

    it("returns error if value isn't a string", () => {
      const errorString = "You have to fill the field";
      const subject = maxLength({ max: 3, errorString })(2);

      expect(subject).toBe(errorString);
    });
  });
});
