import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8);
  const [cap, setCap] = useState(true);
  const [small, setSmall] = useState(true);
  const [num, setNum] = useState(true);
  const [char, setChar] = useState(true);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);
  const imgRef = useRef(null);

  //useCallBack lets you cache function definition between re-renders
  const passwordGenerator = useCallback(() => {
    let str = "";
    let pass = "";

    if (cap) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (small) str += 'abcdefghijklmnopqrestuvwxyz';
    if (num) str += '0123456789';
    if  (char) str += '!@#$%^&*+=-_({}[])~';

    for(let i = 0; i<length; i++){
      let n = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(n);
    }

    setPassword(pass);
    checkboxPass();

  }, [length, cap, small, num, char, setPassword]);

  const copyFun = () => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    passwordGenerator();
    checkboxPass();
    imgPass();
  }, [length, cap, small, num, char, passwordGenerator])

  function checkboxPass(){
    let checkedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked');
    if(checkedCheckboxs.length===1){
        checkedCheckboxs[0].disabled = true;
    }
    else{
        for(let i = 0; i<checkedCheckboxs.length; i++){
            checkedCheckboxs[i].disabled = false;
        }
    }
}
function imgPass(){
  const immg = document.getElementById('imgId');
  if(length<=3) immg.src = './src/assets/download (4).svg';
  else if(length>3 && length<=5) immg.src = './src/assets/download (3).svg';
  else if(length>5 && length<=7) immg.src = './src/assets/download (2).svg';
  else if(length>7 && length<=10) immg.src = './src/assets/download (1).svg';
  else immg.src = './src/assets/download.svg';
}

  return (
    <>
      <div className='bg-red-100 w-full h-screen flex justify-center items-center flex-col'>
        <div className='text-center text-[#071D2B]'>
          <h1 className='font-bold text-5xl font-mono p-2 mb-3'>Random Password Generator</h1>
          <p>Create strong and secure passwords to keep your account safe online.</p>
        </div>
        <div className='flex justify-evenly items-center w-3/4 '>
          <div>
            <img id='imgId' src="./src/assets/download (1).svg" alt="v-strong" />
          </div>
          <div className=' h-full w-1/2 flex flex-col justify-evenly items-center'>
            <div className='w-2/3 flex justify-between items-center'>
              <input className='px-4 py-3 text-xl rounded-full w-[80%] outline-none' ref={passRef} placeholder='password' value={password} readOnly type="text" />
              <button className='bg-blue-400 px-4 py-3 hover:bg-blue-500 hover:-translate-y-1 transition-all linear text-white font-bold text-xl rounded-full' onClick={copyFun}>Copy</button>
            </div>
            <div className='w-2/3 flex justify-between items-center '>
              <label className='text-xl font-bold' htmlFor="length-input">Password Length : {length}</label>
              <input type="range" name="length-input" className='cursor:pointer' min={1} max={15} value={length} onChange={(e) => {setLength(e.target.value)}} id="length-input" />
            </div>
            <div className='flex w-2/3 justify-between items-center'>
              <p className='text-xl font-bold'>Characters Used : </p>
              <input className='cursor-pointer' type="checkbox" defaultChecked={cap} onChange={() => {setCap((prev) => !prev)}} name="cap-input" id="cap-input" />
              <label htmlFor="cap-input">ABC</label>
              <input className='cursor-pointer' type="checkbox" defaultChecked={small} onChange={() => {setSmall((prev) => !prev)}} name="small-input" id="small-input" />
              <label htmlFor="small-input">abc</label>
              <input className='cursor-pointer' type="checkbox" defaultChecked={num} onChange={() => {setNum((prev) => !prev)}} name="num-input" id="num-input" />
              <label htmlFor="num-input">123</label>
              <input className='cursor-pointer' type="checkbox" defaultChecked={char} onChange={() => {setChar((prev) => !prev)}} name="char-input" id="char-input" />
              <label htmlFor="char-input">@#$</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
