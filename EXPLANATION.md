FormController
  |
    -> Dispatcher
          |
            -> Proxy
            -> Proxy
                |
                  -> Proxy
                        |
                          -> Dispatcher
                                |
                                  -> Proxy
                  -> Proxy
                        |
                          -> Proxy


FormController
  - root Observable
  - Submit handler
  - Merging controlled w/ uncontrolled data
  - handling initial
  - Convert In / Out
  - Applying Control
  - auto attaching to dispatcher

Dispatcher
  - Dispatching uncontrolled values
  - Convert In / Out
  - Dispatching throught context observables
  - auto attaching to controller
  - StateProxy wrapped

Proxy
  - Storing current field value
  - Providing handlers on field
  - Passing down value
  - Handling onChange
  - Computing StatePath
  - Handling Observable throught context
