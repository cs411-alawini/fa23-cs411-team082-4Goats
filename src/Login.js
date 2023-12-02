import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [Channel, setChannel] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/login',
            data: {
                Channel: Channel,
                password: password
            }
        })
        .then((response) => {
            console.log('Login successful:', response.data);
            // Redirect to /home on successful login
            if (response.data == "yes"){
                navigate('/home');
            } else {
                alert("Wrong Password. Please try again.")
            }
        })
        .catch((error) => {
            if (error.response) {
                console.log('Login error:', error.response.data);
            } else {
                console.log('Error:', error.message);
            }
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}>
                <input
                    type="text"
                    placeholder="Channel"
                    value={Channel}
                    onChange={e => setChannel(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
