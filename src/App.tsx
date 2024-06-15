import React from 'react';
import Login from './components/Login';
import { Routes, Route} from 'react-router-dom'
import SignUp from "./components/SignUp";

const App: React.FC = () => {
    return (

        <div className="App">
            <main>
                <Routes>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={<Login/>}/>
                </Routes>
            </main>
        </div>

    );
};

export default App;
