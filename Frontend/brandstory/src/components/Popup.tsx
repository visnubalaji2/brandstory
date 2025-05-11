
import React, { useState } from 'react';


import '../styles/popup.css'
import '../styles/form.css'
type FieldType = "text" | "checkbox";

type FieldConfig = {
  type: FieldType;
  label: string;
};

type PopupProps = {
  configs: FieldConfig[];
  submitFormData: (formData: Record<string, any>) => void;
};



const Popup: React.FC<PopupProps> = ({configs,submitFormData}) => {
    const [formState, setFormState] = useState<Record<string, any>>({});
    const [showSubItems, setShowSubItems] = useState(false);
    const handleChange = (label: string, value: any) => {
        if (label === 'Image' && value instanceof File) {
            const reader = new FileReader();
            console.log(reader.result,"result")
            reader.onloadend = () => {
              setFormState((prev) => ({
                ...prev,
                [label]: reader.result, 
              }));
            };
            reader.readAsDataURL(value); // converts to base64
          } else {
            setFormState((prev) => ({
              ...prev,
              [label]: value,
            }));
          }
  
      if (label === "Does Menu have subItems") {
        setShowSubItems(value);
      }
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault(); 

        submitFormData(formState)

      };
  return (
    <>
       <div className="popup-content">
         <span className="popup-close" ></span>
         <form className="custom-form" onSubmit={submitHandler}>
  {configs.map((field) => {
    if (
      (field.label === "Sub Item Name" || field.label === "Hyperlink") &&
      !showSubItems
    ) {
      return null;
    }

    return (
      <div key={field.label} className="form-field">
        <label className="form-label">{field.label}</label>

        {field.type === "text" ? (
          <input
            type="text"
            value={formState[field.label] || ""}
            onChange={(e) => handleChange(field.label, e.target.value)}
            className="form-input"
          />
        ) : field.type === "checkbox" ? (
          <input
            type="checkbox"
            checked={!!formState[field.label]}
            onChange={(e) => handleChange(field.label, e.target.checked)}
            className="form-checkbox"
          />
        ) : field.type === "file" ? (
          <input
            type="file"
            onChange={(e) => handleChange(field.label, e.target.files?.[0] || null)}
            className="form-file"
          />
        ) : null}
      </div>
    );
  })}
  <button className="form-submit-button" type="submit">Submit</button>
</form>

  
       </div>



       
   
     
</>
  );
};

export default Popup;
