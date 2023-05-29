import loading from "../components/assets/img/loading.gif";
import styled from "styled-components";

export default function Loading() {
  return (
    <Gif>
      <img src={loading} alt="gif" />
    </Gif>
  );
}

const Gif = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 300px;
  }
`;
