import React from "react";
import { List, Icon } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser.js";
import Search from "./Search.js";

let temp = "College" + "Zone".fontcolor("teal");
const SideMenu = ({
  user: { unreadNotification, email, unreadMessage, username },
  pc = true,
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
        <Link href='/'>
          <List.Item active={isActive("/")}>
            <Icon name='home' size='' color={isActive("/") && "teal"} />
            <List.Content>{pc && <List.Header content='Home' />}</List.Content>
          </List.Item>
        </Link>
        <br />

        <Link href={`/${username}`}>
          <List.Item active={router.query.username === username}>
            <Icon
              name='user'
              size='large'
              color={router.query.username === username && "teal"}
            />
            <List.Content>
              {pc && <List.Header content='Account' />}{" "}
            </List.Content>
          </List.Item>
        </Link>
        <br />

        <List.Item onClick={() => logoutUser(email)}>
          <Icon name='log out' size='large' />
          <List.Content>{pc && <List.Header content='Logout' />}</List.Content>
        </List.Item>
        <br />
        {!pc && (
          <Link href='/search'>
            <List.Item active={isActive("/search")}>
              <Icon name='search' size='large' />
            </List.Item>
          </Link>
        )}
      </List>
    </>
  );
};

export default SideMenu;
