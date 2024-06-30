    import React, {useState} from 'react';
    import {useNavigate, useLocation} from 'react-router-dom';
    import {wsService} from '../services/WebSocketService';
    import '../css/homecss.css';
    import {handleLogout}  from "./Logout";
    import {
        MDBContainer,
        MDBRow,
        MDBCol,
        MDBCard,
        MDBCardBody,
        MDBIcon,
        MDBTypography,
        MDBInputGroup
    } from "mdb-react-ui-kit";

    const Home: React.FC = () => {
        const [successMessage, setSuccessMessage] = useState<string | null>(null);
        const location = useLocation(); // dùng useLocation để lấy thông tin từ trang trước
        const state = location.state as { successMessage?: string };
        const navigate = useNavigate();
        const [searchQuery, setSearchQuery] = useState('');

        React.useEffect(() => {
            if (state && state.successMessage) {
                setSuccessMessage(state.successMessage);
            }
        }, [state]);




        return (
            <MDBContainer fluid className="py-5" style={{backgroundColor: "#CDC4F9"}}>
                <form onClick={(event)=> handleLogout(event, setSuccessMessage, navigate)} style={{
                    position: 'absolute',
                    right: '50px', // Khoảng cách từ cạnh phải
                    top: '150px', // Khoảng cách từ cạnh trên
                    width: '30px',
                    height: '30px',
                }}>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/128/4400/4400828.png" alt="" style={{
                            width: '40px',
                            height: '40px'
                        }}/>
                    </div>
                </form>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard id="chat3" style={{borderRadius: "15px"}}>
                            <MDBCardBody >
                                <MDBRow >
                                    <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{
                                        width: '450px'
                                    }} >
                                        <div className="p-3">
                                            <MDBInputGroup className="rounded mb-3" >
                                                <input className="form-control rounded" placeholder="Search" type="search"/>
                                                {/*<span className="input-group-text border-0" id="search-addon">*/}
                                                {/*    <MDBIcon fas icon="search"/>*/}
                                                {/*</span>*/}
                                                <span>
                                                     <img
                                                         src="https://cdn-icons-png.flaticon.com/128/2617/2617956.png"
                                                         alt=""
                                                         style={{
                                                             width: '40px',
                                                             height: '40px',
                                                             marginLeft: '20px'
                                                         }} // Chỉnh kích thước ảnh
                                                     />
                                                </span>
                                                <span>
                                                     <img
                                                         src="https://cdn-icons-png.flaticon.com/128/14812/14812787.png"
                                                         alt=""
                                                         style={{
                                                             width: '40px',
                                                             height: '40px',
                                                             marginLeft: '20px'
                                                         }} // Chỉnh kích thước ảnh
                                                     />
                                                </span>
                                            </MDBInputGroup>

                                            <div className="custom-scrollbar" >
                                                <MDBTypography listUnStyled className="mb-0">
                                                    <li className="p-2 border-bottom">
                                                        <a href="#!" className="d-flex justify-content-between">
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <img
                                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                                        alt="avatar"
                                                                        className="d-flex align-self-center me-3"
                                                                        width="60"
                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">Marie Horwitz</p>
                                                                    <p className="small text-muted">
                                                                        Hello, Are you there?
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">Just now</p>
                                                                <span
                                                                    className="badge bg-danger rounded-pill float-end">3</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="p-2 border-bottom" >
                                                        <a href="#!" className="d-flex justify-content-between">
                                                            <div>
                                                                <div>
                                                                    <img
                                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                                                        alt="avatar"
                                                                        className="d-flex align-self-center me-3"
                                                                        width="60"
                                                                    />
                                                                    <span className="badge bg-warning badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1">
                                                                    <p className="fw-bold mb-0">Alexa Chung</p>
                                                                    <p className="small text-muted">
                                                                        Lorem ipsum dolor sit.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-1">
                                                                <p className="small text-muted mb-1">
                                                                    5 mins ago
                                                                </p>
                                                                <span
                                                                    className="badge bg-danger rounded-pill float-end">2</span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    {/* Add more list items as needed */}
                                                </MDBTypography>
                                            </div>
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6" lg="7" xl="8" style={{
                                        width: '800px'
                                    }}>
                                        <div className="custom-scrollbar chat-content">
                                            <div className="d-flex flex-row justify-content-start">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                    alt="avatar 1"
                                                    style={{width: "45px", height: "100%"}}
                                                />
                                                <div>
                                                    <p className="small p-2 ms-3 mb-1 rounded-3"
                                                       style={{backgroundColor: "#f5f6f7"}}>
                                                        Hi!
                                                    </p>
                                                    <p className="small ms-3 mb-3 rounded-3 text-muted float-end"
                                                       style={{width: "100%"}}>
                                                        12:00 PM | Aug 13
                                                    </p>
                                                </div>
                                            </div>
                                            {/* Add more chat content as needed */}
                                        </div>
                                        <div className="d-flex flex-row justify-content-end">
                                            <div>
                                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                                    Ut enim ad minima veniam, quis nostrum exercitationem
                                                    ullam corporis suscipit laboriosam, nisi ut aliquid ex
                                                    ea commodi consequatur?
                                                </p>
                                                <p className="small me-3 mb-3 rounded-3 text-muted">
                                                    12:00 PM | Aug 13
                                                </p>
                                            </div>
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                alt="avatar 1"
                                                style={{width: "45px", height: "100%"}}
                                            />
                                        </div>
                                        <div
                                            className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
                                            style={{
                                                position: 'absolute', top: '200px', width: '60%'// Khoảng cách từ cạnh trên
                                            }}>
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                                alt="avatar 3"
                                                style={{width: "40px", height: "100%"}}
                                            />
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="exampleFormControlInput2"
                                                placeholder="Type message"
                                            />
                                            <a className="ms-1 text-muted" href="#!">
                                                {/*<MDBIcon fas icon="paperclip"/>*/}
                                                <img src="https://cdn-icons-png.flaticon.com/128/659/659774.png" alt=""
                                                     style={{width: '30px', height: '30px'}}/>

                                            </a>
                                            <a className="ms-3 text-muted" href="#!">
                                                <MDBIcon fas icon="smile"/>
                                                <img src="https://cdn-icons-png.flaticon.com/128/4989/4989500.png" alt=""
                                                     style={{width: '30px', height: '30px'}}/>
                                            </a>
                                            <a className="ms-3" href="#!">
                                                {/*<MDBIcon fas icon="paper-plane"/>*/}
                                                <img src="https://cdn-icons-png.flaticon.com/128/16273/16273684.png" alt=""
                                                     style={{width: '30px', height: '30px'}}/>
                                            </a>
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
    export default Home;