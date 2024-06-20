import React from 'react';
import Login from './components/Login';
import { Routes, Route, Navigate} from 'react-router-dom'
import SignUp from "./components/SignUp";

const App: React.FC = () => {
    return (

        <div className="App">
            <main>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={<Navigate to="/login" />} />
                    {/*Điều hướng về trang login khi truy cập trang chính*/}
                </Routes>
            </main>
        </div>

    );
};

export default App;
