import { useState } from "react"
import { SiAuthelia } from "react-icons/si"
import { FaUser } from "react-icons/fa";

const Login = () => {

  const [state , setState]= useState("sign up")
  return (
    <div className="flex  items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen">
      
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
      <h1 className=" flex items-center gap-1 absolute left-5 sm:left-20 top-5 text-3xl sm:text-4xl cursor-pointer text-black"><SiAuthelia className="text-blue-700" />auth</h1>
      <h2>{state === "sign up" ? "create Account" : "login"}</h2>
      <p>{state === "sign up" ? "create your accounte" : "login to your account!"}</p>
      

      <form>
        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
        <FaUser />
          <input className="bg-transparent outline-none" type="text" placeholder="Full Name "  required/>
        </div>
       
      </form>
       </div >
    </div>
  )
}

export default Login