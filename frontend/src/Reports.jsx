import { useState } from 'react';

function Reports({ visits }) {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const filtered = visits.filter(
        (v) => (!fromDate || v.date >= fromDate) && (!toDate || v.date <= toDate)
    );

    const count = (list, status) => list.filter((v) => v.status === status).length;

    const total = filtered.length;
    const completed = count(filtered, 'Completed');
    const missed = count(filtered, 'Missed');
    const cancelled = count(filtered, 'Cancelled');
    const scheduled = count(filtered, 'Scheduled');

    const rate = (done, missedCount) =>
        done + missedCount ? Math.round((done / (done + missedCount)) * 100) + '%' : '-';

    const buildRows = (key) =>
        [...new Set(filtered.map((v) => v[key]))].map((name) => {
            const group = filtered.filter((v) => v[key] === name);
            return {
                name,
                total: group.length,
                completed: count(group, 'Completed'),
                missed: count(group, 'Missed'),
                cancelled: count(group, 'Cancelled'),
                scheduled: count(group, 'Scheduled'),
            };
        });

    const staffRows = buildRows('staff');
    const serviceRows = buildRows('service');

    const exportCsv = () => {
        const header = ['Client', 'Staff', 'Date', 'Time', 'Service', 'Status', 'Notes'];
        const lines = filtered.map((v) =>
            [v.client, v.staff, v.date, v.time, v.service, v.status, v.notes || '']
                .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
                .join(',')
        );
        const csv = [header.join(','), ...lines].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'visit-report.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const renderTable = (title, firstColumn, rows) => (
        <>
            <h3 style={{ marginTop: 30 }}>{title}</h3>
            <table>
                <thead>
                    <tr>
                        <th>{firstColumn}</th>
                        <th>Total</th>
                        <th>Completed</th>
                        <th>Missed</th>
                        <th>Cancelled</th>
                        <th>Scheduled</th>
                        <th>Completion Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.name}>
                            <td>{r.name}</td>
                            <td>{r.total}</td>
                            <td>{r.completed}</td>
                            <td>{r.missed}</td>
                            <td>{r.cancelled}</td>
                            <td>{r.scheduled}</td>
                            <td>{rate(r.completed, r.missed)}</td>
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan="7">No data for this period.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );

    return (
        <section className="content">
            <h2>Reports</h2>

            <div className="staff-form">
                <label>
                    From:{' '}
                    <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                </label>
                <label>
                    To:{' '}
                    <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </label>
                <button
                    onClick={() => {
                        setFromDate('');
                        setToDate('');
                    }}
                >
                    Clear
                </button>
                <button onClick={exportCsv} disabled={filtered.length === 0}>
                    Export CSV
                </button>
            </div>

            <section className="stats">
                <div className="card">
                    <h3>Total Visits</h3>
                    <h1>{total}</h1>
                    <p>In selected period</p>
                </div>
                <div className="card">
                    <h3>Completed</h3>
                    <h1>{completed}</h1>
                    <p>Rate: {rate(completed, missed)}</p>
                </div>
                <div className="card alert">
                    <h3>Missed</h3>
                    <h1>{missed}</h1>
                    <p>Require follow-up</p>
                </div>
                <div className="card">
                    <h3>Upcoming</h3>
                    <h1>{scheduled}</h1>
                    <p>{cancelled} cancelled</p>
                </div>
            </section>

            {renderTable('Staff Performance', 'Staff', staffRows)}
            {renderTable('Service Breakdown', 'Service', serviceRows)}
        </section>
    );
}

export default Reports;