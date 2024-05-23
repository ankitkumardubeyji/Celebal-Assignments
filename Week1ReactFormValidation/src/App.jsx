
import './App.css'
import DisplayData from './Components/DisplayData'
import ValidateForm from './Components/FormInput/ValidateForm'
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
