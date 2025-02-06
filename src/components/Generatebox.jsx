import React, { useState, useEffect, useCallback, useRef } from "react";

export default function Generatebox() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");



  const generatePassword = useCallback(() => {
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "#@!$&*/+-<>";
    }
    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charAllowed, length, setPassword]);


  // Copy button
  const passwordRef = useRef(null)
  const copyToClipboard =()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
}

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);


  return (
    <div>
      <div className="w-full h-dvh flex justify-center items-center bg-gray-950">
        <div className="p-3 m-3 w-5xl h-64 bg-gray-700 rounded-2xl">
          <h1 className="text-center text-5xl text-orange-400 m-4 mb-11 font-bold uppercase">
            Password Generator
          </h1>
          <div className="flex ">
            <input
              type="text"
              value={password}
              ref={passwordRef}
              className="h-18 w-full rounded-l-2xl bg-white text-3xl flex justify-center items-center p-4 outline-0"
              placeholder="Generated Password"
              readOnly
            />
            <button
            className="bg-blue-400 p-4 rounded-r-2xl flex justify-center items-center text-white hover:bg-blue-500 hover:cursor-pointer"
            onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="flex  justify-center items-center">
            <input
              type="range"
              min={6}
              max={16}
              id="length"
              value={length}
              className="p-3 cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length" className="p-3 text-orange-400">
              Length({length})
            </label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numbers"
              className="size-4"
              onChange={()=>setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers" className="p-3 text-orange-400">
              Number Allowed
            </label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={()=>setCharAllowed((prev) => !prev)}
              id="characters"
              className="size-4"
            />
            <label htmlFor="characters" className="p-3 text-orange-400">
              Special Characters Allowed
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
