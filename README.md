## Image Gallery

![ezgif com-crop (3)](https://user-images.githubusercontent.com/94214512/219823640-452bde6e-e8db-4132-9fab-6065e6fa19f7.gif)<br>
this is a simple gallery that a user can add photos to.

### Goals of the project

1. Make an image gallery that a user can upload some pictures that they want
2. use a [React-dropzone](https://react-dropzone.js.org/) for better ux

### Languages

React

### Features

**1. FileReader**

1. input[type=file] has properties like value, accept, capture, files, and multiple<br>

- value [DOMString] : File path
- accept [MIME] : Acceptable file types
- capture [string]: How to capture a file
- multiple [boolean] : Whether to select multiple files
- files [FileList] : Selected files

2. how to use FileReader <br>

1. create a FileReader object using new

```js
const fr = new FileReader();
```

2. After creating a FileReader object, call one of the following four functions of FileReader to read a File or Blob and store it in the result property. <br>

- readAsText(): Reads the contents of the file object as text. The content of the file is entered as a string value in the result property.
- readAsDataURL(): Reads a file object and converts it to a data URL representation.
- readAsArrayBuffer(): Reads the contents of a file object into an array buffer.
- readAsBinaryString(): Reads the contents of the file object as a bit string.

3. use FileReader's eventhandler and get the data

- onload : It occurs whenever a read operation completes successfully.
- onerror : onerror occurs whenever an error occurs in the read operation.
- onabort : onabort occurs whenever a read operation is aborted.
- onloadstart: Occurs whenever onloadstart read operation is executed.
- onloadend : Occurs whenever a read operation is completed. (it works regardless of read success or failure)
- onprogress : Called while reading content
  <br>

4. apply FileReader to my project

```js
//ImageBox.jsx
export default function ImageBox({ src }) {
  return (
    <div className="image-box">
      <img src={src} alt="" />
    </div>
  );
}
```

```js
//App.js
function App() {
  const inpRef = useRef();
  const [imageList, setImageList] = useState([]);

  return (
    <section className="container-box">
      <div className={"initial-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            there is no image <br />
            please add an image
          </div>
        )}

        {imageList.map((image, index) => {
          return <ImageBox key={image + index} src={image}></ImageBox>;
        })}
        <div
          className="plus-box"
          onClick={() => {
            inpRef.current?.click();
          }}
        >
          <input
            type="file"
            multiple={true}
            ref={inpRef}
            onChange={(e) => {
              if (e.target.files) {
                for (const file of e.target.files) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onloadend = (e) => {
                    setImageList((imageList) => {
                      return [...imageList, e.target?.result];
                    });
                  };
                }
              }
            }}
          />
          +
        </div>
      </div>
    </section>
  );
}
```

**2. FileReader.readAsDataURL** vs **URL.createObjectURL** <br>
I knew about these two for image src to preview but wasn't sure about how they were different. I made this project in order to learn more about the difference.

1. Difference <br>

- Memory :
  <img width="1082" alt="Screenshot 2023-02-17 at 4 16 38 PM" src="https://user-images.githubusercontent.com/94214512/219821788-ee98bafc-21e1-475a-824f-11e4a093c91f.png"> <br>
  This is base64 string from FileReader. Since the length of the converted string is very long, the readability is poor and the larger the image file size, the longer it takes to render the text itself on the screen.<br>
  <img width="325" alt="Screenshot 2023-02-17 at 4 51 21 PM" src="https://user-images.githubusercontent.com/94214512/219822450-0dc4300f-e300-4459-8b29-60b96e1285c8.png"><br>
  On the other hand, the creatObjectURL string is simple. These two occupy the memory of the page unitl a page(document) is terminated. However, since unused URL can be removed by using revokeObjectURL() directly from memory, URL API's memory management is more efficient.

  **_what is blob?_** <br>
  In JavaScript, Blob (Binary Large Object) can be used to handle multimedia data such as images, sound, and video.
  It is usually used for tasks such as finding out the size (byte) and MIME type of data, or dividing data into small blob objects for sending and receiving. <img width="685" alt="Screenshot 2023-02-17 at 3 24 26 PM" src="https://user-images.githubusercontent.com/94214512/219815871-ef1798d3-0dec-4b6b-9b40-1fae211ae27b.png"> <br>A File object (from input type="file") is also a Blob object with name and lastModifiedDate properties.

- Speed & convenience :
  The FileReader method goes through a lot of work until it reads File and Blob objects and converts them into base64 strings (read, load, result), and it has the inconvenience of having to be processed asynchronously. On the other hand, the createObjectURL method operates synchronously and immediately creates unique URLs for File and Blob objects (it does not need to go through the reading process).

- Capacity :<br>
  ![download](https://user-images.githubusercontent.com/94214512/219819416-41911f53-08ce-48e5-8d4c-b7740e2b580b.png) <br>
  In the case of the FileReader method, it is said that a capacity of about 10mb can be accommodated, and the createObjectURL method can accommodate up to about 800mb, which is close to the maximum value of a blob.

2. apply URL.createObjectURL to my project

```js
export default function ImageBox({ src }) {
  return (
    <div className="image-box">
      <img src={URL.createObjectURL(src)} alt="" />
    </div>
  );
}
```

```js
function App() {
  const inpRef = useRef();
  const [imageList, setImageList] = useState([]);
  console.log(imageList);

  return (
    <section className="container-box">
      <div className={"initial-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            there is no image <br />
            please add an image
          </div>
        )}

        {imageList.map((image, index) => {
          return <ImageBox key={image + index} src={image}></ImageBox>;
        })}
        <div
          className="plus-box"
          onClick={() => {
            inpRef.current?.click();
          }}
        >
          <input
            type="file"
            ref={inpRef}
            multiple={true}
            onChange={(e) => {
              if (e.target.files) {
                for (const file of e.target.files) {
                  setImageList((imageList) => {
                    return [...imageList, file];
                  });
                }
              }
            }}
          />
          +
        </div>
      </div>
    </section>
  );
}
```

**3. use react-dropZone to make better UX**

1. install react-dropZone library

```js
yarn add react-dropzone
```

2. official website's example

```js
import React from "react";
import Dropzone from "react-dropzone";

<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
  {({ getRootProps, getInputProps }) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>;
```

- acceptedFiles : Uploaded file information (file name, path, size, type, etc.) is included in acceptedFiles and file-related processing is performed. <br>
- 2props : react-dropzone has two props, namely getRootProps and getInputProps. These two props are functions that return an object with properties needed to create a drag and drop zone.

  1)getRootProps : getRootProps is put in the tag to create the drag and drop zone, and the event handling declaration for the drag and drop zone is included. If you want to add other properties to getRootProps, you must pass them through getRootProps() instead of handling them separately.

  2)getInputProps : getInputProps goes inside the input tag under the tag to create the drag and drop zone and contains the properties for the input.

3. apply this to my project

```js
function App() {
  const inpRef = useRef();
  const [imageList, setImageList] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setImageList((imageList) => {
            return [...imageList, e.target?.result];
          });
        };
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <section className="container-box">
      <div className={"initial-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            there is no image <br />
            please add an image
          </div>
        )}
        {imageList.map((image, index) => {
          return <ImageBox key={image + index} src={image}></ImageBox>;
        })}
        <div className="plus-box" {...getRootProps()}>
          <input type="file" ref={inpRef} {...getInputProps()} />+
        </div>
      </div>
    </section>
  );
}
export default App;
```

### Reference Links

[Difference between createObjectURL and FileReader](https://stackoverflow.com/questions/31742072/filereader-vs-window-url-createobjecturl)<br>
[blob](https://heropy.blog/2019/02/28/blob/) <br>
[URL.createObjectURL()](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL)<br>
[FileReader](https://mieumje.tistory.com/m/164)

### Self-reflection

It was good to learn about and practice the fundamentals.
