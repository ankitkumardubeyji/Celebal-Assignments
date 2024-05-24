
import './App.css'
import DisplayData from './Pages/DisplayData'
import ValidateForm from './Pages/ValidateForm'
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider,Navigate } from 'react-router-dom'


function App() {


  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route>
    <Route path='/' element={<ValidateForm />} />
      <Route path='display' element={<DisplayData/>} /> 
    
    </Route>
      
    ))

  return (
    <>
   
   <RouterProvider router = {router}/>
    </>
  )
}

export default App
