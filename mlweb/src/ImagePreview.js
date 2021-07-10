import React, { useContext, useState, useEffect } from 'react'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { MdAddAPhoto } from 'react-icons/md'

import Context from './Context'

const SingleImageUploadComponent = ({ num }) => {
  const { setFileName, testfilename, tempfilename } = useContext(Context)
  console.log(num)
  const [file, setfile] = useState(null)

  //   useEffect(() => {
  //     setfile(null)
  //   }, [])

  const uploadSingleFile = (e) => {
    // hideData()
    setfile(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
    let x = e.target.files[0].name
    console.log(e.target.files[0])
    setFileName(num, x)
    // showImage(x)
  }

  return (
    <form>
      <div
        style={{ width: '30vw', height: '40vh', backgroundColor: '#E2E2E2' }}
      >
        {file && (
          <img style={{ width: '30vw', height: '40vh' }} src={file} alt='' />
        )}
      </div>
      <div style={{ display: 'flex', marginTop: '-2.5vh' }}>
        <label htmlFor='fileupload'>
          <input
            type='file'
            id='fileupload'
            onChange={uploadSingleFile}
            //   style={{ display: 'none' }}
          />
          {/* <MdAddAPhoto style={{ color: '#000000' }} /> */}
        </label>
        {/* <button
          type='button'
          onClick={upload}
          style={{
            width: '15vw',
            height: '5vh',
            color: '#707070',
            border: '0.1px solid #707070',
            borderRadius: '0.2vw',
            outline: 'none',
            backgroundColor: '#fff',
            fontSize: '20px',
            marginLeft: '5.5vw',
            marginTop: '7vh'
          }}
          // onClick={() => showData()}
        >
          Submit
        </button> */}
      </div>
    </form>
  )
}

export default SingleImageUploadComponent
