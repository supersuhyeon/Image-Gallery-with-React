import { useCallback, useState } from 'react';
import { useRef } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';
import {useDropzone} from 'react-dropzone'


function App() {

  const inpRef = useRef()
  const [imageList, setImageList] = useState([])
console.log(imageList)
  const onDrop = useCallback((acceptedFiles)=>{
              if(acceptedFiles){
                for(const file of acceptedFiles){
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = (e)=>{
                    setImageList((imageList)=>{return [...imageList, e.target?.result]})
                }}
                }
                
  },[])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
  <section className="container-box">
        <div className={"initial-box " + (imageList.length > 0 && 'row')}>
          {
            imageList.length === 0 && <div className="text-center">
            there is no image <br/>
            please add some images
        </div>
          }

            {
              imageList.map((image, index)=>{return <ImageBox key={image + index} src={image}></ImageBox>})
              
            }
            <div className="plus-box" {...getRootProps()} 
            >
              <input type="file" ref={inpRef}
              {...getInputProps()}
            />

                +
            </div>

        </div>
  </section>
  );
}

export default App;
