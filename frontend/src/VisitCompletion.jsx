import { useState } from 'react';

function VisitCompletion({ visits, setVisits }) {
    const [notes, setNotes] = useState({});
    const [message, setMessage] = useState('');

    const pending = visits
        .filter((v) => v.status === 'Scheduled')
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    const closed = visits
        .filter((v) => v.status === 'Completed' || v.status === 'Missed')
        .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

    const handleNote = (id, value) => setNotes({ ...notes, [id]: value });

    const closeVisit = (visit, status) => {
        if (visit.staff === 'Unassigned') {
            setMessage(`Assign a staff member to ${visit.client}'s visit before closing it.`);
            return;
        }

        const note = (notes[visit.id] || '').trim();
        if (status === 'Missed' && !note) {
            setMessage('Please enter a reason in the notes box for a missed visit.');
            return;
        }

        setVisits(
            visits.map((v) => (v.id === visit.id ? { ...v, status, notes: note } : v))
        );
        setNotes({ ...notes, [visit.id]: '' });
        setMessage('');
    };

    return (
        <section className="content">
            <h2>Visit Completion</h2>

            {message && <p style={{ color: '#c0392b' }}>{message}</p>}

            <h3>Pending Visits ({pending.length})</h3>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Staff</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Notes / Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pending.map((v) => (
                        <tr key={v.id}>
                            <td>{v.client}</td>
                            <td className={v.staff === 'Unassigned' ? 'missed' : ''}>{v.staff}</td>
                            <td>{v.date}</td>
                            <td>{v.time}</td>
                            <td>{v.service}</td>
                            <td>
                                <input
                                    placeholder="Add notes..."
                                    value={notes[v.id] || ''}
                                    onChange={(e) => handleNote(v.id, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => closeVisit(v, 'Completed')}>Complete</button>{' '}
                                <button onClick={() => closeVisit(v, 'Missed')}>Missed</button>
                            </td>
                        </tr>
                    ))}
                    {pending.length === 0 && (
                        <tr>
                            <td colSpan="7">No pending visits.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3 style={{ marginTop: 30 }}>Closed Visits ({closed.length})</h3>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Staff</th>
                        <th>Date</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {closed.map((v) => (
                        <tr key={v.id}>
                            <td>{v.client}</td>
                            <td>{v.staff}</td>
                            <td>{v.date}</td>
                            <td>{v.service}</td>
                            <td className={v.status === 'Completed' ? 'completed' : 'missed'}>
                                {v.status}
                            </td>
                            <td>{v.notes || '-'}</td>
                        </tr>
                    ))}
                    {closed.length === 0 && (
                        <tr>
                            <td colSpan="6">No closed visits yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default VisitCompletion;