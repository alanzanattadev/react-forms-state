"use babel";
// @flow

import { Validation } from "./ValidationHelpers";

describe("Validation", () => {
  it("should set error correctly with simple path", () => {
    let subject = new Validation().setErrorForFieldAt(
      "all.group.individual.field",
      "impossible",
    );

    expect(subject.infos).toMatchSnapshot();
  });

  it("should remove error correctly with simple path", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
      },
      wrong: {
        one: "wrong",
      },
    }).removeErrorForFieldAt("all.group.individual.field");

    expect(subject.infos).toMatchSnapshot();
  });

  it("should get error correctly with simple path", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
      },
      wrong: {
        one: "wrong",
      },
    }).getErrorForFieldAt("all.group.individual.ok");

    expect(subject).toMatchSnapshot();
  });

  it("should get nested Validation correctly", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
      },
      wrong: {
        one: "wrong",
      },
    }).getNestedValidation("all.group");

    expect(subject).toMatchSnapshot();
  });

  it("should not error when nothing exists at statepath", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
      },
      wrong: {
        one: "wrong",
      },
    }).getNestedValidation("all.nothing");

    expect(subject).toMatchSnapshot();
  });

  it("should not error when null is at statepath", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
        nothing: null,
      },
      wrong: {
        one: "wrong",
      },
    })
      .getNestedValidation("all.nothing.ah")
      .getErrorForFieldAt("test");

    expect(subject).toMatchSnapshot();
  });

  it("should not crash when trying to remove a non existing error", () => {
    let subject = new Validation({
      all: {
        group: {
          individual: {
            field: "impossible",
            ok: "not ok",
          },
          ah: "ah",
        },
        nothing: null,
      },
      wrong: {
        one: "wrong",
      },
    }).removeErrorForFieldAt("all.group.ok");

    expect(subject).toMatchSnapshot();
  });
});
