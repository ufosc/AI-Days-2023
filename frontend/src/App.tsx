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

// import "./App.css";
// import ChatWindow from "./components/ChatWindow";
// import Salesperson from "./components/Salesperson";
// import FavBox from "./components/FavBox";
// import PageFooter from "./components/PageFooter";
// import PageHeader from "./components/PageHeader";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Row, Col, Container, Card } from "react-bootstrap";
// import { useState } from "react";
//
// export default function App() {
//   const [messages, setMessages] = useState([
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//     "poo",
//     "poo",
//     "pee",
//     "pee",
//     "robert",
//   ]);
//
//   return (
//     <div>
//       <header>
//         <PageHeader />
//       </header>
//         <Container fluid>
//           <Row
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//           >
//             <Col
//               md={4}
//               style={{
//                 maxHeight: "80%",
//                 justifyContent: "center",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100%",
//                 }}
//               >
//                 <Row
//                   style={{
//                     flex: 2,
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Salesperson />
//                 </Row>
//                 <Row
//                   style={{
//                     flex: 1,
//                     justifyContent: "center",
//                     margin: 0,
//                     padding: 0,
//                   }}
//                 >
//                   <FavBox />
//                 </Row>
//               </div>
//             </Col>
//             <Col md={7} style={{ marginTop: 30 }}>
//               <ChatWindow messages={messages} />
//             </Col>
//           </Row>
//         </Container>
//       <footer className="footer">
//         <PageFooter />
//       </footer>
//     </div>
//   );
// }
