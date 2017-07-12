import { validateModel, convertIn, convertOut } from "./FormModel";
import { composeValidation } from "./ValidationComposition";

describe("FormModel", () => {
  describe("convertIn", () => {
    const inValue = {
      user: {
        firstname: "alan",
        lastname: "ah ok",
        account: {
          email: "my email",
          password: "test",
        },
      },
      trip: {
        destination: {
          country: "Australia",
        },
      },
    };

    it("should handle well empty in", () => {
      const jobs = [
        {
          in: "",
          out: "test",
        },
        {
          in: "user.firstname",
          out: "firstname",
        },
      ];
      const subject = convertIn(inValue, jobs);

      expect(subject).toMatchSnapshot();
    });

    it("should handle well empty out", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "",
        },
        {
          in: "user.lastname",
          out: "lastname",
        },
      ];
      const subject = convertIn(inValue, jobs);

      expect(subject).toMatchSnapshot();
    });

    it("should handle well empty in and out", () => {});
  });

  describe("convertOut", () => {
    const stateValue = {
      user: {
        firstname: "alan",
        lastname: "ah ok",
        account: {
          email: "my email",
          password: "test",
        },
      },
      trip: {
        destination: {
          country: "Australia",
        },
      },
    };

    it("should handle well empty in", () => {});

    it("should handle well empty out", () => {});

    it("should handle well empty in and out", () => {});
  });

  describe("validateModel", () => {
    const stateValue = {
      user: {
        firstname: "alan",
        lastname: "ah ok",
        account: {
          email: "my email",
          password: "test",
        },
      },
      trip: {
        destination: {
          country: "Australia",
        },
      },
    };

    it("passes the props and value to different validators", () => {
      const spy = jest.fn(() => true);
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: spy,
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(spy).toHaveBeenCalledWith("alan", props);
    });

    it("returns true when every validator returns true", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => true,
        },
        {
          in: "user.trip.destination.address.zipcode",
          out: "user.trip.destination.address.zipcode",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toBe(true);
    });

    it("returns true if one validator returns null", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => null,
        },
        {
          in: "user.lastname",
          out: "user.lastname",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toBe(true);
    });

    it("returns true if one validator returns undefined", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          out: "user.lastname",
          validate: () => undefined,
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toBe(true);
    });

    it("returns an object if one validator returns an error", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          out: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toMatchSnapshot();
    });

    it("merges objects if several error are returns by validators", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          out: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => "bad email",
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toMatchSnapshot();
    });

    it("handles nested validation", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          out: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account",
          out: "user.account",
          validate: () => "Weird account",
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => "bad email",
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toMatchSnapshot();
    });

    it("handles nested validation with out structure different than in structure", () => {
      const jobs = [
        {
          in: "firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "lastname",
          out: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account",
          out: "user.account",
          validate: () => "Weird account",
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: () => "bad email",
        },
      ];
      const props = {};
      const subject = validateModel(jobs)(stateValue, props);

      expect(subject).toMatchSnapshot();
    });

    it("does not crash if validate is not defined", () => {
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
        },
      ];
      const props = {};
      expect(() => validateModel(jobs)(stateValue, props)).not.toThrow();
    });

    it("should handle well empty in", () => {});

    it("should handle well empty out", () => {});

    it("should handle well empty in and out", () => {});

    it("is usable with composeValidation", () => {
      const spy = jest.fn(() => true);
      const jobs = [
        {
          in: "user.firstname",
          out: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.account.email",
          out: "user.account.email",
          validate: spy,
        },
        {
          in: "user.trip.destination.address.zipcode",
          out: "user.trip.destination.address.zipcode",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = composeValidation(validateModel(jobs))(stateValue, props);

      expect(subject).toBe(true);
      expect(spy).toHaveBeenCalledWith("my email", props);
    });
  });
});
