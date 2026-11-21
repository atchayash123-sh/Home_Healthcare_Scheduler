import { useState } from 'react';

const clients = ['Arun Kumar', 'Meena', 'Ramesh'];
const staffList = ['Unassigned', 'Priya', 'Divya', 'Karthik'];
const services = ['Blood Collection', 'Home Care', 'Lab Test', 'Physiotherapy'];

const emptyForm = {
    client: clients[0],
    staff: staffList[0],
    date: '',
    time: '',
    service: services[0],
};

function VisitSchedule({ visits, setVisits }) {
    const [form, setForm] = useState(emptyForm);
    const [filterDate, setFilterDate] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!form.date || !form.time) {
            setError('Please select a date and time.');
            return;
        }

        const clash =
            form.staff !== 'Unassigned' &&
            visits.some(
                (v) =>
                    v.staff === form.staff &&
                    v.date === form.date &&
                    v.time === form.time &&
                    v.status !== 'Cancelled'
            );
        if (clash) {
            setError(`${form.staff} already has a visit at that time.`);
            return;
        }

        setVisits([...visits, { id: Date.now(), ...form, status: 'Scheduled' }]);
        setForm(emptyForm);
        setError('');
    };

    const updateStatus = (id, status) =>
        setVisits(visits.map((v) => (v.id === id ? { ...v, status } : v)));

    const shown = visits
        .filter((v) => !filterDate || v.date === filterDate)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    const statusClass = (s) =>
        s === 'Completed'
            ? 'completed'
            : s === 'Cancelled' || s === 'Missed'
                ? 'missed'
                : 'pending';

    return (
        <section className="content">
            <h2>Visit Schedule</h2>

            <form className="staff-form" onSubmit={handleAdd}>
                <select name="client" value={form.client} onChange={handleChange}>
                    {clients.map((c) => <option key={c}>{c}</option>)}
                </select>
                <select name="staff" value={form.staff} onChange={handleChange}>
                    {staffList.map((s) => <option key={s}>{s}</option>)}
                </select>
                <input type="date" name="date" value={form.date} onChange={handleChange} />
                <input type="time" name="time" value={form.time} onChange={handleChange} />
                <select name="service" value={form.service} onChange={handleChange}>
                    {services.map((s) => <option key={s}>{s}</option>)}
                </select>
                <button type="submit">Schedule Visit</button>
            </form>

            {error && <p style={{ color: '#c0392b' }}>{error}</p>}

            <label>
                Filter by date:{' '}
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </label>
            {filterDate && (
                <button onClick={() => setFilterDate('')} style={{ marginLeft: 8 }}>
                    Clear
                </button>
            )}

            <table style={{ marginTop: 15 }}>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Staff</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {shown.map((v) => (
                        <tr key={v.id}>
                            <td>{v.client}</td>
                            <td>{v.staff}</td>
                            <td>{v.date}</td>
                            <td>{v.time}</td>
                            <td>{v.service}</td>
                            <td className={statusClass(v.status)}>{v.status}</td>
                            <td>
                                {v.status === 'Scheduled' && (
                                    <button onClick={() => updateStatus(v.id, 'Cancelled')}>
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {shown.length === 0 && (
                        <tr>
                            <td colSpan="7">No visits found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default VisitSchedule;