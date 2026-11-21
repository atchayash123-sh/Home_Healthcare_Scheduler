import { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Receptionist');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Please enter username and password');
            return;
        }

        setError('');

        onLogin({
            username: username,
            role: role
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h1>🏥 HomeCare</h1>
                <h2>Staff Login</h2>
                <p>Home Healthcare Visit Scheduler</p>

                <form onSubmit={handleSubmit}>

                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label>Select Staff Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option>Receptionist</option>
                        <option>Lab Technician</option>
                        <option>Pathologist</option>
                        <option>Lab Manager</option>
                    </select>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit">Login</button>

                </form>

            </div>
        </div>
    );
}

export default Login;