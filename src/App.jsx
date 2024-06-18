import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [NumAllowed, setNumAllowed] = useState(false)
  const [symbol, setSymbol] = useState(false)
  const [Password, setPassword] = useState()

  const PasswordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (NumAllowed) str += "0123456789"
    if (symbol) str += "!@#$%^&*(){};:'/<>.,~?+--_="
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, NumAllowed, symbol, Password])

  const CopyPassowrdToClipboard = useCallback(() => {
    PasswordRef.current?.select();
    // PasswordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(Password);
  }, [Password])

  useEffect(PasswordGenerator, [length, NumAllowed, symbol])

  return (
    <>
      <div className='bg-black w-screen h-screen text-white flex justify-center items-center'>
        <div className='bg-slate-500 w-2/3 h-3/5 rounded-xl'>
          <h1 className='text-center text-4xl text-white py-8'>Password Generator</h1>
          <br />
          <div className='flex flex-wrap justify-center text-orange-500 text-4xl gap-2'>
            <input className='px-2 rounded-md w-2/3' ref={PasswordRef} value={Password} type="text" placeholder='Password' readOnly />
            <button className="bg-blue-600 px-5 text-2xl text-white  rounded-md active:bg-blue-500" onClick={CopyPassowrdToClipboard}>COPY</button>
          </div>

          <div className='flex flex-wrap gap-8 justify-center text-xl mt-4 w-'>

            <input className='cursor-pointer max-w-fit' type="range" onChange={(e) => setLength(e.target.value)} value={length} min={6} max={100} />
            <label>
              Length:{length}
            </label>

            <div className='flex flex-wrap gap-1'>
              <input type="checkbox" className='w-4' defaultChecked={NumAllowed} onChange={() => setNumAllowed((prev) => !prev)} /><label htmlFor="Numbers" >
                Numbers
              </label>
            </div>

            <div className='flex flex-wrap gap-1'>
              <input type="checkbox" className='w-4' defaultChecked={symbol} onChange={() => { setSymbol((prev) => !prev) }} />
              <label htmlFor="Character">
                Symbols
              </label>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default App
