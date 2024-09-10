
import {Route, Routes } from 'react-router-dom'
import Home from '../../views/home/Home'

export default function Common() {
   return (
   

      <Routes>

         <Route path='/' element={<Home />} />

         
      
      </Routes>
         
  
   )
}
