import React, { useState } from 'react';
import { Routes, Route, Link} from 'react-router-dom'
import { WebSocketService } from '../services/WebSocketService';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';

const wsUrl = 'ws://140.238.54.136:8080/chat/chat';
const wsService = new WebSocketService(wsUrl);

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginMessage = {
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: {
                    user: username,
                    pass: password,
                },
            },
        };

        wsService.sendMessage(loginMessage);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center login-container">
            <Row className="w-100 justify-content-center">
                <Col md={10} lg={6}>
                    <Card className="shadow-lg login-card">
                        <Card.Body>
                            <div className="text-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/4413/4413809.png" // Thay đổi URL ảnh avatar theo ý bạn
                                    alt="Avatar"
                                    // className="rounded-circle mb-4"
                                    width="120"
                                    height="120"
                                />
                            </div>
                            <h2 className="text-center mb-4">Đăng Nhập</h2>
                            <Form onSubmit={handleLogin}>
                                <Form.Group id="username" className="mb-3">
                                    <Form.Label><b>Tên đăng nhập</b></Form.Label>
                                    <Form.Control
                                        type="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                </Form.Group>
                                <Form.Group id="password" className="mb-3">
                                    <Form.Label><b>Mật khẩu</b></Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                        />
                                        <InputGroup.Text>
                                            <input
                                                type="checkbox"
                                                checked={showPassword}
                                                onChange={(e) => setShowPassword(e.target.checked)}
                                            /> Hiển thị
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Button className="w-100 login-button" type="submit">Đăng Nhập</Button>
                            </Form>
                            <div className="text-center mt-3">
                                <Link to="/signup" className="signup-link">Đăng Ký</Link>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
