'use babel'
// @flow

import React from 'react';
import { shallow, mount } from 'enzyme';
import StateProxy from './StateProxy';

describe('StateProxy', () => {
  it('should have a props _inputField', () => {
    let Component = StateProxy(class extends React.Component { render() { return (<div></div>) } });
    let subject = mount(<Component/>);

    expect(subject.prop('_inputField')).toBe(true);
  });
});
