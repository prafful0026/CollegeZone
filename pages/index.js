import React,{useEffect} from 'react'
import axios from "axios"
const Index = ({user,userFollowStats}) => {
   useEffect(() => {
       document.title=`Welcome ,${user.name.split(' ')[0]}`;
   }, [])


    console.log({user,userFollowStats})
    return (
        <div>
            Homepage
        </div>
    )
}


export default Index
