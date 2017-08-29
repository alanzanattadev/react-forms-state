# react-forms-state

Library designed to make easy form management with React, in a semantic way.

## Use case

Forms in react are painful. You have choices between :
  - Using uncontrolled fields, which are very limited for advanced features (autocomplete, instant search, etc...)
  - handling onChange and value on each field, and merging manually data for having an immutable state
  - not doing forms.

The thing is manually handling form state can quickly lead to huge performance problem on big forms.
I wanted a way to make forms easily, seperating views (presenters) from data managment, and using semantic structure (as in raw HTML) without having performance issues.

It also add some convenient utils for handling validation, conversions and automatic prefilling.

## Guide

Wrap your root form component with FormController and StateDispatcher:
```js
import { FormController, StateDispatcher } from "react-forms-state";

function RootFormComponent({onSubmit, children}) {
  return (
    <div>
      {children}
      <button onClick={onSubmit}/>
    </div>
  );
}

const WrappedRootFormComponent = FormController()(StateDispatcher()(RootFormComponent));
```
Wrap some fields with StateProxy
```js
import { StateProxy } from "react-forms-state";

const WrappedTextField = StateProxy(TextField);
```
A field is a component which accepts value and onChange.

create a semantic structure by using the name props:
```js
<WrappedRootFormComponent onSubmit={(formValue) => console.log(formValue)} initial={{firstname: ""}}>
  <WrappedTextField name="firstname"/>
</WrappedRootFormComponent>
```

That's it :)

initial is the initial state of your form, when initial change, the dispatching of the new data is automatically done on the differents fields, allowing prefilling of data even after mounted.

onSubmit is passed as props to your root component and triggers the validation and conversion of data for you when you call it. You have to pass a onSubmit props to the FormController component to get the value once the user has submitted the form.

### Let's add conversions

In progress ...

### Let's add validation

FormController takes as fifth argument the validation function. This function has to return true if everything is ok, or differents types of error. To make things smoothers for you, a lot of utils are available. Let's dive into them:
  - notNull({errorString})
  - notUndefined({errorString})
  - notEmpty({errorString})
  - required({errorString}) which is notNull + notUndefined + notEmpty
  - isTrue({errorString})
  - maxLength(max, {errorString})
  - lessThan(accessor1, accessor2, {errorString}) where accessors are either function as (state) => value or string path "user.profile.name".
  - composeValidation(...validators) is a function that accepts many validators functions and returns a root one to be used directly in FormController validation function.
  
so for example
```js
FormController(undefined, undefined, undefined, undefined, composeValidation(notNull(), lessThan("user.birthday", "user.death")));
```

You can also compose with nested composeValidation:

```js
  const validation = composeValidation(composeValidation(notNull(), notUndefined()), isTrue());
```

Fields that have failed receive a validation prop. You can use this prop with two utils:
  - isValid
  - getErrorText
  
They are useful for displaying errors when necessary.
```js

import {isValid, getErrorText} from "react-forms-state";

function Field({value, onChange, validation}) {
  
  return (
    <div>
      <input value={value} onChange={onChange}/>
      {isValid(validation) === false && (<span>Error: {getErrorText(validation)}</span>)}
    </div>
  )
}

export default StateProxy()(Field);
```

### Let's use a form model to make things easier

Sometimes you have to deal with really big forms and doing conversions and validations for each field can be painful. That's why the library contains a model system to help you.

This model is a simple schema.

```js
const model = {
  user: {
    out: "user",
    profile: {
      out: "profile",
      email: {
        out: "email",
        validate: composeValidation(notNull(), notEmpty())
      }
    }
  }
};
```

the model structure depends on the initial structure, and the out attribut will allow you to create another structure after convertIn is called.
this is the capabilities of each object:
```js
export type ConversionModel = {
  out?: string,
  default?: ?any,
  convertIn?: (value: any, props: Object) => any,
  convertOut?: (value: any, props: Object) => any,
  validate?: validator,
  [key: string]: ConversionModel,
};
```

to use a model you have to convert it first to jobs with convertConversionModelToConversionJobs.
```js
import { convertConversionModelToConversionJobs } from "react-forms-state";

const jobs = convertConversionModelToConversionJobs(model);
```

then you can use the differents utils to use it with FormController
```js
import { convertIn, convertOut, validateModel } from "react-forms-state";

const Form = FormController(undefined, convertIn(jobs), convertOut(), undefined, composeValidation(validateModel(jobs)))(FormComponent);
```

And everything is magical !

## API Doc

### FormController

