import { useContext, useState } from "react"
import { SiAuthelia, SiAxios } from "react-icons/si"
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../Context/App.Content";
import axios from "axios"
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate()

  const { backendUrl } = useContext(AppContent)

  const [state, setState] = useState("sign up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  // const onSubmitHandler = async (e) =>{
  //    e.preventDefault();
  //    try{

  //     axios.defaults.withCredentials = true
  //         if(state === "sign up"){
  //         const {data} =  await axios.post(backendUrl + "/api/auth/register" , {name , email , password})

  //         if(data.success){
  //           setIsLoggedin(true)
  //           navigate("/")
  //         }else{
  //           toast.error(data.message)
  //         }
  //         }else{
  //           const {data} =  await axios.post(backendUrl + "/api/auth/login" , { email , password})

  //           if(data.success){
  //             setIsLoggedin(true)
  //             navigate("/")
  //           }else{
  //             toast.error(data.message)
  //           }
  //         }
  //    }catch(error){
  //     toast.error(data.message)
  //    }
  // }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log("Sending data:", { name, email, password });
    try {
      axios.defaults.withCredentials = true;

      const endpoint = state === "sign up" ? "/api/auth/register" : "/api/auth/login";
      const requestData = state === "sign up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(backendUrl + endpoint, requestData);

      console.log("Backend response:", data);

      if (data.success) {
        console.log("✅ Login successful, setting isLoggedin to true");
        setIsLoggedin(true);
        navigate("/");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };


  return (
    <div className="flex  items-center justify-center px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 min-h-screen">

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h1 className=" flex items-center gap-1 absolute left-5 sm:left-20 top-5 text-3xl sm:text-4xl cursor-pointer text-black"><SiAuthelia className="text-blue-700" onClick={() => navigate("/")} />auth</h1>
        <h2 className="text-white text-3xl text-center mb-3">{state === "sign up" ? "create Account" : "login"}</h2>
        <p className=" text-sm text-center mb-3">{state === "sign up" ? "create your accounte" : "login to your account!"}</p>


        <form onSubmit={onSubmitHandler}>
          {state === "sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <FaUser />
              <input
                onChange={e => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none" type="text" placeholder="Full Name " required />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <MdEmail />
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none" type="email" placeholder="Email " required />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <RiLockPasswordLine />
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none" type="password" placeholder="Password " required />
          </div>
          <p className="mb-4 text-indigo-500 cursor-pointer" onClick={() => navigate("/reset-password")}>forgot password?</p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">{state}</button>

        </form>

        {state === "sign up" ? (<p className="text-gray-400 text-center text-xs mt-4">Aldredy have an account?{" "}
          <span className="text-blue cursor-pointer underline" onClick={() => setState("Login")}>Login here</span>
        </p>)
          : (<p className="text-gray-400 text-center text-xs mt-4">Don't have an account?{" "}
            <span className="text-blue cursor-pointer underline" onClick={() => setState("sign up")}>sign up</span>
          </p>)}




      </div >
    </div>
  )
}

export default Login