import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: (username: string) => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username) {
            onLogin(username);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={{width: '100%', padding: '8px'}} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width: '100%', padding: '8px'}} />
                </div>
                <button type="submit" style={{width: '100%', padding: '10px'}}>Log In</button>
            </form>
        </div>
    );
};