import { CallReceived } from '@material-ui/icons'
import React, { useContext, useState } from 'react'
import Context from './Context'

const heading = {
  color: '#FFFFFF',
  backgroundColor: '#1C2E4A',
  fontSize: '2vw',
  textAlign: 'center'
}

const bottomPanel = {
  position: 'absolute',
  marginLeft: '2vw',
  marginTop: '63vh',
  width: '95vw',
  height: '37vh',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '2vw',
  borderRadius: '0.5vw',
  display: 'grid',
  gridGap: '0.2vw',
  gridTemplateColumns: '15vw 69vw 9vw',
  gridTemplateRows: 'auto auto auto auto auto auto',
  boxSizing: 'border-box',
  padding: '1vw'
}

function BottomPanel() {
  const { annotationsCount } = useContext(Context)
  console.log(annotationsCount)
  return (
    <div style={bottomPanel}>
      {' '}
      <div style={heading}>Open</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['1'] ? (
          <div
            id='progress1'
            style={{
              width: annotationsCount['1'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'red',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['1'] : null}
      </div>
      <div style={heading}>Short</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['2'] ? (
          <div
            id='progress2'
            style={{
              width: annotationsCount['2'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'yellow',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['2'] : null}
      </div>
      <div style={heading}>Mousebite</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['3'] ? (
          <div
            id='progress2'
            style={{
              width: annotationsCount['3'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'white',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['3'] : null}
      </div>
      <div style={heading}>Spur</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['4'] ? (
          <div
            id='progress4'
            style={{
              width: annotationsCount['4'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'red',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['4'] : null}
      </div>
      <div style={heading}>Copper</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['5'] ? (
          <div
            id='progress1'
            style={{
              width: annotationsCount['5'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'red',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['5'] : null}
      </div>
      <div style={heading}>Pin-hole</div>
      <div style={heading}>
        {annotationsCount && annotationsCount['6'] ? (
          <div
            id='progress1'
            style={{
              width: annotationsCount['6'] * 2,
              height: '1vh',
              margin: '0.7vw',
              backgroundColor: 'red',
              boxSizing: 'borderBox'
            }}
          ></div>
        ) : null}
      </div>
      <div style={heading}>
        {annotationsCount ? annotationsCount['6'] : null}
      </div>
    </div>
  )
}

export default BottomPanel
