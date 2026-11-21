import { useState } from 'react';

const staffList = ['Priya', 'Divya', 'Karthik'];

function VisitAssignments({ visits, setVisits }) {
    const [onlyUnassigned, setOnlyUnassigned] = useState(false);
    const [message, setMessage] = useState('');

    const scheduled = visits.filter((v) => v.status === 'Scheduled');
    const unassignedCount = scheduled.filter((v) => v.staff === 'Unassigned').length;

    const assign = (visit, staff) => {
        if (staff !== 'Unassigned') {
            const clash = visits.some(
                (v) =>
                    v.id !== visit.id &&
                    v.staff === staff &&
                    v.date === visit.date &&
                    v.time === visit.time &&
                    v.status !== 'Cancelled'
            );
            if (clash) {
                setMessage(`${staff} already has a visit on ${visit.date} at ${visit.time}.`);
                return;
            }
        }
        setVisits(visits.map((v) => (v.id === visit.id ? { ...v, staff } : v)));
        setMessage('');
    };

    const shown = scheduled
        .filter((v) => !onlyUnassigned || v.staff === 'Unassigned')
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

    return (
        <section className="content">
            <h2>Visit Assignments</h2>

            <p>
                <strong>{unassignedCount}</strong> visit(s) waiting for a staff member.
            </p>

            <div className="staff-form">
                {staffList.map((s) => (
                    <span key={s}>
                        {s}: {scheduled.filter((v) => v.staff === s).length} visit(s)
                    </span>
                ))}
            </div>

            {message && <p style={{ color: '#c0392b' }}>{message}</p>}

            <label>
                <input
                    type="checkbox"
                    checked={onlyUnassigned}
                    onChange={(e) => setOnlyUnassigned(e.target.checked)}
                />{' '}
                Show only unassigned
            </label>

            <table style={{ marginTop: 15 }}>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Service</th>
                        <th>Assigned Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {shown.map((v) => (
                        <tr key={v.id}>
                            <td>{v.client}</td>
                            <td>{v.date}</td>
                            <td>{v.time}</td>
                            <td>{v.service}</td>
                            <td className={v.staff === 'Unassigned' ? 'missed' : ''}>
                                <select value={v.staff} onChange={(e) => assign(v, e.target.value)}>
                                    <option>Unassigned</option>
                                    {staffList.map((s) => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    {shown.length === 0 && (
                        <tr>
                            <td colSpan="5">No visits to show.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default VisitAssignments;