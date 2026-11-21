import { useState } from 'react';

const services = ['Blood Collection', 'Home Care', 'Lab Test', 'Physiotherapy'];

const defaultSettings = {
    orgName: 'HomeCare',
    defaultService: services[0],
    workStart: '08:00',
    workEnd: '18:00',
};

const loadSettings = () => {
    try {
        const saved = localStorage.getItem('homecare-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
};

function Settings({ user, onReset }) {
    const [settings, setSettings] = useState(loadSettings);
    const [message, setMessage] = useState('');

    const handleChange = (e) =>
        setSettings({ ...settings, [e.target.name]: e.target.value });

    const handleSave = (e) => {
        e.preventDefault();

        if (!settings.orgName.trim()) {
            setMessage('Organisation name cannot be empty.');
            return;
        }
        if (settings.workStart >= settings.workEnd) {
            setMessage('Working hours end must be later than the start.');
            return;
        }

        try {
            localStorage.setItem('homecare-settings', JSON.stringify(settings));
            setMessage('Settings saved.');
        } catch {
            setMessage('Could not save settings in this browser.');
        }
    };

    const handleDefaults = () => {
        setSettings(defaultSettings);
        try {
            localStorage.removeItem('homecare-settings');
        } catch {
            // ignore
        }
        setMessage('Settings restored to defaults.');
    };

    const handleReset = () => {
        if (window.confirm('Reset all visits to the sample data? This cannot be undone.')) {
            onReset();
            setMessage('Visits reset to sample data.');
        }
    };

    return (
        <section className="content">
            <h2>Settings</h2>

            {message && <p style={{ color: '#2c3e50' }}>{message}</p>}

            <h3>Profile</h3>
            <table>
                <tbody>
                    <tr>
                        <td>Username</td>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>{user.role}</td>
                    </tr>
                </tbody>
            </table>

            <h3 style={{ marginTop: 30 }}>Preferences</h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
                <label>
                    Organisation name
                    <input
                        name="orgName"
                        value={settings.orgName}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: 8 }}
                    />
                </label>

                <label>
                    Default service
                    <select
                        name="defaultService"
                        value={settings.defaultService}
                        onChange={handleChange}
                        style={{ display: 'block', width: '100%', padding: 8 }}
                    >
                        {services.map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Working hours start
                    <input
                        type="time"
                        name="workStart"
                        value={settings.workStart}
                        onChange={handleChange}
                        style={{ display: 'block', padding: 8 }}
                    />
                </label>

                <label>
                    Working hours end
                    <input
                        type="time"
                        name="workEnd"
                        value={settings.workEnd}
                        onChange={handleChange}
                        style={{ display: 'block', padding: 8 }}
                    />
                </label>

                <div>
                    <button type="submit">Save Settings</button>{' '}
                    <button type="button" onClick={handleDefaults}>
                        Restore Defaults
                    </button>
                </div>
            </form>

            <h3 style={{ marginTop: 30 }}>Data</h3>
            <p>Replace all visits with the original sample data.</p>
            <button onClick={handleReset}>Reset Visits</button>
        </section>
    );
}

export default Settings;