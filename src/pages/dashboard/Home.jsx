import React from 'react'
import { useEffect } from 'react'

export default function Home() {

  useEffect(() => {
    console.log("Home");
  },[])

  return (
    <div className=' w-full h-full'>
      Home
    </div>
  )
}
