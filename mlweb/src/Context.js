import React, { useState } from 'react'

const initialContext = {
  isPopupVisible: false,
  showPopupModel: () => {},
  hidePopupModel: () => {},
  testfilename: '',
  tempfilename: '',
  resultfilename: '',
  annotationsCount: null,
  clearFileName: () => {},
  setFileName: () => {},
  setAnnotationsCount: () => {}
}

const Context = React.createContext(initialContext)

const { Provider, Consumer } = Context

export const ContextProvider = ({ children }) => {
  const [value, setValue] = useState({
    isPopupVisible: false,
    testfilename: '',
    tempfilename: '',
    resultfilename: '',
    annotationsCount: null
  })
  const clearFileName = () => {
    setValue((value) => ({
      ...value,
      testfilename: '',
      tempfilename: ''
    }))
  }
  const setFileName = (num, name) => {
    if (num === 1)
      setValue((value) => ({
        ...value,
        testfilename: name
      }))
    else if (num === 2)
      setValue((value) => ({
        ...value,
        tempfilename: name
      }))
    else if (num === 3)
      setValue((value) => ({
        ...value,
        resultfilename: name
      }))
  }
  const showPopupModel = () => {
    setValue((value) => ({
      ...value,
      isPopupVisible: true
    }))
  }
  const hidePopupModel = () => {
    setValue((value) => ({
      ...value,
      isPopupVisible: false
    }))
  }
  const setAnnotationsCount = (val) => {
    setValue((value) => ({
      ...value,
      annotationsCount: val
    }))
  }
  return (
    <Provider
      value={{
        ...value,
        showPopupModel,
        hidePopupModel,
        clearFileName,
        setFileName,
        setAnnotationsCount
      }}
    >
      {children}
    </Provider>
  )
}

export const ContextConsumer = Consumer

export default Context
