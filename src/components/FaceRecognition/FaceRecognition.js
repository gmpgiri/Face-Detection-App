import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box})=>{
    return(
        <div className='center ma'>
            <div className="absolute mt2">
               <img 
                id='inputImage'
                alt='image provided by user' 
                src ={imageUrl}
                width='500px' heigh='auto'
                /> 
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottom, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;