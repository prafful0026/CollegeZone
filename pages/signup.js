// import e from "express";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Message,
  Form,
  Segment,
  Divider,
} from "semantic-ui-react";
import InputComponent from "../components/common/InputComponent.js";
import ImageDropContainer from "../components/common/ImageDropContainer.js";

import {
  HeaderMessage,
  FooterMessage,
} from "../components/common/WelcomeMessage.js";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const Signup = () => {

    
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    intagram: "",
  });
  const { name, email, password, bio } = user;

  const [showSociaLinks, setShowSociaLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const isUser = Object.values({ name, email, password, bio }).every((item) =>
      Boolean(item)
    );
    if (isUser) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    //   console.log(e.target)
    const { name, value ,files } = e.target;
    if(name==="media")
    {setMedia(files[0])
      setMediaPreview(URL.createObjectURL(files[0]))
    }
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <HeaderMessage />

      <Form
        loading={formLoading}
        error={errorMessage !== null}
        onSubmit={submitHandler}
      >
        <Message
          error
          header='oops!'
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Segment>
          <ImageDropContainer
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia}
            inputRef={inputRef}
            highlighted={highlighted}
            setHighlighted={setHighlighted}
            handleChange={handleChange}
          />
          <Form.Input
            required
            label='Name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            fluid
            icon='user'
            iconPosition='left'
          ></Form.Input>
          <Form.Input
            loading={usernameLoading}
            error={usernameAvailable !== null && !usernameAvailable}
            required
            label='Username'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (regexUserName.test(e.target.value)) {
                setUsernameAvailable(true);
              } else setUsernameAvailable(false);
            }}
            fluid
            icon={
              usernameAvailable === null
                ? "user"
                : usernameAvailable !== null && usernameAvailable
                ? "check"
                : "close"
            }
            iconPosition='left'
          ></Form.Input>
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
          <InputComponent
            user={user}
            showSociaLinks={showSociaLinks}
            setShowSociaLinks={setShowSociaLinks}
            handleChange={handleChange}
          />
          <Divider hidden />

          <Button
            content='signup'
            type='submit'
            color='orange'
            disabled={submitDisabled || !usernameAvailable}
          ></Button>
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
};

export default Signup;
