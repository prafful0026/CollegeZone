import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {logoutUser} from "../../utils/authUser.js"
let temp="College"+"Zone".fontcolor("teal")
const SideMenu = ({
  user: { unreadNotification, email, unreadMessage, username },
}) => {
  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  return (
    <>
      <List
        style={{ paddingTop: "1rem" }}
        size='big'
        verticalAlign='middle'
        selection
      >
          <List.Item >
            <Icon name='book' size='large' color={"teal"} />

            <List.Content style={{fontSize:"35px"}}>
            <h1 ><span style={{color:"gray"}}>College</span><span style={{color:"teal"}}>Zone</span></h1>

            
              {/* <List.Header content='CollegeZone' /> */}
            </List.Content>
          </List.Item>
          <br/>
          <br/>

        <Link href='/'>
          <List.Item active={isActive("/")}>
            <Icon name='home' size='' color={isActive("/") && "teal"} />
            <List.Content>
              <List.Header content='Home' />
            </List.Content>
          </List.Item>
        </Link>
        <br/>
        {/* <Link href='/messages'>
          <List.Item active={isActive("/messages")}>
            <Icon
              name={unreadMessage ? "hand point right" : "mail outline"}
              size='large'
              color={
                (isActive("/messages") && "teal") || (unreadMessage && "orange")
              }
            />
            <List.Content>
              <List.Header content='Messages' />
            </List.Content>
          </List.Item>
        </Link> */}
        {/* <br/> */}

        <Link href='/notifications'>
          <List.Item active={isActive("/notifications")}>
            <Icon
              name={"bell outline"}
              size='large'
              color={
                (isActive("/notifications") && "teal") ||
                (unreadNotification && "orange")
              }
            />
            <List.Content>
              <List.Header content='Notice Board' />
            </List.Content>
          </List.Item>
        </Link>
        <br/>

        <Link href={`/${username}`}>
          <List.Item active={router.query.username===username}>
            <Icon name='user' size='large' color={router.query.username===username && "teal"} />
            <List.Content>
              <List.Header content='Account' />
            </List.Content>
          </List.Item>
        </Link>
        <br/>

        <List.Item onClick={()=>logoutUser(email)}>
            <Icon name="log out" size="large"/>
            <List.Content>
              <List.Header content='Logout' />
            </List.Content>

        </List.Item>
      </List>
    </>
  );
};

export default SideMenu;
