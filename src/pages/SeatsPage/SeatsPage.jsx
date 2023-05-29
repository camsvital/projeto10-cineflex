import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function SeatsPage() {
  const { idSessao } = useParams();
  const [sessao, setSessao] = useState(undefined);
  const [selecionados, setSelecionados] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const link = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const promise = axios.get(link);

    promise.then((listaAssentos) => {
      setFilme(listaAssentos.data);
      setSessao(listaAssentos.data.seats);
      //console.log(listaAssentos.data);
    });

    promise.catch((erro) => {
      console.log(erro.reponse.data);
    });
  }, []);

  function reservarAssentos(assento) {
    if (selecionado) {
      const novoSelecionados = selecionados.filter((s) => s.id !== assento.id);
      setSelecionados(novoSelecionados);
    } else {
      setSelecionados([...selecionados, assento]);
    }
  }

  if (sessao === undefined) {
    return <div>Carregando</div>;
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {sessao.map((sessao) => (
          <SeatItem>{sessao.name}</SeatItem>
        ))}

        <CaptionContainer>
          <CaptionItem>
            <CaptionCircle status="selecionado" />
            Selecionado
          </CaptionItem>
          <CaptionItem>
            <CaptionCircle status="disponivel" />
            Disponível
          </CaptionItem>
          <CaptionItem>
            <CaptionCircle status="indisponivel" />
            Indisponível
          </CaptionItem>
        </CaptionContainer>
      </SeatsContainer>
      <FormContainer>
        Nome do Comprador:
        <input placeholder="Digite seu nome..." />
        CPF do Comprador:
        <input placeholder="Digite seu CPF..." />
        <button>Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        <div>
          <img data-test="footer" src={filme.movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{filme.movie.title}</p>
          <p>
            {filme.day.weekday} - {filme.name}
          </p>
        </div>
      </FooterContainer>
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: lightblue; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid blue; // Essa cor deve mudar
  background-color: lightblue; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
