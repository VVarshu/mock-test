// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { loginUser } from '../api';
import './login.css';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await loginUser({ email, password });
            if (response.token) {
                // Save the token to local storage or context
                localStorage.setItem('token', response.token);
                navigate('/dashboard'); // Redirect to dashboard or another page after successful login
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Login failed. Please try again.'); // Handle the error
        }
    };

    return (
        <div className='login-container'>
        <div className="form-container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            <p className="signup-link">
            Can't login? <Link to="/register">Sign up here</Link>
            </p>
        </div>
    </div>
    );
};

export default Login;
