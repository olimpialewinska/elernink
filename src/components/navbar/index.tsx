import React from "react";
import { Nav, Menu, MenuItem, Logo } from "./style";
import Link from "next/link";

export function Navbar() {
  return (
    <Nav>
      <Link href="/">
        <Logo />
      </Link>
      <Menu>
        <Link href="/login">
          <MenuItem>Login</MenuItem>
        </Link>
        <Link href="/register">
          <MenuItem>Register</MenuItem>
        </Link>
      </Menu>
    </Nav>
  );
}
