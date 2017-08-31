# react-forms-state

Library designed to make easy form management with React, in a semantic and declarative way.

## Use case

Form management is painful, and handling big forms with validation, prefilling, conversions in and out, value propagation and modification handling can quickly become a hell. At some point the performances can even become a real issue if the whole form is re-rendered at every key typed. 

To make all those problematics easier to handle, I've created a set of Higher Order Components and utilities.
The library is used in production on forms of more than 50 fields on the same page with complete smoothness.

## Guide

Wrap your root form component with a Form.
```javascript
import { Form } from "react-forms-state";

function RootFormComponent({submit, children}) {
  return (
    <div>
      {children}
      <button onClick={submit}/>
    </div>
  );
}

const WrappedRootFormComponent = Form()(RootFormComponent);
```

The Form sends you a submit prop, that you have to call to trigger the submission of the data. This data will go through validation if there's one, and then will call the onSubmit prop that you passed to Form.

Wrap some fields with FormElement.
```javascript
import { FormElement } from "react-forms-state";

const WrappedTextField = FormElement()(TextField);
```
A field is a component which accepts value and onChange. FormElement will handle the propagation of value and of onChange event handling. It works with a semantic structure created from the FormElement component hierarchy. You create a hierarchy of FormElement and then you give them the elementName prop. The library builds a state with this exact same shape. You have to define an initial state value of this exact same shape, by sending the formInputValue prop. When this formInputValue prop is received the first time or is modified, the library handle the automatic prefilling of the fields with the new data, it can be useful when you fetch data on a server asynchronously.

```javascript
<WrappedRootFormComponent onSubmit={(formValue) => console.log(formValue)} formInputValue={{firstname: ""}}>
  <WrappedTextField elementName="firstname"/>
</WrappedRootFormComponent>
```

```javascript
  // if you have an entity User
  
  const user = {
    username: "",
    contact: {
      phone: ""
    }
  };
  
  // And you want to modify it, you will have a form
  
  const Field = FormElement()(({value, onChange}) => <input type="text" value={value} onChange={(e) => onChange(e.target.value)}/>);
  const Group = FormElement()(({children}) => <div>{children}</div>)
  
  // Group is only used to nest data. 
  
  const FormView = ({submit}) => (
    <div>
      <Field elementName="username"/>
      <div>
        <Group elementName="contact">
          <Field elementName="phone"/>
        </Group>
      </div>
      <button onClick={submit}>submit</button>
    </div>
  );
  
  // This way you can autoprefill
  
  const FormRoot = Form()(FormView);
  
  const MyForm = () => (
    <FormRoot formInputValue={user} onSubmit={newValue => { user = newValue }}/>
  )
```


That's it :)

### Let's add conversions

This library allow you to easily have a conversion from an input value to the form state shape, and the other way around. This is done through Form parameters.

```javascript
  import { Form } from "react-forms-state";

  const FormHOC = Form({
    convertIn: (value, props) => formState,
    convertOut: (formState, props) => newValue,
  });
```


### Let's add validation

Form also supports validation. It is possible with a validate function that has to return true if everything is ok, or differents types of error.
The validation is called when you call the submit function. If the validation fails, the onSubmit event is not triggered. To make things smoother for you, a lot of utils are available. Let's dive into them:
  - notNull({errorString})
  - notUndefined({errorString})
  - notEmpty({errorString})
  - required({errorString}) which is notNull + notUndefined + notEmpty
  - isTrue({errorString})
  - maxLength(max, {errorString})
  - lessThan(accessor1, accessor2, {errorString}) where accessors are either function as (state) => value or string path "user.profile.name".
  - composeValidation(...validators) is a function that accepts many validators functions and returns a root one to be used directly in Form validation function.
  
so for example
```javascript
  import { Form } from "react-forms-state";

  const FormHOC = Form({
    validate: composeValidation(notNull(), lessThan("user.birthday", "user.death"))
  });
```

composeValidation can be nested together, making validation really powerful.

```javascript
  const validation = composeValidation(
    composeValidation(
      notNull(),
      notUndefined()
    ),
    isTrue()
  );
```

Fields (components wrapped with FormElement) that have failed receive a validation prop. This prop can be used to change the color of the component on error for example, it's used with two utils:
  - isValid
  - getErrorText
  
```javascript

import {FormElement, isValid, getErrorText} from "react-forms-state";

function Field({value, onChange, validation}) {
  
  return (
    <div>
      <input value={value} onChange={onChange}/>
      {isValid(validation) === false && (<span>Error: {getErrorText(validation)}</span>)}
    </div>
  )
}

export default FormElement()(Field);
```

### Let's use a form model to make things easier

Sometimes you have to deal with really big forms and doing conversions and validations for each field can be painful. That's why the library contains a model system to help you.

This model is a simple schema.

```javascript
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

the model structure depends on the structure of the input value, and the out attribut will allow you to create the form shape after the convertIn util is called.

this is the capabilities of each object:
```javascript
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
```javascript
import { convertConversionModelToConversionJobs } from "react-forms-state";

const jobs = convertConversionModelToConversionJobs(model);
```

then you can use the differents utils with Form. The library provides three important utils for working with model:
  - convertIn
  - convertOut
  - validateModel
  
They all have the signature util(jobs)(value, props).

