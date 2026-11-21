import { useState } from 'react';

const initialStaff = [
    { id: 1, name: 'Priya', role: 'Nurse', phone: '9876543210', status: 'Active' },
    { id: 2, name: 'Divya', role: 'Caregiver', phone: '9876501234', status: 'Active' },
    { id: 3, name: 'Karthik', role: 'Lab Technician', phone: '9123456780', status: 'Inactive' },
];

function StaffManagement() {
    const [staff, setStaff] = useState(initialStaff);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ name: '', role: 'Nurse', phone: '' });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim()) return;

        setStaff([
            ...staff,
            { id: Date.now(), ...form, name: form.name.trim(), status: 'Active' },
        ]);
        setForm({ name: '', role: 'Nurse', phone: '' });
    };

    const toggleStatus = (id) =>
        setStaff(
            staff.map((s) =>
                s.id === id
                    ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
                    : s
            )
        );

    const removeStaff = (id) => setStaff(staff.filter((s) => s.id !== id));

    const filtered = staff.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="content">
            <h2>Staff Management</h2>

            <form className="staff-form" onSubmit={handleAdd}>
                <input
                    name="name"
                    placeholder="Staff name"
                    value={form.name}
                    onChange={handleChange}
                />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option>Nurse</option>
                    <option>Caregiver</option>
                    <option>Lab Technician</option>
                    <option>Physiotherapist</option>
                </select>
                <input
                    name="phone"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={handleChange}
                />
                <button type="submit">Add Staff</button>
            </form>

            <input
                className="staff-search"
                placeholder="Search by name or role..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((s) => (
                        <tr key={s.id}>
                            <td>{s.name}</td>
                            <td>{s.role}</td>
                            <td>{s.phone}</td>
                            <td className={s.status === 'Active' ? 'completed' : 'missed'}>
                                {s.status}
                            </td>
                            <td>
                                <button onClick={() => toggleStatus(s.id)}>
                                    {s.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>{' '}
                                <button onClick={() => removeStaff(s.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td colSpan="5">No staff found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default StaffManagement;