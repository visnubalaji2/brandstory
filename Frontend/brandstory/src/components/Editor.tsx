
import React, { useState } from 'react';

import '../styles/Navbar.css'
import Popup from './Popup';

type FieldType = "text" | "checkbox";

type FieldConfig = {
    type: FieldType;
    label: string;
  };
  
type EditorProps = {
    title: string;
    configs:FieldConfig[];
    passData: (formData: Record<string, any>) => void;
  };



const Editor: React.FC<EditorProps> = ({title,configs,passData}) => {
    const passDataToMain = (data: Record<string, any>) => {
        passData(data);
      };
  return (
    <>
     <div className="editor" style={{backgroundColor:"white"}}>
            <img src='./pencil.svg'/>
     </div>
     {title=='navbar' && (
        <Popup configs={configs} submitFormData={passDataToMain}/>

     )}
   
     
</>
  );
};

export default Editor;
