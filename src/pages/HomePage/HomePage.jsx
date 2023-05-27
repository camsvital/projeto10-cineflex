import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [imgFilme, setImgFilme] = useState([]);

  useEffect(() => {
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
    const promise = axios.get(URL);

    promise.then((listaFilmes) => {
      console.log(listaFilmes.data);
      setImgFilme(listaFilmes.data);
    });

    promise.catch((erro) => {
      console.log(erro.reponse.data);
    });
  }, []);
 
if (imgFilme.length === 0){
  return (
    <div>carregando</div> //substituir por gif
  )
}

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer key={imgFilme.id}>
        {imgFilme.map((imgFilme) => (
          <MovieContainer>
            <img src={imgFilme.posterURL} alt="poster" />
          </MovieContainer>
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