```javascript
import { Form, convertIn, convertOut, validateModel } from "react-forms-state";

const FormRoot = Form({
  convertIn: convertIn(jobs),
  convertOut: convertOut(jobs),
  validate: composeValidation(validateModel(jobs))
})(FormComponent);
```

And everything is magical ! No, it's not. It only automates this painful selection of data and manipulation for you.

## API Doc

### Form

Form is a Higher Order Component which handles forms state for you. It lets you convert data from external value to "form state" data and the other way around. It also helps you with validation and prefilling of the fields.


```javascript
  // React and components imports ...
  import {Form} from 'react-forms-state';

  let Form = Form({
    convertIn: (value, props) => ({name: value.firstname}), // Convert In
    convertOut: (formState, props) => ({firstname: formState.name}), // Convert Out
    checkIfModified: true, // Checks if value has been modified to prevent repeated submits, default false.
    immutableInitial: false, // Speeds up checks by only checking reference equalities, default false.
    applyControl: (state, props) => fromJS(state).update('name', state => state.toLowerCase()).toJS(), // Apply Control
    (value, props) => true // Validation function, default always true.
  })(FormPresenter);

  let Page = () => <Form formInputValue={cache.userInfos} onSubmit={(value) => postToServer(value)}/>;
```

### FormElement

tl;dr : wrap simple fields with that.

FormElement is a Higher Order Component made to act as a marker which proxies values dispatched by the Form to the WrappedComponent. It handles field value selection and dispatching of onChange event.
Components are identified with the elementName props, and the elementName hierarchy is used to select the good value in the form state dispatched, the same for changing value onChange. Components marked as uncontrolled don't call onChange and don't use value, their value is get / set imperatively by the Dispatcher. Uncontrolled values gotten imperatively have to be merged with controlled ones sent by onChange.

```javascript
import { FormElement } from 'react-forms-state';

let InputField = (props) => (<input ref="input" type="text" value={props.value} onChange={e => props.onChange(e.target.value)}/>);

let Field = FormElement({
  getUncontrolledValue: (child) => child.input.value, // Handling fetching of data of uncontrolled version of the wrapped component
  setUncontrolledValue: (child, value) => {child.input.value = value}, // Handling update of data of uncontrolled version of the wrapped component
  root: false // Defines this as a root element to change the selection method. Used internally.
})(InputField);

let FormPresenter = (props) => (<div><Field elementName="firstname"/></div>); // Field props value == "Alan"
----------------
let FormPresenter = (props) => (<div><Field elementName="firstname" uncontrolled/></div>); // Field props value == "Alan"
```

It injects to the wrapped component.
  - value: the value of the field.
  - onChange: the onChange handler.
  - validation: validation object, validation.infos leads to the error strings.


## FormWatcher

Sometimes it can be useful to know the value of one of the attributs of the form state. For example you may want to display a part of the form only if one checkbox is checked. FormWatcher is used in those specific cases. It can also be useful for displaying a toast or a notification in case of validation failure.  

The big pro of using a FormWatcher is that it will rerender only if the watched value change, so it increases drastically performances. For this reason, it's the only way of getting a value of the form state. Let's force everyone to keep good performances (You can however watch "" and it will rerender everytime, but you won't).

```javascript
  import {FormWatcher} from 'react-forms-state';

  <FormWatcher watchPath={(parentPath) => `${parentPath}.group.name`}>
    {({
      watchedStatePath, // watched path
      validation, // global form validation value
      watchedValidation, // validation value of the watched element, selected with the watchPath prop
      value, // Global form state value
      watchedValue, // Watched value, selected with the watchPath prop
    }, props) => (
      watchedValue && <div></div>
    )}
  </FormWatcher>
```

Props:
  - watchPath : Path to the value, separated with dots (eg : "group.name"). Can also be a function (parentPath) => statePath. parentPath is the state path made by the parent components of FormWatcher. It's used to avoid rewriting the entire path when the FormWatcher is nested in the component hierarchy.

### StateDispatcher (Used internally)

StateDispatcher is a Higher Order Component made to dispatch values to FormElement using context, and providing methods to get / set values on ,marked as uncontrolled, components. It has to wrap the root Form Component (the Form HOC does this for you).

```javascript
  // React and components imports ...
  import {StateDispatcher} from 'react-forms-state';

  let WrappedComponent = (props) => (<FormPresenter ref="input" valueChangeObs={props.valueChangeObs} onChange={props.onChange}/>);

  let Form = StateDispatcher({
    (value, props) => value, // Convert In
    (value, props) => value, // Convert Out
  })(WrappedComponent);
```

## Migrate from v2 to v3

FormController(..., ..., ...) -> Form({..., ..., ...})
  - wrapped component received onSubmit -> wrapped component receives submit
  - initial -> formInputValue
StateProxy(options, uncontrolledConfig) -> FormElement({..., ...})
  - name -> elementName
StateInjector -> FormWatcher, it now takes a children function like: ({value, watchedValue}, props) => React.Element
StateDispatcher -> now included into FormController
FormModel:
  - convertIn(value, jobs, props) => convertIn(jobs)(value, props)
  - convertOut(value, jobs, props) => convertOut(jobs)(value, props)

## Thank you

Charles Cote for having created the Form model pattern.
