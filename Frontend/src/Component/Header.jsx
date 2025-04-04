

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
        <img src="./public/dev.png"alt="" 
        className="w-36 h-36 rounded-full mb-6"   />
        <h1 className="text-xl sm:text-3xl font-medium mb-2 ">Hey  Developper👋</h1>
        <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcom to our app</h2>
        <p className="mb-8 max-w-md"> let's start with a quick product tour and will have you up and running in no time!</p>
        <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all">Get stated</button>
    </div>
  )
}

export default Header