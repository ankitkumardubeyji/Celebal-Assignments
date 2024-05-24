import { useEffect, useState } from "react";
import {toast} from "react-hot-toast"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {Country} from 'country-state-city'
import {State} from 'country-state-city'
import { City } from "country-state-city";
import { Navigate, useNavigate } from "react-router-dom";
function ValidateForm(){

const [country,setCountry] =useState([])
const [city,setCities] = useState(City.getCitiesOfCountry('IN'))
 useEffect(()=>{
  setCountry(Country.getAllCountries())
 

  /* 
  fetch('https://restcountries.com/v3.1/all').then(res=>{
    console.log("edhar");
    return res.json()
  }).then((data)=>{
    const countryNames = data.map(country => country.name.common);
        countryNames.sort()
        setCountry(countryNames);
  })
  .catch((err)=>console.log(err))
  */

 })

    const [signupData,setSignupData] = useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        phoneno:"",
        country:"IN",
        city:"ABHANERI",
        pan:"",
        aadhar:"",
      
    })



    function handleUserInput(e){
        const {name,value} = e.target
        setSignupData({
            ...signupData,
            [name]:value 
        })
    }

    function handleUserCountry(e){
      e.preventDefault()
      const {name,value} = e.target
      
      setSignupData({
        ...signupData,
        [name]:value  
    })

      
      setCities(City.getCitiesOfCountry(value))
      console.log(City.getCitiesOfCountry(value))
    }

    function handleUserCity(e){
      e.preventDefault()
      const {name,value} = e.target
      setSignupData({
        ...signupData,
        [name]:value 
    })
      
    }

    
    const navigate = useNavigate()

    function validateAccount(e){
       
        e.preventDefault()
    
        if( !signupData.email || !signupData.password || !signupData.firstname || !signupData.lastname){
            toast.error("Please fill all the fields")
            return;
        }

         // checking the name field length
    
  
    
      if(!signupData.email.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        toast.error("Invalid email id ")
      }
  
      if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
        console.log("edhar");
        toast.error(
          "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
        );
        return;
      }

      if (!signupData.aadhar.match(/^\d{12}$/)) {
        console.log(signupData.aadhar)
        console.log(signupData.pan)
        toast.error("Please provide valid Aadhar");
        return;
      }

      if(!signupData.pan.match(/^[A-Z]{5}\d{4}[A-Z]$/)){
        toast.error("Please provide valid pan");
        return;
      }
      
      console.log(signupData)
      localStorage.setItem("signupData",JSON.stringify(signupData))
      navigate("/display");
     
    }


    const [visibility,setVisibility] = useState(false)
    function handleVisibility(e){
      e.preventDefault()
     
      if(visibility==false){
        setVisibility(true)
        e.target.type="text";
      }
      else{
        setVisibility(false)
        e.target.type = "password"
      }
      
      
    }

    



   
   

    return(
        <>
      
        <div className="flex items-center justify-center h-[100vh] m-auto">
        <form
          onSubmit={validateAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]"
        >
          
          {/* input for name */}
          <div className="flex flex-col gap-1">
         
          
           
            <input
              required
              type="name"
              name="firstname"
              id="firstname"
              placeholder="Enter your first name"
              className="bg-transparent px-2 py-1 border"
              value={signupData.firstname}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
        
            <input
              required
              type="name"
              name="lastname"
              id="lastname"
              placeholder="Enter your Last name"
              className="bg-transparent px-2 py-1 border"
              value={signupData.lastname}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
           
            <input
              required
              type="name"
              name="username"
              id="username"
              placeholder="Enter your  Username"
              className="bg-transparent px-2 py-1 border"
              value={signupData.username}
              onChange={handleUserInput}
            />
          </div>


          {/* input for email */}
          <div className="flex flex-col gap-1">
          
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              value={signupData.email}
              onChange={handleUserInput}
            />
          </div>

          {/* input for password */}
          <div className="flex flex-col gap-1">
           
            <div className="password">
            <input
              required
              type={visibility?"text":"password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              className="bg-transparent px-2 py-1 border"
              value={signupData.password}
              onChange={handleUserInput}
            />
            
            {visibility ? (
  <VisibilityOffIcon style={{ color: "black", cursor: "pointer" }} onClick={handleVisibility} />
) : (
  <VisibilityIcon style={{ color: "black", cursor: "pointer" }} onClick={handleVisibility} />
)}


            </div>
          
          </div>

          <div className="flex flex-col gap-1">
          
            <input
              required
              type="name"
              name="phoneno"
              id="phoneno"
              placeholder="Enter your  phoneno"
              className="bg-transparent px-2 py-1 border"
              value={signupData.phoneno}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
           
            <select
            required
        name="country"
        id="country"
        value={signupData.country}
        onChange={handleUserCountry}
        className="bg-transparent px-2 py-1 border"
      >
        {country.map((option) => (
          <option key={option.isoCode} value={option.isoCode}>
            {option.name}
          </option>
        ))}
      </select>
          </div>


          <div className="flex flex-col gap-1">
        
            <select
            required
        name="city"
        id="city"
        value={signupData.city}
        onChange={handleUserCity}
        className="bg-transparent px-2 py-1 border"
      >
        {city.map((option) => (
          <option key={option.isoCode} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
          </div>


          <div className="flex flex-col gap-1">
           
            <input
              required
              type="name"
              name="pan"
              id="pan"
              placeholder="Enter your  Pan"
              className="bg-transparent px-2 py-1 border"
              value={signupData.pan}
              onChange={handleUserInput}
            />
          </div>


          <div className="flex flex-col gap-1">
          
            <input
              required
              type="name"
              name="aadhar"
              id="aadhar"
              placeholder="Enter your  Aadhar"
              className="bg-transparent px-2 py-1 border"
              value={signupData.aadhar}
              onChange={handleUserInput}
            />
          </div>
          {/* registration button */}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
            type="submit"
          >
            Validate Data
          </button>

          
        </form>
      </div>
        
        </>
    )
}

export default ValidateForm;
