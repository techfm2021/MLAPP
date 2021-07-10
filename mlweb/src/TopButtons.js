import React, { useContext, useState } from 'react'
import Context from './Context'
import axios from 'axios'
const URL = 'http://127.0.0.1:5000/predict'

const TopButtons = () => {
  const {
    clearFileName,
    testfilename,
    tempfilename,
    resultfilename,
    setFileName,
    setAnnotationsCount
  } = useContext(Context)

  const button = {
    width: '11vw',
    height: '7vh',
    margin: '0.7vw'
  }
  const upload = (e) => {
    setFileName(3, 'loading')

    if (testfilename && tempfilename) {
      console.log(testfilename)
      console.log(tempfilename)
      axios
        .post(
          URL,
          {
            template: tempfilename,
            test: testfilename
          },
          null
        )
        .then((res) => {
          console.log(res.data)
          if (res.data.status === 'success') {
            setFileName(3, res.data.output_path)
            setAnnotationsCount(res.data.annotations_count)
            console.log(resultfilename)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      //   showWarningPopupModel()
    }
  }
  const refresh = (e) => {
    setFileName(3, '')
    setFileName(1, '')
    setFileName(2, '')
  }

  return (
    <>
      <button style={button} onClick={upload}>
        Run Pipeline
      </button>
      {/* <button style={button} onClick={refresh}>
        Refresh
      </button> */}
    </>
  )
}
export default TopButtons
