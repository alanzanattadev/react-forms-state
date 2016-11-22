# react-forms-state

Library designed to make easy form managment with React, in a semantic way.

## Goal

Forms in react are painful. You have choices between :
  - Using uncontrolled fields, which are very limited for advanced features (autocomplete, instant search, etc...)
  - handling onChange and value on each field, and merging manually data for having an immutable state
  - not doing forms.

I wanted a way to make forms easily, seperating views (presenters) from data managment, and using semantic structure (as in raw HTML).

## FormController

FormController is a Higher Order Component which handles forms state for you. It lets you convert data to "state" data, and to "external data" on submit.
It sends the state as value to the WrappedComponent and get new value by passing onChange, as every react form fields.
The goal is to have a controlled form so you also have access to an applyControl function to let you control the data in fields. It handles a props 'initial' to let you prefill data, updating fields when initial value is updated to handle async prefilling of fields. It calls onSubmit when onSubmit is called on the wrapped component with the form state as parameter.

```javascript
  // React and components imports ...
  import {FormController} from 'react-forms-state';

  let Form = FormController(
    (state, props) => fromJS(state).update('name', state => state.toLowerCase()).toJS(),
    (value, props) => ({name: value.firstname}),
    (value, props) => ({firstname: value.name}),
  )(FormPresenter);

  let Page = () => <Form initial={cache.userInfos} onSubmit={(value) => postToServer(value)}/>;
```

params:
  - Function that let you control the form by modifying data in fields, called at each onChange, returning the new form state.
  ```javascript
    (state: any, props: any) => any
  ```

  - Function that let you convert data sent to the controller into data used in form.
  ```javascript
    (value: any, props) => any
  ```

  - Function that let you convert data sent to the onSubmit handler from form state value.
  ```javascript
    (value: any, props) => any
  ```

## StateDispatcher

StateDispatcher is a Higher Order Component made to dispatch values to StateProxies using contexts, and providing methods to get / set values on ,marked as uncontrolled, components. It has to wrap the root Form Component. It's well handled by FormController.

```javascript
  // React and components imports ...
  import {StateDispatcher} from 'react-forms-state';

  let WrappedComponent = (props) => (<FormPresenter ref="input" value={props.value} onChange={props.onChange}/>);

  let Form = StateDispatcher({
    (value, props) => value,
    (value, props) => value,
  })(WrappedComponent);
```

## StateProxy

StateProxy is a Higher Order Component made to act as a marker which proxies values dispatched by the Dispatcher to the WrappedComponent, and providing methods to get / set values on , marked as uncontrolled, components. It can change the root value for the wrapped component if root is set as true.
Components are marked with a name props, and the name hierarchy is used to select the good value in the form state dispatched, the same for changing value onChange. Components marked as uncontrolled don't call onChange and don't use value, their value is get / set imperatively by the Dispatcher.

Uncontrolled values gotten imperatively have to be merged with controlled ones sent by onChange.

```javascript
import {StateDispatcher} from 'react-forms-state';

let WrappedComponent = (props) => (<input ref="input" type="text" value={props.value} onChange={e => props.onChange(e.target.value)}/>); // functional because of readability

let Field = StateDispatcher({
  root: false
}, {
  getValue: (child) => child.input.value,
  setValue: (child, value) => {child.input.value = value}
})(WrappedComponent);

let FormPresenter = () => (<Dispatcher value={{name: "Alan"}} ><Field name="firstname"/></Dispatcher>); // Field props value == "Alan"
----------------
let FormPresenter = () => (<Dispatcher ref="dispatcher" value={{name: "Alan"}} ><Field name="firstname" uncontrolled/></Dispatcher>); // Field props value == "Alan"
assert(FormPresenter.refs.dispatcher.getUncontrolledState() == {name: "Alan"});
FormPresenter.refs.dispatcher.dispatchUncontrolledValues({name: "Zanatta"});
assert(FormPresenter.refs.dispatcher.getUncontrolledState() == {name: "Zanatta"});
```
