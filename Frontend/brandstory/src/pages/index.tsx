
import Navbar from "@/components/Navbar";
import { useState,useEffect } from "react";
import Editor from "@/components/Editor";
import BodyContent from "@/components/BodyContent";
import AdminConfiguration from "@/components/AdminConfiguration";
import { useRouter } from "next/navigation";
export default function Home() {

    const router=useRouter()
    useEffect(()=>{
      router.push('/main')
    },[])

  return (
    <>
      
      
    </>
  );
}
