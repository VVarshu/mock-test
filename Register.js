import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api'; // Ensure this function is correctly defined in api.js
import './login.css';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Clear previous errors

        // Simple validation before sending a request
        if (!name || !email || !phone || !password) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await registerUser({ name, email, phone, password });
            // Check for success response
            if (response && response.message) {
                alert(response.message); // Show success message
                navigate('/login'); // Redirect to login
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            // Log the error for debugging purposes
            console.error('Registration error:', err);
            setError('Registration failed. Please try again.'); // Update the error state
        }
    };

    return (
    <div className='register'>
        <div className="form-container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
        </div>
    );
};

export default Register;
