import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBInputGroup
} from "mdb-react-ui-kit";
import '../css/homecss.css';
import {handleLogout} from "./Logout";
import {handleSearch, handleCreateRoomChat, useChatState, handleGetUserList} from "./CreateRoom";
import {handleJoinRoomChat, useChatRoomState} from "./JoinRoom";
import {getPeopleChatRoom} from "./GetPeopleChat";
import {getRoomChatMessages} from "./GetRoomChat";
import {sendChatToPeople} from "./SendChatToPeople";
import {sendChatToRoom} from "./SendChatToRoom";


interface userList {
    id: number;
    name: string;
    type: number;
}

interface RoomDetails {
    id: number;
    name: string;
    owner: string;
    userList: userList[];
    chatData: chatData[];
}

interface chatData {
    id: number;
    name: string;
    mes: string;
    createAt: string;
}

const Home: React.FC = () => {
    const location = useLocation(); // dùng useLocation để lấy thông tin từ trang trước
    const state = location.state as { successMessage?: string };
    const navigate = useNavigate();
    const [user, setUser] = useState<{ username: string; avatar: string } | null>(null);
    const [roomNames, setRoomNames] = useState<string[]>([]);
    const [userNames, setUserNames] = useState<string[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);
    const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
    const [peopleChatData, setPeopleChatData] = useState<chatData[]>([]);
    const [chatMessages, setChatMessages] = useState<{ text: string; timestamp: string; sender: string }[]>([]);
    const [messageValue, setMessageValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [roomType, setRoomType] = useState<number | null>(null);


    const avatars = [
        "https://cdn-icons-png.flaticon.com/128/9308/9308979.png",
        "https://cdn-icons-png.flaticon.com/128/9308/9308891.png",
        "https://cdn-icons-png.flaticon.com/128/3940/3940404.png",
        "https://cdn-icons-png.flaticon.com/128/9308/9308984.png",
        "https://cdn-icons-png.flaticon.com/128/9308/9308983.png"
    ];

// Hàm băm đơn giản để gán avatar dựa trên tên người dùng
    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Chuyển đổi thành 32bit integer
        }
        return hash;
    };

    const getUserAvatar = (name: string | undefined): string | undefined => {
        if (!name) return undefined;
        const index = Math.abs(hashCode(name)) % avatars.length;
        return avatars[index];
    };
    const {
        successMessage,
        setSuccessMessage,
        createRoomQuery,
        setCreateRoomQuery,
        addedChatRoom,
        setAddedChatRoom,
    } = useChatState();

    const {
        successMessage1,
        setSuccessMessage1,
        joinRoomQuery,
        setJoinRoomQuery,

    } = useChatRoomState();


    // const handleInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     setMessageValue(value);
    // };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        handleSearch(e, setInputValue);
    };

    React.useEffect(() => {
        if (state && state.successMessage) {
            setSuccessMessage(state.successMessage);
        }
    }, [state]);

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const storedRoomNames = localStorage.getItem('roomNames');
        if (storedRoomNames) {
            setRoomNames(JSON.parse(storedRoomNames));
        }

        const storedUserNames = localStorage.getItem('userNames');
        if (storedUserNames) {
            setUserNames(JSON.parse(storedUserNames));
        }

        handleGetUserList(setAddedChatRoom);

    }, [setAddedChatRoom]);
    useEffect(() => {
        // Polling dung de lay tin nhan moi
        const interval = setInterval(() => {
            if (currentRoom && roomType !== null) {
                if (roomType === 1) {
                    getRoomChatMessages(currentRoom, 1, (details) => {
                        setRoomDetails(details);
                        setPeopleChatData(details.chatData);
                    });
                } else if (roomType === 0) {
                    getPeopleChatRoom(currentRoom, 1, (data) => {
                        setPeopleChatData(data);
                    });
                }
            }
        }, 2500);

        return () => clearInterval(interval);
    }, [currentRoom, roomType]);


    const handleRoomClick = (roomName: string, roomType: number) => {
        setRoomType(roomType); // Lưu trữ loại phòng
        setCurrentRoom(roomName); // Cập nhật phòng hiện tại
        // Cập nhật tên phòng hiện tại
        if (roomType === 0) {
            getPeopleChatRoom(roomName, 1, (data) => {
                setPeopleChatData(data);


            });
        } else if (roomType === 1) {
            getRoomChatMessages(roomName, 1, (details) => {
                setRoomDetails(details);
                setPeopleChatData(details.chatData);


            });
        }
    };
    const handleSendMessage = () => {
            if (currentRoom && messageValue.trim() !== '') {
                if (roomType === 1) {
                    sendChatToRoom(currentRoom, messageValue, setPeopleChatData, peopleChatData, setMessageValue);
                } else if (roomType === 0) {
                    sendChatToPeople(currentRoom, messageValue, setPeopleChatData, peopleChatData, setMessageValue);
                }
            }
    };


    // Hàm kiểm tra xem loại là room hay people
    return (
        <MDBContainer fluid className="py-5" style={{backgroundColor: "#CDC4F9"}}>
            <form onClick={(event) => handleLogout(event, setSuccessMessage, navigate)} style={{
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
                <MDBCol md="12" style={{height: '600px'}}>
                    <MDBCard id="chat3" style={{borderRadius: "15px"}}>
                        <MDBCardBody style={{height: '600px'}}>
                            <MDBRow>
                                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" style={{
                                    width: '450px', height: '80%px'
                                }}>
                                    <MDBRow>
                                    <div style={{display: "flex", height: '35px'}}>
                                            <div style={{marginLeft: '10px', marginTop: '10px'}}>
                                                <p>Xin chào</p>
                                            </div>
                                            <div style={{marginLeft: '5px', marginTop: '10px', fontWeight: 'bolder'}}>
                                                {user && <p>{user.username}</p>}
                                            </div>
                                            <div style={{marginLeft: '5px'}}>
                                                {user && <img src={user.avatar} alt="Avatar" width="40" height="40"/>}
                                            </div>
                                        </div>
                                    </MDBRow>
                                    <div className="p-3">
                                        <MDBInputGroup className="rounded mb-3">
                                            <input className="form-control rounded"
                                                   value={inputValue}
                                                   onChange={handleInputChange}
                                                   placeholder="Nhập tên nhóm"
                                                   type="search"/>
                                            {/*<span className="input-group-text border-0" id="search-addon">*/}
                                            {/*    <MDBIcon fas icon="search"/>*/}
                                            {/*</span>*/}
                                            <span>
                                                     <img
                                                         src="https://cdn-icons-png.flaticon.com/128/2161/2161465.png"
                                                         alt=""
                                                         style={{
                                                             width: '45px',
                                                             height: '45px',
                                                             marginLeft: '20px',
                                                             marginTop: '5px'
                                                         }} // Chỉnh kích thước ảnh
                                                         onClick={(event) =>
                                                             handleCreateRoomChat(inputValue, addedChatRoom, setAddedChatRoom, setCreateRoomQuery)}
                                                     />
                                            </span>
                                            <span>
                                                     <img
                                                         src="https://cdn-icons-png.flaticon.com/128/7988/7988991.png"
                                                         alt=""
                                                         style={{
                                                             width: '60px',
                                                             height: '60px',
                                                             marginLeft: '15px'
                                                         }} // Chỉnh kích thước ảnh
                                                         onClick={() => handleJoinRoomChat(inputValue, setJoinRoomQuery)}
                                                     />
                                            </span>
                                        </MDBInputGroup>

                                        <div className="custom-scrollbar"
                                             style={{maxHeight: '450px', overflowY: 'auto'}}>
                                            <MDBTypography listUnStyled className="mb-0">
                                                {/* Hiển thị danh sách thành viên*/}
                                                {addedChatRoom.map((room, index) => (
                                                    <li key={index} className="p-2 border-bottom">
                                                        {/*// index: số thứ tự thành viên*/}
                                                        <a href="#!" className="d-flex justify-content-between"
                                                           style={{textDecorationLine: 'none'}}>
                                                            <div className="d-flex flex-row">
                                                                <div>
                                                                    <img
                                                                        src={getUserAvatar(room.name)} // Use modulus to loop through avatars
                                                                        alt={`Avatar of ${room.name}`}
                                                                        // src={getRandomAvatar()} // Gọi hàm để lấy URL ngẫu nhiên từ mảng avatars
                                                                        // alt="avatar"
                                                                        className="d-flex align-self-center me-3 rounded-circle mb-4"
                                                                        width="50"

                                                                    />
                                                                    <span className="badge bg-success badge-dot"></span>
                                                                </div>
                                                                <div className="pt-1"
                                                                     onClick={() => handleRoomClick(room.name, room.type)}>
                                                                    <p className="fw-bold mb-0">{room.name}</p>
                                                                    <p className="text-muted mb-0">
                                                                        {room.type === 0 ? 'Người dùng' : room.type === 1 ? 'Nhóm' : 'Unknown'}
                                                                    </p>
                                                                    {/*<p className="text-muted mb-0">User {index + 1}</p> /!* Numbering users *!/*/}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </li>
                                                ))}
                                            </MDBTypography>
                                        </div>
                                    </div>
                                </MDBCol>
                                <MDBCol md="6" lg="7" xl="8" style={{
                                    width: '800px', maxHeight: '490px', overflowY: 'auto'
                                }}>
                                    <MDBRow>
                                        <div style={{
                                            height: '20px',
                                            fontSize: '3px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: '10px'
                                        }}>
                                            {currentRoom && <h5> {currentRoom}</h5>}
                                        </div>

                                    </MDBRow>

                                    {/* Danh sách tin nhắn */}
                                    <div className="custom-scrollbar chat-content">
                                        {peopleChatData?.slice().reverse().map((message, index) => (
                                            // dao chieu mang de hien thi tin nhan moi nhat o duoi
                                            <div key={index}
                                                 className={`d-flex flex-row ${message.name === user?.username ? 'justify-content-end' : 'justify-content-start'}`}>
                                                {message.name !== user?.username && (
                                                    // Nếu tin nhắn không phải của người dùng hiện tại thì hiển thị hiển thị avatar của người gửi bên trái.
                                                    <div style={{
                                                        marginTop: '-20px',
                                                        fontSize: '12px',
                                                        height: '100px',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        <span>{message.name}</span> <br/>
                                                        <img
                                                            src={getUserAvatar(message.name)} // Use modulus to loop through avatars
                                                            alt={`Avatar of ${message.name}`}
                                                            // src={getRandomAvatar()} // Gọi hàm để lấy URL ngẫu nhiên từ mảng avatars
                                                            // alt="avatar"
                                                            className="d-flex align-self-center me-3 rounded-circle mb-4"
                                                            width="40"

                                                        />
                                                    </div>


                                                )}

                                                <div>

                                                    <p className={`small p-2 ${message.name === user?.username ? 'me-3 mb-1 text-white rounded-3 bg-primary' : 'ms-3 mb-1 rounded-3'}`}
                                                       style={{backgroundColor: message.name !== user?.username ? '#f5f6f7' : undefined}}>
                                                        {message.mes}
                                                    </p>
                                                    <p className={`small ${message.name === user?.username ? 'me-3 mb-3 text-muted' : 'ms-3 mb-3 text-muted float-end'}`}>
                                                        {message.createAt}
                                                    </p>
                                                </div>
                                                {message.name === user?.username && (
                                                    // Nếu tin nhắn của người dùng hiện tại thì hiển thị avatar của người dùng bên phải.
                                                    <div>
                                                        {user && <img src={user.avatar} alt="Avatar" width="40"
                                                                      height="40"/>}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
                                        style={{
                                            position: 'absolute', top: '85%', width: '60%'// Khoảng cách từ cạnh trên
                                        }}>
                                        <div>
                                            {user && <img src={user.avatar} alt="Avatar" width="40" height="40"/>}
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleFormControlInput2"
                                            value={messageValue}
                                            onChange={(e) => setMessageValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSendMessage();
                                                }
                                            }}
                                            placeholder="Nhập tin nhắn..."
                                        />
                                        <a className="ms-1 text-muted" href="#!">
                                            {/*<MDBIcon fas icon="paperclip"/>*/}
                                            <img src="https://cdn-icons-png.flaticon.com/128/659/659774.png" alt=""
                                                 style={{width: '30px', height: '30px'}}/>

                                        </a>
                                        <a className="ms-3 text-muted" href="#!">
                                            <img src="https://cdn-icons-png.flaticon.com/128/4989/4989500.png" alt=""
                                                 style={{width: '30px', height: '30px'}}/>
                                        </a>
                                        <a className="ms-3" href="#!" onClick={handleSendMessage}>
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