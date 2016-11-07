'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import StateDispatcher from './StateDispatcher';
import StateProxy from "./StateProxy";

describe('StateDispatcher', () => {
  class InputField extends React.Component{render() { return (<span><strong>Ok</strong>Salut</span>) }};
  let ProxiedInputField = StateProxy()(InputField);
  class InputGroup extends React.Component {
    render() {
      return (
        <div>
          {this.props.children}
        </div>
      );
    }
  };
  let ProxiedGroup = StateProxy()(InputGroup);

  it('should propagate value from an object', () => {
    class Form extends React.Component {
      render() {
        return (
          <div>
            <ProxiedInputField name="firstname"/>
            <div>
              <p>
                <span>Hey</span>ok
              </p>
            </div>
            <div>
              <ProxiedInputField name="lastname"/>
            </div>
            <ProxiedInputField name="description"/>
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
            <ProxiedInputField name="firstname"/>
            <div>
              <ProxiedInputField name="lastname"/>
            </div>
            <ProxiedInputField name="description"/>
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
            <ProxiedInputField name="firstname"/>
            <div>
              <ProxiedInputField name="lastname"/>
            </div>
            <ProxiedInputField name="description"/>
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
            <ProxiedInputField name="firstname"/>
            <div>
              <ProxiedInputField name="lastname"/>
            </div>
            <ProxiedInputField name="description"/>
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
            <ProxiedInputField name="firstname"/>
            <ProxiedGroup name="skills">
              <ProxiedInputField name="tdd"/>
            </ProxiedGroup>
            <ProxiedInputField name="description"/>
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

  it('should stop propagation when another dispatcher is encountered', () => {
    class MiniForm extends React.Component {
      render() {
        return (
          <div>
            <ProxiedGroup>
              <ProxiedInputField name="month"/>
            </ProxiedGroup>
            <ProxiedInputField name="year"/>
          </div>
        );
      }
    }
    MiniForm.defaultProps = {name: "date"};
    let ProxiedMiniForm = StateDispatcher(
      inValue => inValue.month == "1" ? {month: 'janvier', year: '16'} : {month: 'february', year: '16'},
      outValue => outValue.month == "janvier" ? {month: "1", year: '2016'} : {month: '2', year: outValue.year}
    )(MiniForm);
    class Form extends React.Component {
      render() {
        return (
          <div>
            <ProxiedInputField name="firstname"/>
            <ProxiedGroup name="skills">
              <ProxiedInputField name="tdd"/>
            </ProxiedGroup>
            <ProxiedMiniForm/>
            <ProxiedMiniForm name="birthday"/>
            <ProxiedInputField name="description"/>
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
      },
      date: {
        month: "1",
        year: "2016"
      },
      birthday: {
        month: "2",
        year: "2016"
      }
    };
    let spy = jest.fn();
    let subject = mount(<ProxiedForm value={values} onChange={spy}/>);

    expect(subject.find(MiniForm).at(0).find(InputField).at(0).prop('value')).toBe('janvier');
    expect(subject.find(MiniForm).at(0).find(InputField).at(1).prop('value')).toBe('16');
    expect(subject.find(MiniForm).at(1).find(InputField).at(0).prop('value')).toBe('february');
    expect(subject.find(MiniForm).at(1).find(InputField).at(1).prop('value')).toBe('16');

    subject.find(MiniForm).at(1).find(InputField).at(1).prop('onChange')('17');

    expect(spy.mock.calls[0][0]).toEqual({
      firstname: "Alan",
      description: "Good",
      skills: {
        tdd: false
      },
      date: {
        month: "1",
        year: "2016"
      },
      birthday: {
        month: "2",
        year: "17"
      }
    });
  });
});
