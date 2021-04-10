import React, { useEffect, useState, useRef } from "react";
import { Button, Message, Form, Segment, Divider } from "semantic-ui-react";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/common/WelcomeMessage.js";
import {loginUser} from "../utils/authUser.js"
import cookie from "js-cookie"
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    if (isUser) {
      setSubmitDisabled(false);
      // console.log("hi")
    } else {
      setSubmitDisabled(true);
    }
  }, [user]);
  const submitHandler =async (e) => {
    // console.log("hi")
    e.preventDefault();
    await loginUser({user,setErrorMessage,setFormLoading})

  };
  const handleChange = (e) => {
    //   console.log(e.target)
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  
  useEffect(()=>{
    
    document.title="Welcome back"
    const userEmail=cookie.get("userEmail")
    if(userEmail)
    setUser(prev=>({...prev,email:userEmail}))

  },[])
       
    
  return (
    <>
      <HeaderMessage />

      <Form
        loading={formLoading}
        error={errorMessage !== null}
        onSubmit={submitHandler}
      >
        <Segment>
          <Message
            error
            header='oops!'
            content={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
          <Form.Input
            required
            label='Email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            fluid
            icon='envelope'
            iconPosition='left'
            type='email'
          ></Form.Input>

          <Form.Input
            required
            label='Password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition='left'
            type={showPassword ? "text" : "password"}
          ></Form.Input>
          <Divider hidden />

          <Button
          icon="signup"
            content='login'
            type='submit'
            color='orange'
            disabled={submitDisabled}
            // onSubmit={submitHandler}
          ></Button>
        </Segment>
      </Form>

      <FooterMessage />
    </>
  );
};

export default Login;
