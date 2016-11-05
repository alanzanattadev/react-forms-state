'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import StateDispatcher from './StateDispatcher';
import StateProxy from "./StateProxy";

describe('StateDispatcher', () => {
  class A extends React.Component{render() { return (<span></span>) }};
  let InputField = StateProxy(A);
  class InputGroup extends React.Component {
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  };
  let ProxiedGroup = StateProxy(InputGroup);

  it('should propagate value from an object', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <InputField name="firstname"/>
            <div>
              <span>Hello</span>
              <p>
                Hey
              </p>
            </div>
            <div>
              <InputField name="lastname"/>
            </div>
            <InputField name="description"/>
          </div>
        );
      }
    };
    let ProxiedForm = StateDispatcher()(Form);
    let values = {
      firstname: "Alan",
      lastname: "Zanatta",
      description: "Good"
    };
    let subject = mount(<ProxiedForm value={values}/>);

    expect(subject.find(InputField).at(0).prop('value')).toBe('Alan');
    expect(subject.find(InputField).at(1).prop('value')).toBe('Zanatta');
    expect(subject.find(InputField).at(2).prop('value')).toBe('Good');
  });

  it('should aggregate values of an object for onChange', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <InputField name="firstname"/>
            <div>
              <InputField name="lastname"/>
            </div>
            <InputField name="description"/>
          </div>
        );
      }
    };
    let ProxiedForm = StateDispatcher()(Form);
    let values = {
      firstname: "Alan",
      lastname: "Zanatta",
      description: "Good"
    };
    let spy = jest.fn();
    let subject = mount(<ProxiedForm value={values} onChange={spy}/>);

    subject.find(InputField).at(1).prop('onChange')('Joe');

    expect(spy).toBeCalledWith({
      firstname: "Alan",
      lastname: "Joe",
      description: "Good"
    });
  });

  it('should propagate value from an array', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <InputField name="firstname"/>
            <div>
              <InputField name="lastname"/>
            </div>
            <InputField name="description"/>
          </div>
        );
      }
    };
    let ProxiedForm = StateDispatcher()(Form);
    let values = [{
      id: 'firstname',
      value: "Alan",
    }, {
      id: 'lastname',
      value: "Jon",
    }, {
      id: 'description',
      value: "Foo",
    }];
    let subject = mount(<ProxiedForm value={values}/>);

    expect(subject.find(InputField).at(0).prop('value')).toBe('Alan');
    expect(subject.find(InputField).at(1).prop('value')).toBe('Jon');
    expect(subject.find(InputField).at(2).prop('value')).toBe('Foo');
  });

  it('should aggregate values from an array for onChange', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <InputField name="firstname"/>
            <div>
              <InputField name="lastname"/>
            </div>
            <InputField name="description"/>
          </div>
        );
      }
    };
    let ProxiedForm = StateDispatcher()(Form);
    let values = [{
      id: 'firstname',
      value: 'Alan',
    }, {
      id: 'lastname',
      value: 'Zanatta',
    }, {
      id: 'description',
      value: 'Foo'
    }];
    let spy = jest.fn();
    let subject = mount(<ProxiedForm value={values} onChange={spy}/>);

    subject.find(InputField).at(1).prop('onChange')('Joe');

    expect(spy).toBeCalledWith([{
      id: 'firstname',
      value: 'Alan'
    }, {
      id: 'lastname',
      value: 'Joe'
    }, {
      id: 'description',
      value: "Foo",
    }]);
  });

  it('should compute and pass the state path', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <InputField name="firstname"/>
            <ProxiedGroup name="skills">
              <InputField name="tdd"/>
            </ProxiedGroup>
            <InputField name="description"/>
          </div>
        );
      }
    }
    let ProxiedForm = StateDispatcher()(Form);
    let values = {
      firstname: "Alan",
      description: "Good",
      skills: {
        tdd: false
      }
    };
    let subject = mount(<ProxiedForm value={values}/>);

    expect(subject.find(InputField).at(0).prop('statePath')).toBe('firstname');
    expect(subject.find(InputField).at(1).prop('statePath')).toBe('skills.tdd');
    expect(subject.find(InputField).at(2).prop('statePath')).toBe('description');
  });
});
