import './App.css'
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import { About } from './pages/About'
import {Contact} from './pages/Contact'
import {Createblog} from './pages/Createblog'
import {Home} from './pages/Home'
import {Landing} from './pages/Landing'
import {Profile} from './pages/Profile'
import {ReadBlog} from './pages/ReadBlog'
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("User")
    if(token) {
   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }

  }, [])
  //pages
  //Landing page
  //Home page(filterd by recency)
  //ReadBlog
  //CreateBlog
  //profile
  //About
  //Contact

  //http://localhost:5173
  return (
    <Router>
       <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route element={<Layout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/createblog" element={<Createblog/>}/>
        <Route path="/readblog/:id" element={<ReadBlog/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        </Route>
       </Routes>
    </Router>
  )
}

export default App
