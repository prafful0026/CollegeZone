import axios from "axios"
import baseUrl from "./baseUrl.js"
import catchErrors from "./catchErrors.js"
import Router from "next/router"
import cookie from "js-cookie"
// import { Router } from "express"


export const registerUser=async({user,profilePicUrl,setErrorMessage,setFormLoading})=>{
    try {
        // console.log(user)
        const res = await axios.post(`${baseUrl}/api/signup/`,{user,profilePicUrl})
        // console.log(res.data)
        setToken(res.data)
    } catch (error) {
      const errMsg = catchErrors(error)
      setErrorMessage(errMsg)
    }
    setFormLoading(false)
}


export const loginUser=async({user,setErrorMessage,setFormLoading})=>{
    // setLoading(true)
    // console.log("user logibn")
    try {
        const res = await axios.post(`${baseUrl}/api/auth/`,{user})

        setToken(res.data)
    } catch (error) {
      const errMsg = catchErrors(error)
      setErrorMessage(errMsg)
    }
    setFormLoading(false)

}
const setToken=(token)=>{
  cookie.set('token',token)
  Router.push("/")

}