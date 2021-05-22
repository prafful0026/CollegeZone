import axios from "axios";
import baseUrl from "./baseUrl.js";
import catchErrors from "./catchErrors.js";
import Router from "next/router";
import cookie from "js-cookie";
// import { Router } from "express"

export const registerUser = async ({
  user,
  profilePicUrl,
  setErrorMessage,
  setFormLoading,
}) => {
  try {
    // console.log(user)
    const res = await axios.post(`${baseUrl}/api/signup/`, {
      user,
      profilePicUrl,
    });
    // console.log(res.data)
    setToken(res.data);
  } catch (error) {
    const errMsg = catchErrors(error);
    setErrorMessage(errMsg);
  }
  setFormLoading(false);
};

export const loginUser = async ({ user, setErrorMessage, setFormLoading }) => {
  // setLoading(true)
  // console.log("user logibn")
  try {
    const res = await axios.post(`${baseUrl}/api/auth/`, { user });

    setToken(res.data);
  } catch (error) {
    const errMsg = catchErrors(error);
    setErrorMessage(errMsg);
  }
  setFormLoading(false);
};

// export const redirectUser = (ctx, location) => {
//   if (ctx.req) {
//     ctx.res.writeHead(302, { Location: location });
//     ctx.res.end();
//   } else {
//     Router.push(location);
//   }
// };
export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};




const setToken = (token) => {
  cookie.set("token", token,{expires:1});
  Router.push("/");
};

export const logoutUser=(email)=>{
  cookie.set("userEmail",email)
  cookie.remove("token")
  Router.push("/login")
  Router.reload()
}