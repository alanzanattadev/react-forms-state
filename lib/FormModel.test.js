import { validateModel } from "./FormModel";

describe("FormModel", () => {
  describe("validateModel", () => {
    const stateValue = {
      user: {
        firstname: "alan",
        lastname: "ah ok",
        account: {
          email: "",
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
          validate: spy,
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(spy).toHaveBeenCalledWith("alan", props);
    });

    it("returns true when every validator returns true", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.account.email",
          validate: () => true,
        },
        {
          in: "user.trip.destination.address.zipcode",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toBe(true);
    });

    it("returns true if one validator returns null", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.account.email",
          validate: () => null,
        },
        {
          in: "user.lastname",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toBe(true);
    });

    it("returns true if one validator returns undefined", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          validate: () => undefined,
        },
        {
          in: "user.account.email",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toBe(true);
    });

    it("returns an object if one validator returns an error", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account.email",
          validate: () => true,
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toMatchSnapshot();
    });

    it("merges objects if several error are returns by validators", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account.email",
          validate: () => "bad email",
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toMatchSnapshot();
    });

    it("handles nested validation", () => {
      const jobs = [
        {
          in: "user.firstname",
          validate: () => true,
        },
        {
          in: "user.lastname",
          validate: () => "not a real one",
        },
        {
          in: "user.account",
          validate: () => "Weird account",
        },
        {
          in: "user.account.email",
          validate: () => "bad email",
        },
      ];
      const props = {};
      const subject = validateModel(stateValue, jobs, props);

      expect(subject).toMatchSnapshot();
    });

    it("does not crash if validate is not defined", () => {
      const jobs = [
        {
          in: "user.firstname",
        },
      ];
      const props = {};
      expect(() => validateModel(stateValue, jobs, props)).not.toThrow();
    });
  });
});
