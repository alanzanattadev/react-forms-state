'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import FormController from './FormController';
import { fromJS } from "immutable";

describe('FormController', () => {
  it('should call onSubmit with the converted out form state on submit', () => {
    let Form = () => (<div></div>);
    let ControlledForm = FormController(
      state => state,
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name})
    )(Form);
    let spy = jest.fn();
    let subject = mount(<ControlledForm initial={{firstname: 'Alan'}} onSubmit={spy}/>);

    subject.find(Form).at(0).prop('onChange')({name: 'Mr Joe'})
    subject.find(Form).at(0).prop('onSubmit')();

    expect(spy).toBeCalledWith({firstname: 'Mr Joe'});
  });

  it('should handle initial as an object', () => {
    let Form = () => (<div></div>);
    let ControlledForm = FormController(
      state => state,
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name})
    )(Form);
    let subject = mount(<ControlledForm initial={{firstname: 'Alan'}}/>);

    expect(subject.state('name')).toBe('Alan');
  });

  it('should handle initial as a function', () => {
    let Form = () => (<div></div>);
    let ControlledForm = FormController(
      state => state,
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name})
    )(Form);
    let spy = jest.fn();
    let subject = mount(<ControlledForm initial={(props) => ({firstname: props.firstname})} onSubmit={spy} firstname="Alan"/>);

    expect(subject.state('name')).toBe('Alan');
  });

  it('should refresh the state when initial change', () => {
    let Form = () => (<div></div>);
    let ControlledForm = FormController(
      state => state,
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name})
    )(Form);
    let subject = mount(<ControlledForm initial={{firstname: 'Alan'}}/>);

    subject.setProps({initial: {firstname: 'Zanatta'}});

    expect(subject.state('name')).toBe('Zanatta');
  });

  it('should call applyControl on input value change before setting the new state', () => {
    let Form = () => (<div></div>);
    let ControlledForm = FormController(
      state => fromJS(state).update('name', name => name.replace(' ', '')).toJS(),
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name})
    )(Form);
    let spy = jest.fn();
    let subject = mount(<ControlledForm initial={{firstname: 'Alan'}} onSubmit={spy}/>);

    subject.find(Form).at(0).prop('onChange')({name: 'Mr Joe'});

    expect(subject.state('name')).toBe('MrJoe');
  });

  it('should call getUncontrolledState of child if it exists and merge states', () => {
    class Form extends React.Component {getUncontrolledState() {return {coucou: 'salut'}} render() {return (<div></div>)}}
    let ControlledForm = FormController(
      state => fromJS(state).update('name', name => name.replace(' ', '')).toJS(),
      inValue => ({name: inValue.firstname}),
      out => ({firstname: out.name, coucou: out.coucou})
    )(Form);
    let submitSpy = jest.fn();
    let subject = mount(<ControlledForm initial={{firstname: 'Alan'}} onSubmit={submitSpy}/>);

    subject.find(Form).at(0).prop('onSubmit')();

    expect(submitSpy.mock.calls[0][0]).toEqual({firstname: 'Alan', coucou: 'salut'});
  });
});
