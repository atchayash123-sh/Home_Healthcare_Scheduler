import { useState } from 'react';
import './Clients.css';

function Clients() {
    const [clients, setClients] = useState([
        {
            id: 1,
            name: 'Arun Kumar',
            age: 45,
            phone: '9876543210',
            address: 'Coimbatore',
            service: 'Blood Collection'
        },
        {
            id: 2,
            name: 'Meena',
            age: 38,
            phone: '9876501234',
            address: 'Pollachi',
            service: 'Home Care'
        }
    ]);

    const [form, setForm] = useState({
        name: '',
        age: '',
        phone: '',
        address: '',
        service: ''
    });

    const [search, setSearch] = useState('');
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.age ||
            !form.phone.trim() || !form.address.trim() ||
            !form.service) {
            alert('Please fill all fields');
            return;
        }

        if (!/^\d{10}$/.test(form.phone)) {
            alert('Enter a valid 10-digit phone number');
            return;
        }

        if (Number(form.age) < 1 || Number(form.age) > 120) {
            alert('Enter a valid age');
            return;
        }

        if (editId !== null) {
            setClients(clients.map(client =>
                client.id === editId
                    ? { ...form, id: editId }
                    : client
            ));
            setEditId(null);
        } else {
            setClients([
                ...clients,
                { ...form, id: Date.now() }
            ]);
        }

        setForm({
            name: '',
            age: '',
            phone: '',
            address: '',
            service: ''
        });
    };

    const handleEdit = (client) => {
        setForm({
            name: client.name,
            age: client.age,
            phone: client.phone,
            address: client.address,
            service: client.service
        });

        setEditId(client.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this client?')) {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.phone.includes(search)
    );

    return (
        <div className="clients-page">
            <h1>Client Management</h1>
            <p>Register and manage healthcare clients</p>

            <div className="client-form">
                <h2>{editId !== null ? 'Edit Client' : 'Add New Client'}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Client Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        min="1"
                        max="120"
                        value={form.age}
                        onChange={handleChange}
                    />

                    <input
                        name="phone"
                        type="tel"
                        placeholder="10-digit Phone Number"
                        maxLength="10"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                    />

                    <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                    >
                        <option value="">Select Service</option>
                        <option>Blood Collection</option>
                        <option>Home Care</option>
                        <option>Lab Test</option>
                        <option>General Checkup</option>
                        <option>Sample Collection</option>
                    </select>

                    <button type="submit">
                        {editId !== null ? 'Update Client' : 'Add Client'}
                    </button>

                    {editId !== null && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => {
                                setEditId(null);
                                setForm({
                                    name: '',
                                    age: '',
                                    phone: '',
                                    address: '',
                                    service: ''
                                });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            <div className="client-list">
                <h2>Registered Clients</h2>

                <input
                    className="search-box"
                    placeholder="Search by name or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Service</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredClients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.age}</td>
                                    <td>{client.phone}</td>
                                    <td>{client.address}</td>
                                    <td>{client.service}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(client)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(client.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredClients.length === 0 && (
                                <tr>
                                    <td colSpan="6">No clients found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Clients;