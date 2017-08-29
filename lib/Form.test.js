"use babel";
// @flow

import React from "react";
import { shallow, mount } from "enzyme";
import Form from "./Form";
import { fromJS } from "immutable";

describe("Form", () => {
  it("should call onSubmit with the converted out form state on submit", () => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={spy} />,
    );

    subject.find(FormComp).at(0).prop("onChange")("Mr Joe", "name");
    subject.find(FormComp).at(0).prop("onSubmit")();

    expect(spy).toBeCalledWith({ firstname: "Mr Joe" });
  });

  it("should send an event when state has changed", done => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={spy} />,
    );
    let obs = subject.find(FormComp).at(0).prop("valueChangeObs");

    obs.skip(1).subscribe(e => {
      expect(e.value).toMatchSnapshot();
      done();
    });

    subject.find(FormComp).at(0).prop("onChange")("Mr Joe", "name");
  });

  it("should handle initial as an object", done => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm
        initial={{ firstname: "Alan" }}
        onSubmit={spy}
        firstname="Alan"
      />,
    );

    subject.find(FormComp).at(0).prop("valueChangeObs").subscribe({
      next: e => {
        expect(e.value.name).toBe("Alan");
        done();
      },
    });
  });

  it("should handle initial as a function", done => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm
        initial={props => ({ firstname: props.firstname })}
        onSubmit={spy}
        firstname="Alan"
      />,
    );

    subject.find(FormComp).at(0).prop("valueChangeObs").subscribe({
      next: e => {
        expect(e.value.name).toBe("Alan");
        done();
      },
    });
  });

  it("should refresh the state when initial change", done => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let subject = mount(<ControlledForm initial={{ firstname: "Alan" }} />);

    subject.find(FormComp).at(0).prop("valueChangeObs").skip(1).subscribe({
      next: e => {
        expect(e.value.name).toBe("Zanatta");
        done();
      },
    });

    subject.setProps({ initial: { firstname: "Zanatta" } });
  });

  it("should call applyControl on input value change before setting the new state", done => {
    let FormComp = () => <div />;
    let ControlledForm = Form({
      applyControl: state =>
        fromJS(state).update("name", name => name.replace(" ", "")).toJS(),
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name }),
    })(FormComp);
    let spy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={spy} />,
    );

    subject.find(FormComp).at(0).prop("valueChangeObs").skip(1).subscribe({
      next: e => {
        expect(e.value.name).toBe("MrJoe");
        done();
      },
    });

    subject.find(FormComp).at(0).prop("onChange")("Mr Joe", "name");
  });

  it("should call getUncontrolledState of child if it exists and merge states", () => {
    class FormComp extends React.Component {
      componentDidMount() {
        this.context.attachToForm(() => ({ coucou: "salut" }));
      }
      render() {
        return <div />;
      }
    }
    FormComp.contextTypes = { attachToForm: React.PropTypes.func };
    let ControlledForm = Form({
      applyControl: state =>
        fromJS(state).update("name", name => name.replace(" ", "")).toJS(),
      convertIn: inValue => ({ name: inValue.firstname }),
      convertOut: out => ({ firstname: out.name, coucou: out.coucou }),
    })(FormComp);
    let submitSpy = jest.fn();
    let subject = mount(
      <ControlledForm initial={{ firstname: "Alan" }} onSubmit={submitSpy} />,
    );

    subject.find(FormComp).at(0).prop("onSubmit")();

    expect(submitSpy.mock.calls[0][0]).toEqual({
      firstname: "Alan",
      coucou: "salut",
    });
  });
});
