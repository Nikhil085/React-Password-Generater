import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(0);
  const [NumAllowed, setNumAllowed] = useState(false);
  const [CharAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");


  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(NumAllowed) str += "0123456789"
    if(CharAllowed) str += "!@#$%^&*(){}~`"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, CharAllowed, NumAllowed, setPassword])

  useEffect(() => {

  passwordGenerator();

  } ,[length, NumAllowed, CharAllowed,passwordGenerator]); 


  return (
    <>
      <h2>Password Generator</h2>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <div className='box'>
          <input type='text'
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div style={{width:"20px", display:"flex", flexDirection:"row"}}>
          <div className=''>
            <input
            type='range'
            min={6}
            max={100}
            value={length}
            className='cursore-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          
        </div>
        <div style={{marginTop:"10px"}}>
             <input
             style={{width:"30px"}}
             type='checkbox'
             defaultChecked={NumAllowed}
             id='numAllowed'
             onChange={() => setNumAllowed((prev) => !prev)}
             />
             <label style={{textAlign:"center"}}>Number</label>
          </div>
          <div style={{marginTop:"10px", display:"inline-block"}}>
             <input
             style={{width:"30px"}}
             type='checkbox'
             defaultChecked={CharAllowed}
             id='charAllowed'
             onChange={() => setCharAllowed((prev) => !prev)}
             />
             <label style={{textAlign:"center"}}>Charcter</label>
          </div>
        </div> 
    </>
  )
}

export default App
