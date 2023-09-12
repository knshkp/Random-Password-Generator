import { useState,useCallback,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAll,setNumberAll]=useState(false);
  const [charAll,setCharAll]=useState(false);
  const[passwd,setpasswd]=useState("");
  const passwordRef=useRef(null)
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAll) str+="0123456789"
    if(charAll) str+="!@#$%&*?~"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }  
    setpasswd(pass); 
  },[length,numberAll,charAll,setpasswd])
  const copyPasswordToClipBoard=useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(passwd);
  },[passwd])
  useEffect(()=>{passwordGenerator()},[length,numberAll,charAll,passwordGenerator]  )

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex text-center shadow rounded-lg overflow-hidden mb-8 my-8'>
      <input type="text" value={passwd} className='outline-none w-full py-1 px-3' placeholder='passwd' readOnly ref={passwordRef}></input>
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>Copy</button> 
    </div>
    <div className='flex test-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label >Length:{length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input type="checkbox" defaultChecked={numberAll} id="numberInput" onChange={()=>{setNumberAll((prev)=>!prev);}}/>
      <label >Number</label>
      <input type="checkbox" defaultChecked={charAll} id="charInput" onChange={()=>{setCharAll((prev)=>!prev);}}/>
      <label >Characters</label>
      </div> 
    </div>
    </div>
    </>
  )
}

export default App
