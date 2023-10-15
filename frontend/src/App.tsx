import './App.css';
import ChatWindow from './components/ChatWindow';
import Salesperson from './components/Salesperson';
import Favorites from './components/Favorites.tsx';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Container, Modal} from 'react-bootstrap';
import { Component } from 'react';
import { Message, Phone } from './backend/types.ts';
import { getPhones, sendMessage } from './backend/messaging.ts';

const testPhone: Phone = {
    battery: '',
    brand: '',
    camera: { front: '', general: '', modes: '', rear: '', video: '' },
    color: '',
    description: '',
    id: 1,
    images: [
        'https://ss7.vzw.com/is/image/VerizonWireless/iphone-11-pro-max-space-gray',
    ],
    name: '',
    price: 0,
    screen_size: 5,
    storage: 4,
    url: '',
    used: false,
};

interface State {
    messages: Message[];
    favorites: Phone[];
    phones: Phone[];
}

export default class App extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            messages: [
                { role: 'assistant', phone_ids: [], content: 'Welcome!' },
            ],
            favorites: [],
            phones: [],
        };
    }

    componentDidMount() {
        getPhones()
            .then((phones) => {
                if (phones) this.setState({ phones });
            })
            .then(() => {
                this.addFavorite(0);
            });
        this.addFavorite(60);
    }

    appendMessage(msg: Message) {
        this.setState({ messages: [...this.state.messages, msg] });
    }

    addFavorite(id: number) {
        console.log(id);
        // if (!this.state.favorites.some((phone) => (phone.id = id))) {
        const phone = this.state.phones[id];
        console.log(phone);
        if (phone)
            this.setState({ favorites: [...this.state.favorites, phone] });
        // }
    }

    removeFavorite(phone_id: number) {
        this.setState({
            favorites: this.state.favorites.filter(
                (phone) => phone.id != phone_id
            ),
        });
    }

    static RETRIES = 1;

    async handleQuery(query: string, retries = App.RETRIES) {
        console.log('QUERY');
        if (retries == App.RETRIES)
            this.appendMessage({
                role: 'user',
                phone_ids: [],
                content: query,
            });

        const assistantMessage = await sendMessage(query);
        if (assistantMessage)
            // Got a message, log it
            this.appendMessage(assistantMessage);
        else if (retries > 0) {
            // Retry if allowed
            this.appendMessage({
                role: 'assistant',
                phone_ids: [],
                content: '<i>Retrying...</i>',
            });
            await this.handleQuery(query, retries - 1);
        } // No more retries
        else
            this.appendMessage({
                role: 'assistant',
                phone_ids: [],
                content: "<i>Sorry, that didn't work. Please try again.</i>",
            });
    }

    render() {
        return (
            <div>
                <header>
                    <PageHeader />
                </header>

                <Container style={{ width: 1200 }} fluid>
                    <Row>
                        <Col
                            md={4}
                            style={{
                                display: 'flex',
                                justifyContent: 'left',
                                alignItems: 'center',
                            }}
                        >
                            <Salesperson />
                        </Col>
                        <Col
                            md={8}
                            style={{
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'center',
                            }}
                        >
                            <ChatWindow
                                messages={this.state.messages}
                                handleQuery={this.handleQuery.bind(this)}
                                phones={this.state.phones}
                                addFavorite={this.addFavorite.bind(this)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Favorites
                                favorites={this.state.favorites}
                                removeFavorite={this.removeFavorite.bind(this)}
                            />
                        </Col>
                    </Row>
                </Container>
                <footer>
                    <PageFooter />
                </footer>
            </div>
        );
    }
}
