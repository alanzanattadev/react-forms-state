import {
  notNull,
  notUndefined,
  notEmpty,
  required,
  isTrue,
  maxLength,
  lessThan,
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
      const subject = maxLength(6)("a12345");

      expect(subject).toBe(true);
    });

    it("returns error if maxLength === 2 and value is 'abc'", () => {
      const errorString = "You have to fill the field";
      const subject = maxLength(2, { errorString })("abc");

      expect(subject).toBe(errorString);
    });

    it("returns error if value isn't a string", () => {
      const errorString = "You have to fill the field";
      const subject = maxLength(3, { errorString })(2);

      expect(subject).toBe(errorString);
    });
  });

  describe("lessThan", () => {
    it("sends value and props as parameters to the accessor", () => {
      const spy1 = jest.fn();
      const spy2 = jest.fn();
      const value = {
        profile: {
          birthday: 12039233,
        },
        account: {
          creationDate: 12039233,
        },
      };
      const props = {};
      const subject = lessThan(spy1, spy2)(value, props);

      expect(spy1).toHaveBeenCalledWith(value, props);
      expect(spy2).toHaveBeenCalledWith(value, props);
    });

    it("returns true when both are equal", () => {
      const subject = lessThan(
        value => value.profile.birthday,
        value => value.account.creationDate,
      )({
        profile: {
          birthday: 12039233,
        },
        account: {
          creationDate: 12039233,
        },
      });

      expect(subject).toBe(true);
    });

    it("returns an error when second is less than the first one", () => {
      const error = "You have to fill the field";
      const subject = lessThan(
        value => value.profile.birthday,
        value => value.account.creationDate,
        { error },
      )({
        profile: {
          birthday: 12039232,
        },
        account: {
          creationDate: 12039231,
        },
      });

      expect(subject).toBe(error);
    });

    it("returns an error when second is less than the first one with error as a function", () => {
      const value = {
        profile: {
          birthday: 12039232,
        },
        account: {
          creationDate: 12039231,
        },
      };
      const props = {};
      const error = "You have to fill the field";
      const errorSpy = jest.fn(() => error);
      const subject = lessThan(
        value => value.profile.birthday,
        value => value.account.creationDate,
        { error: errorSpy },
      )(value, props);

      expect(errorSpy).toHaveBeenCalledWith(value, props);
      expect(subject).toBe(error);
    });

    it("returns true when the first one is less than the second one", () => {
      const subject = lessThan(
        value => value.profile.birthday,
        value => value.account.creationDate,
      )({
        profile: {
          birthday: 12039232,
        },
        account: {
          creationDate: 12039233,
        },
      });

      expect(subject).toBe(true);
    });

    it("handles statepaths as well as getters", () => {
      const subject = lessThan("profile.birthday", "account.creationDate", {})({
        profile: {
          birthday: 12039234,
        },
        account: {
          creationDate: 12039233,
        },
      });

      expect(subject).not.toBe(true);
    });

    it("throws if accessors are neither function nor stringPath", () => {
      expect(() => lessThan(1, 2)({})).toThrow();
    });
  });
});
