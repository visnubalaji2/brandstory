
import Navbar from "@/components/Navbar";
import { useState } from "react";
import Editor from "@/components/Editor";
import BodyContent from "@/components/BodyContent";
import AdminConfiguration from "@/components/AdminConfiguration";
import { useRouter } from "next/router";
export default function Home() {

    const router=useRouter()
    console.log(router.query)
    const role=router.query.role
  const [popupVal,setPopupVal]=useState('')
  const [showPopupValue,setShowPopup]=useState(false)
  const popUpValueTrigger=(val)=>{
    console.log(val,"in home")
    setPopupVal(val)
    setShowPopup(true)
  }

  const closePopupFunction=(val)=>{
    setShowPopup(false)
  }

  return (
    <>
      <Navbar popUpTrigger={popupVal} showPopup={showPopupValue} closePopup={closePopupFunction}/>
      <BodyContent popUpTrigger={popupVal}  showPopup={showPopupValue} closePopup={closePopupFunction}/>
      {role==='admin' && (<AdminConfiguration  popupTrigger={popUpValueTrigger} />)}
      
    </>
  );
}
