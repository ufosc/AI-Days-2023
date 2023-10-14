import './App.css';
import myImage from'./assets/theboy.jpeg';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Container, Image, Card} from 'react-bootstrap';

function App() {
  return (
    <div className='App'>
    <Container>
      <Row style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <Col style={{display: 'flex', alignItems: 'center' }}>
            <Image src={myImage} width={300} height={300}></Image>
        </Col>
        <Col style={{display: 'flex', alignItems: 'center' }}>
          
          <Row>
            <Card>
              <body>Hi i will give u foen</body>
            </Card>
          </Row>
          <Row>
            <input 
                  type="text" 
                  style={{
                      position: 'absolute',
                      right: '20px', // distance from the right edge
                      bottom: '20px', // distance from the bottom edge
                      width: '55vw', // a third of the viewport width
                      height: '25vh' // a fourth of the viewport height
                  }}
            />
          </Row>
          
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default App;
