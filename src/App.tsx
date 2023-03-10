import { useState, useEffect } from 'react'
import { Routes, RouterProps, Route, Link, Outlet } from "react-router-dom"
import Login from "@/pages/login/login";
import './App.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='about' element={<About />} />
          <Route path='setting' element={<Setting />} />
          <Route index element={<List />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}
const Home = (props: any) => {
  return <>
    <div>
      <Link to='/about'>About Link</Link> | {" "}
      <Link to='/setting'>Setting Link</Link>
    </div>
    <div style={{ padding: '20px', margin: '10px', borderTop: '1px solid' }}>
      <Outlet />
    </div>
  </>;
}

const About = (props: any) => {
  return <div>
    About Compontent
  </div>;
}

const Setting = (props: any) => {
  return <div>
    Setting Compontent
  </div>;
}

const List = (props: any) => {
  return <div>
    List Compontent
  </div>;
}

export default App
