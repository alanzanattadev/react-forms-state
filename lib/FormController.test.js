"use babel";
// @flow

import React from "react";
import { shallow, mount } from "enzyme";
import FormController from "./FormController";
import { fromJS } from "immutable";

describe("FormController", () => {
  it("should call onSubmit with the converted out form state on submit", () => {
    let Form = () => <div />;
    let ControlledForm = FormController(
      state => state,
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name })
    )(Form);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={spy} />
    );

    subject.find(Form).at(0).prop("onChange")("Mr Joe", "name");
    subject.find(Form).at(0).prop("onSubmit")();

    expect(spy).toBeCalledWith({ firstname: "Mr Joe" });
  });

  it("should handle initial as an object", done => {
    let Form = () => <div />;
    let ControlledForm = FormController(
      state => state,
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name })
    )(Form);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm
        initial={{ firstname: "Alan" }}
        onSubmit={spy}
        firstname="Alan"
      />
    );

    subject.find(Form).at(0).prop("valueChangeObs").subscribe({
      next: e => {
        expect(e.value.name).toBe("Alan");
        done();
      }
    });
  });

  it("should handle initial as a function", done => {
    let Form = () => <div />;
    let ControlledForm = FormController(
      state => state,
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name })
    )(Form);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm
        initial={props => ({ firstname: props.firstname })}
        onSubmit={spy}
        firstname="Alan"
      />
    );

    subject.find(Form).at(0).prop("valueChangeObs").subscribe({
      next: e => {
        expect(e.value.name).toBe("Alan");
        done();
      }
    });
  });

  it("should refresh the state when initial change", done => {
    let Form = () => <div />;
    let ControlledForm = FormController(
      state => state,
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name })
    )(Form);
    let subject = mount(<ControlledForm initial={{ firstname: "Alan" }} />);

    subject.find(Form).at(0).prop("valueChangeObs").skip(1).subscribe({
      next: e => {
        expect(e.value.name).toBe("Zanatta");
        done();
      }
    });

    subject.setProps({ initial: { firstname: "Zanatta" } });
  });

  it("should call applyControl on input value change before setting the new state", done => {
    let Form = () => <div />;
    let ControlledForm = FormController(
      state =>
        fromJS(state).update("name", name => name.replace(" ", "")).toJS(),
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name })
    )(Form);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={spy} />
    );

    subject.find(Form).at(0).prop("valueChangeObs").skip(1).subscribe({
      next: e => {
        expect(e.value.name).toBe("MrJoe");
        done();
      }
    });

    subject.find(Form).at(0).prop("onChange")("Mr Joe", "name");
  });

  it("should call getUncontrolledState of child if it exists and merge states", () => {
    class Form extends React.Component {
      componentDidMount() {
        this.context.attachToController(() => ({ coucou: "salut" }));
      }
      render() {
        return <div />;
      }
    }
    Form.contextTypes = { attachToController: React.PropTypes.func };
    let ControlledForm = FormController(
      state =>
        fromJS(state).update("name", name => name.replace(" ", "")).toJS(),
      inValue => ({ name: inValue.firstname }),
      out => ({ firstname: out.name, coucou: out.coucou })
    )(Form);
    let submitSpy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={submitSpy} />
    );

    subject.find(Form).at(0).prop("onSubmit")();

    expect(submitSpy.mock.calls[0][0]).toEqual({
      firstname: "Alan",
      coucou: "salut"
    });
  });
});
