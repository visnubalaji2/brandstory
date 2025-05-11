
import React, { useEffect, useState } from 'react';
import '../styles/bodycontent.css'
import Popup from './Popup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../styles/popup.css'

type BodyContentConfig = {
    type: string;
    label: string;
    key?: string;
  };
const BodyContent: React.FC = ({showPopup,popUpTrigger,closePopup}) => {
    const [contents,setContents]=useState([])
    const [refresh,setRefresh]=useState(false)
    const bodyContentConfigs: BodyContentConfig[] = [
        {
          type: 'text',
          label: 'Heading',
          key: 'heading',
        },
        {
          type: 'text',
          label: 'Content',
          key: 'content',
        },
        {
          type: 'file',
          label: 'Image',
          key: 'image_src',
        },
      ];
const postData=async (data)=>{
    data['src']=uuidv4()+'.png';
    try {
      const response = await axios.post('http://localhost:3001/api/contents', data, {
      });
      setRefresh(!refresh)
      closePopup(false)
      console.log("Upload success:", response.data);
    } catch (error) {
      console.error("Upload error:", error);
    }

}

const getContents=async ()=>{
    const data=await axios.get('http://localhost:3001/api/contents')
    setContents(data.data)
    
}

useEffect(()=>{  
    getContents()
},[refresh])
const [currentIndex, setCurrentIndex] = useState(0);

const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
    <div className="bodyContent">
    {contents.length > 0 && (
      <>
        <div className="content-wrapper">
          <div className="contents">
            <h1>{contents[currentIndex]['heading']}</h1>
            <p className='contentpara'>{contents[currentIndex]['content']}</p>
            <p className='sales'>Talk To Sales</p>
          </div>
          <div className="image">
            <img src={"./" + contents[currentIndex]['image_src']} alt="Agency Visual" />
          </div>
        </div>
  
        <div className="line-pagination">
          {contents.map((_, index) => (
            <div
              key={index}
              className={`line ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      </>
    )}
  </div>
  {showPopup && popUpTrigger === 'contents' && (
        <div className="popup open">
          <div className="popup-content">
            <span className="popup-close" onClick={() => {closePopup(false)}}>&times;</span>
            <Popup configs={bodyContentConfigs} submitFormData={postData} />
          </div>
        </div>
      )}


</>
  
  );
};

export default BodyContent;
