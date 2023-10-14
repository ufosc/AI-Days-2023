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
    <div className='App'>
      <header class="header">
        <PageHeader></PageHeader>
      </header>
      <Container>
        <Row style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
          <Col md={5} style={{maxHeight: "80%"}} >
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Row style={{ flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                <Salesperson />
              </Row>
              <Row style={{ flex: 1, justifyContent: 'center', margin:0}}>
                <FavBox />
              </Row>
            </div>
          </Col>
          <Col md={7} style={{ display: 'flex', alignItems: 'center' }}>
            <Window />
          </Col>
        </Row>
      </Container>
      <footer className='footer'>
        <PageFooter></PageFooter>
      </footer>
    </div>
  );
}

export default App;
