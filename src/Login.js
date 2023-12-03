import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [Channel, setChannel] = useState('');
    const [Password, setPassword] = useState('');
    const [newChannel, setNewChannel] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/login',
            data: {
                Channel: Channel,
                password: Password
            }
        })
        .then((response) => {
            console.log('Login successful:', response.data);
            // Redirect to /home on successful login
            if ((response.data)[0] === "yes"){
                localStorage.setItem("channelName", (response.data)[1])
                localStorage.setItem("channelId", (response.data)[2])
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

    const handleRegister = () => {
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/register',
            data: {
                Channel: newChannel,
                password: newPassword
            }
        })
        .then((response) => {
            if (response.data === "Already Exists"){
                alert("Account Already Exists, Please Try a Different Channel ID!")
            } else if (response.data === "Not a Valid Channel") {
                alert("Not a Valid Channel")
            }
                else {
                localStorage.setItem("channelName", (response.data)[1])
                localStorage.setItem("channelId", (response.data)[0])
                console.log(response.data)
                alert("Registration Successful. Please Login.")
            }
            console.log('Registration successful:', response.data);
            //alert("Registration successful. Please login.");
        })
        .catch((error) => {
            if (error.response) {
                console.log('Registration error:', error.response.data);
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
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <h2>New User</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
            }}>
                <input
                    type="text"
                    placeholder="New Channel"
                    value={newChannel}
                    onChange={e => setNewChannel(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Login;
