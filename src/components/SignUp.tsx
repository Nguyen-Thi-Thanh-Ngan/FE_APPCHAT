import React, {useState} from 'react';
import {wsService} from '../services/WebSocketService';
import {Link, Route, Routes, useNavigate} from 'react-router-dom'; // Import Link từ react-router-dom

import {Form, Button, Container, Row, Col, Card, InputGroup, Alert} from 'react-bootstrap';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>(''); // Thêm state để lưu thông báo lỗi
    const navigate = useNavigate(); // dùng useNavigate để điều hướng trang


    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Thực hiện logic đăng ký, ví dụ gửi yêu cầu đăng ký qua WebSocket
        const registerMessage = {
            action: 'onchat',
            data: {
                event: 'REGISTER',
                data: {
                    user: username,
                    pass: password,
                },
            },
        };

        wsService.sendMessage(registerMessage);

        // Chuyển hướng về trang Login sau khi đăng ký thành công
        wsService.onMessage((message) => {
            const data = JSON.parse(message.data);
            if (data.event === 'REGISTER') {
                if (data.status === 'success') {
                    // Đăng ký thành công
                    navigate('/login', {state: {successMessage: 'Đăng ký thành công! Vui lòng đăng nhập.'}});
                } else if (data.status === 'error') {
                    // Đăng ký thất bại, hiển thị thông báo lỗi
                    setErrorMessage('Tài khoản đã tồn tại. Vui lòng chọn tên đăng nhập khác.');
                }
            }
        });
    };


    return (
        <Container className="d-flex align-items-center justify-content-center login-container">
            <Row className="w-100 justify-content-center">
                <Col md={10} lg={6}>
                    <Card className="shadow-lg login-card">
                        <Card.Body>
                            <div className="text-center">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/9194/9194865.png" // Thay đổi URL ảnh avatar theo ý bạn
                                    alt="Avatar"
                                    // className="rounded-circle mb-4"
                                    width="120"
                                    height="120"
                                />
                            </div>
                            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                            <h2 className="text-center mb-4">Đăng Ký</h2>
                            <Form onSubmit={handleRegister}>
                                <Form.Group id="username" className="mb-3">
                                    <Form.Label><b>Tên đăng ký</b></Form.Label>
                                    <Form.Control
                                        type="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Nhập tên đăng ký"
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
                                <Button className="w-100 login-button" type="submit">Đăng Ký</Button>
                            </Form>
                            <div className="text-center mt-3">
                                {/* Sử dụng Link để điều hướng đến trang SignUp */}
                                <Link to="/login" className="signup-link">Đăng Nhập</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
