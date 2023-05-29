import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { useParams, useNavigate } from "react-router-dom";

export default function SeatsPage() {
  const { idSessao } = useParams();
  const navigate = useNavigate();
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
      console.log(listaAssentos.data);
    });

    promise.catch((erro) => {
      console.log(erro.reponse.data);
    });
  }, []);

  function escolherAssento(assento, disponivel) {
    if (disponivel) {
      if (selecionados.includes(assento)) {
        let arr = [...selecionados];
        let index = arr.indexOf(assento);
        arr.splice(index, 1);
        setSelecionados(arr);
        console.log(arr);
      } else {
        let arr = [...selecionados, assento];
        setSelecionados(arr);
        console.log(arr);
      }
    } else {
      alert("Esse assento não está disponível");
    }
  }

  if (sessao === undefined) {
    return <Loading />;
  }

  function enviarDados(e) {
    e.preventDefault();
    const info = { name: nome, cpf: formateCPF(cpf), ids: selecionados };
    const URL =
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";

    const promise = axios.post(URL, info);

    promise.then(() => {
      navigate("/sucesso", {
        state: { selecionados, nome, cpf },
      });
    });
    promise.catch(console.log("Erro ao comprar ingresso. Tente novamente."));
  }

  function formateCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{2})$/, "$1-$2");

    return cpf;
  }

  console.log(selecionados);

  if (sessao !== null) {
    return (
      <PageContainer>
        Selecione o(s) assento(s)
        <SeatsContainer>
          {sessao.map((sessao) => (
            <SeatItem
              data-test="seat"
              onClick={() => escolherAssento(sessao.id, sessao.isAvailable)}
              disponivel={sessao.isAvailable}
              key={sessao.id}
              assento={sessao.id}
              selecionados={selecionados}
            >
              {sessao.name}
            </SeatItem>
          ))}
        </SeatsContainer>
        <CaptionContainer>
          <CaptionItem>
            <CaptionCircle color="#1AAE9E" border="#0E7D71" />
            Selecionado
          </CaptionItem>
          <CaptionItem>
            <CaptionCircle color="#C3CFD9" border="#7B8B99" />
            Disponível
          </CaptionItem>
          <CaptionItem>
            <CaptionCircle color="#FBE192" border="#F7C52B" />
            Indisponível
          </CaptionItem>
        </CaptionContainer>
        <FormContainer>
          <form onSubmit={enviarDados}>
            <input
              data-test="client-name"
              type="name"
              value={nome}
              placeholder="Digite seu nome"
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              data-test="client-cpf"
              type="text"
              value={cpf}
              placeholder="Digite seu CPF"
              onChange={(e) => setCPF(e.target.value)}
            />

            <button data-test="book-seat-btn" type="submit">
              Reservar Assento(s)
            </button>
          </form>
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
  border: 1px solid ${(props) => props.border};
  background: ${(props) => props.color};
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
  background: ${(props) => {
    if (props.disponivel && !props.selecionados.includes(props.assento)) {
      return "#C3CFD9";
    } else if (props.disponivel && props.selecionados.includes(props.assento)) {
      return "#1AAE9E";
    } else {
      return "#FBE192";
    }
  }};
  border: 1px solid
    ${(props) => {
      if (props.disponivel && !props.selecionados.includes(props.assento)) {
        return "#7B8B99";
      } else if (
        props.disponivel &&
        props.selecionados.includes(props.assento)
      ) {
        return "#0E7D71";
      } else {
        return "#F7C52B";
      }
    }};
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
