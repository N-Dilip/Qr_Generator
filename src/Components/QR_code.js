import React, { useState } from 'react'
import "./QR_code.css"
export default function QR_Gen() {
  const [img,setImg]=useState("")
  const [load,setLoad]=useState(false);
  const [qrdata,setqrdata]=useState("");
  const [qrsize,setqrsize]=useState("150");
 async function generateQR()
  {
    setLoad(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    }catch(error)
    {
      console.error("Error generating QR code",error);
    }finally{
      setLoad(false);
    }
  }
  function downloadQR()
  {
    const value =prompt("enter the file Name");
    fetch(img).then((response)=>response.blob()).then((blob)=>{
      const link =document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download=`${value}.png`
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((err)=>{
      console.log("Error Downloading QR code"+err);
    })
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {load && <p>Pleas Wait...</p>}
      {img && <img src={img} className='qr-img' />}

       <div>
        <label for="dataInput" className='input-label'>Data for QR code:</label>
        <input type='text' id="dataInput" value={qrdata}  onChange={(e)=>setqrdata(e.target.value)} placeholder='Enter data for QR code ' required/>
        <label for="sizeInput" className='input-label' >Image size(eg: 150)</label>
        <input type='text' id="sizeInput" onChange={(e)=>setqrsize(e.target.value)} placeholder="Enter image size"/>
        <button className='generate' disabled={load} onClick={generateQR}>Generate QR Code</button>
        <button className='download' onClick={downloadQR}>Download QR Code</button>
       </div>
       <p className='footer'>Designed By <a href="">Amreth S</a></p>
    </div>
  )
}
 