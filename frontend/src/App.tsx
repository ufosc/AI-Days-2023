import "./App.css";
import ChatWindow from "./components/ChatWindow";
import Salesperson from "./components/Salesperson";
import FavBox from "./components/Favorites.tsx";
import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState } from "react";

export default function App() {
  const [history, setHistory] = useState([
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
    "poo",
    "poo",
    "pee",
    "pee",
    "robert",
  ]);


  return (
    <div>
      <header>
        <PageHeader />
      </header>

      <Container style={{width: 1200}} fluid>
        <Row>
          <Col
            md={4}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <Salesperson />
          </Col>
          <Col
            md={8}
            style={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <ChatWindow messages={history} />
          </Col>
        </Row>
        <Row>
          <Col>
            <FavBox />
          </Col>
        </Row>
      </Container>

      <footer>
        <PageFooter />
      </footer>
    </div>
  );
}
