import React from "react";
import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <Message
      color="teal"
      attached
      header={signupRoute ? "Get started " : "Welcome back"}
      icon={signupRoute ? "settings" : "privacy"}
      content={
        signupRoute ? "Create new account" : "Login with email and password"
      }
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";
  return (
    <>
      {signupRoute ? (
        <>
          <Message attached='bottom' warning>
            <Icon name='help' />
            Existing user? <Link href='/login'>sign in here instead</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached='bottom' warning>
            <Icon name='lock' />
            <Link href='/reset'>Forgot password?</Link>
          </Message>
          <Message attached='bottom' warning>
            <Icon name='help' />
            new user? <Link href='/signup'>sign up here instead</Link>
          </Message>
        </>
      )}
    </>
  );
};
// export default Header