tl;dr: wrap the root dispatcher with that or the entire form and pass down props to the dispatcher.

FormController is a Higher Order Component which handles forms state for you. It lets you convert data to "form state" data, and to "external data" on submit.
It sends the state as value to the WrappedComponent through an Rx Observable (valueChangeObs) and get new value by passing onChange, as every react form fields.
The goal is to have a controlled form so you also have access to an applyControl function to let you control the data in fields. It handles a props 'initial' to let you prefill data, updating fields when initial value is updated to handle async prefilling of fields. It calls onSubmit when onSubmit is called on the wrapped component with the form state as parameter.

```javascript
  // React and components imports ...
  import {FormController} from 'react-forms-state';

  let Form = FormController(
    (state, props) => fromJS(state).update('name', state => state.toLowerCase()).toJS(), // Apply Control
    (value, props) => ({name: value.firstname}), // Convert In
    (value, props) => ({firstname: value.name}), // Convert Out
    {
      checkIfModified: true, // Checks if value has been modified to prevent repeated submits
      immutableInitial: false, // Speeds up checks by only checking reference equalities
    },
    (value, props) => true // Validation function
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

  - Options : checkIfModified to prevent repeated submits and immutableInitial to speed up equality checks.

  - Function that let you validate data before submitting, you have to return an object with the same structure as the state but with errors instead of value where there are errors. Others attributs can be undefined.

### StateDispatcher

tl;dr : wrap the root form component with that.

StateDispatcher is a Higher Order Component made to dispatch values to StateProxies using contexts, and providing methods to get / set values on ,marked as uncontrolled, components. It has to wrap the root Form Component. It's well handled by FormController.

```javascript
  // React and components imports ...
  import {StateDispatcher} from 'react-forms-state';

  let WrappedComponent = (props) => (<FormPresenter ref="input" valueChangeObs={props.valueChangeObs} onChange={props.onChange}/>);

  let Form = StateDispatcher({
    (value, props) => value, // Convert In
    (value, props) => value, // Convert Out
  })(WrappedComponent);
```

### StateProxy

tl;dr : wrap simple fields with that.

StateProxy is a Higher Order Component made to act as a marker which proxies values dispatched by the Dispatcher to the WrappedComponent, and providing methods to get / set values on , marked as uncontrolled, components. It can change the root value for the wrapped component if root is set as true.
Components are marked with a name props, and the name hierarchy is used to select the good value in the form state dispatched, the same for changing value onChange. Components marked as uncontrolled don't call onChange and don't use value, their value is get / set imperatively by the Dispatcher.

Uncontrolled values gotten imperatively have to be merged with controlled ones sent by onChange.

```javascript
import {StateDispatcher} from 'react-forms-state';

let WrappedComponent = (props) => (<input ref="input" type="text" value={props.value} onChange={e => props.onChange(e.target.value)}/>); // functional because of readability

let Field = StateProxy({
  root: false
}, {
  getValue: (child) => child.input.value,
  setValue: (child, value) => {child.input.value = value}
})(WrappedComponent);

// valueChangeObs will send {firstname: "Alan"}

let FormPresenter = (props) => (<Dispatcher valueChangeObs={props.valueChangeObs} ><Field name="firstname"/></Dispatcher>); // Field props value == "Alan"
----------------
let FormPresenter = () => (<Dispatcher ref="dispatcher" valueChangeObs={valueChangeObs} ><Field name="firstname" uncontrolled/></Dispatcher>); // Field props value == "Alan"
assert(FormPresenter.refs.dispatcher.getUncontrolledState() == {name: "Alan"});
FormPresenter.refs.dispatcher.dispatchUncontrolledValues({name: "Zanatta"});
assert(FormPresenter.refs.dispatcher.getUncontrolledState() == {name: "Zanatta"});
```

injects
  - value
  - onChange
  - validation : validation object, validation.infos leads to the error strings.

## StateInjector

StateInjector is a component that is used to get some value from form state in a component.

```javascript
const Comp = () => (
  import {StateInjector} from 'react-forms-state';

  <StateInjector watchPath={(props) => `group.${props.name}`}>
    {(value, props, {watchedStatePath, validation}) => (
      value.group.name && <div></div>
    )}
  </StateInjector>
)
```

```

Props:
  - watchPath : Path to the value, separated with dots (eg : "group.name"). Can also be a function (props) => statePath

Injected:
  - value : the entire form state
  - props : the others props sent to injector
  - options:
    - watchedStatePath : the computed watchPath
    - validation : validation object, valifation.infos leads to the error string
```
