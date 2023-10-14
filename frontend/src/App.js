import './App.css';
import Window from './components/Window';
import Salesperson from './components/Salesperson';
import FavBox from './components/FavBox';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Card } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header class="header">
        <PageHeader />
      </header>
      <div className="hard">
        <Container fluid>
          <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
            <Col md={4} style={{ maxHeight: "80%", justifyContent: 'center' }} >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Row style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Salesperson />
                </Row>
                <Row style={{ flex: 1, justifyContent: 'center', margin: 0, padding: 0, block: 0 }}>
                  <FavBox />
                </Row>
              </div>
            </Col>
            <Col md={7} style={{ display: 'flex', alignItems: 'center' }}>
              <Window />
            </Col>
          </Row>
        </Container>
      </div>
      <footer className='footer'>
        <PageFooter />
      </footer>
    </div>
  );
}

export default App;
