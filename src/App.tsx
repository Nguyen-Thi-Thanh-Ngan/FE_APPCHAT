import React from 'react';
import Login from './components/Login';
import { Routes, Route} from 'react-router-dom'
import SignUp from "./components/SignUp";
import Home from './components/Home';

const App: React.FC = () => {
    return (

        <div className="App">
            <main>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/Home" element={<Home/>}/>
                    <Route path="/SignUp" element={<SignUp/>}/>
                </Routes>
            </main>
        </div>

    );
};

export default App;
