import React, { useContext, useState, useEffect } from 'react'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { MdAddAPhoto } from 'react-icons/md'
import op from './output/output.png'
import loader from './loader.gif'

import Context from './Context'

const ResultImage = () => {
  const { setFileName, resultfilename } = useContext(Context)
  const [file, setfile] = useState(null)

  //   useEffect(() => {
  //     setfile(null)
  //   }, [])

  return (
    <div style={{ width: '30vw', height: '40vh', backgroundColor: '#FFFFFF' }}>
      {resultfilename === 'loading' ? (
        <img style={{ width: '29vw', height: '37vh' }} src={loader} alt='' />
      ) : (
        <img style={{ width: '30vw', height: '40vh' }} src={op} alt='' />
      )}
    </div>
  )
}

export default ResultImage
