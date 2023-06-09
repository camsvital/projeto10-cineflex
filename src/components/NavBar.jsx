import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <Link to="/">
        <NavContainer>
            CINEFLEX
            </NavContainer>
      </Link>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
