import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [Channel, setChannel] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login with:', Channel, password);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="Channel" 
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
                <Link to="/home" className="button" type="submit">Login</Link>
            </form>
        </div>
    );
}

export default Login;
