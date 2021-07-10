import React, { useState } from 'react'
import { FiSettings } from 'react-icons/fi'

import ImagePreview from './ImagePreview'
import TopButtons from './TopButtons'
import ResultImage from './ResultImage'
import BottomPanel from './BottomPanel'
import './App.css'
import { ContextProvider } from './Context'

const body = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#7171BC'
}
const topPanel = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'absolute',
  marginLeft: '2vw',
  marginTop: '1vh',
  width: '95vw',
  height: '9vh',
  backgroundColor: '#1C2E4A',
  color: '#FFFFFF',
  fontSize: '2vw',
  textAlign: 'center',
  borderRadius: '0.5vw'
}
const imagePanel = {
  position: 'absolute',
  marginLeft: '2vw',
  marginTop: '11vh',
  width: '95vw',
  height: '50vh',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontSize: '2vw',
  borderRadius: '0.5vw',
  display: 'grid',
  gridGap: '0.2vw',
  gridTemplateColumns: 'auto auto auto',
  gridTemplateRows: '6vh 40vh',
  boxSizing: 'border-box',
  padding: '0.5vw'
}
const heading = {
  color: '#FFFFFF',
  backgroundColor: '#1C2E4A',
  fontSize: '2vw',
  textAlign: 'center'
}
const imageHolder = {
  width: '30vw',
  height: '40vh',
  marginLeft: '1vw',
  backgroundColor: '#FFFFFF'
}

function App() {
  return (
    <ContextProvider>
      <div style={body}>
        <div style={topPanel}>
          <TopButtons />
          <div style={{ left: '50vw', width: '40vw' }}>
            {' '}
            PCB DEFECT CLASSIFIER
          </div>
          <div style={{ marginLeft: '10vw' }}>
            <FiSettings />
          </div>
        </div>
        <div style={imagePanel}>
          <div style={heading}>TEST</div>
          <div style={heading}>TEMPLATE</div>
          <div style={heading}>RESULTS</div>

          <div style={imageHolder}>
            <ImagePreview num={1} />
          </div>
          <div style={imageHolder}>
            <ImagePreview num={2} />
          </div>
          <div style={imageHolder}>
            {' '}
            <ResultImage />
          </div>
        </div>
        <BottomPanel />
      </div>
    </ContextProvider>
  )
}

export default App
