
import React, { useState } from 'react';
import '../styles/admin.css'


const AdminConfiguration: React.FC = ({popupTrigger}) => {
   
    const buttonHandler=(value)=>{
      
        popupTrigger(value)


    }
  return (
   <div className='adminMenu'>
      <button onClick={()=>{buttonHandler('navmenu')}}>Add Nav Menu</button>
      <button onClick={()=>{buttonHandler('contents')}}>Add New Contents</button>
   </div>
  );
};

export default AdminConfiguration;
