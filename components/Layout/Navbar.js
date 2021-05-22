import React from "react";
import { Container, Menu, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const isActive = (route) => router.pathname === route;
  return (
    <>
      <Menu fluid borderless>
        {/* <h1 style={{ marginLeft: "20px", fontSize: "30px", marginTop: "10px" }}>
          <span style={{ color: "gray" }}>Frand</span>
          <span style={{ color: "teal" }}>Zone</span>
        </h1> */}
        <Container text>
          <Link href='/login'>  
            <Menu.Item header active={isActive("/login")}>
              <Icon size='large' name='sign in' />
              Login
            </Menu.Item>
          </Link>

          <Link href='/signup'>
            <Menu.Item header active={isActive("/signup")}>
              <Icon size='large' name='signup' />
              Sign up
            </Menu.Item>
          </Link>
        </Container>
      </Menu>
    </>
  );
}

export default Navbar;
