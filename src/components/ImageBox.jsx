export default function ImageBox({src}){

    return(
        <div className="image-box">
            <img src={src} alt="" />
        </div>
    )
}

// export default function ImageBox({ src }) {
//     return (
//       <div className="image-box">
//         <img src={URL.createObjectURL(src)} alt="" />
//       </div>
//     );
//   }