import { useState } from 'react';
import './CarePlans.css';

function CarePlans() {

    const [plans, setPlans] = useState([
        {
            id: 1,
            client: 'Arun Kumar',
            careType: 'Home Care',
            description: 'Regular health monitoring',
            startDate: '2026-11-21',
            endDate: '2026-12-21',
            frequency: 'Daily',
            instructions: 'Monitor blood pressure',
            status: 'Active'
        },
        {
            id: 2,
            client: 'Meena',
            careType: 'Blood Collection',
            description: 'Regular blood testing',
            startDate: '2026-11-21',
            endDate: '2026-12-10',
            frequency: 'Weekly',
            instructions: 'Collect blood samples',
            status: 'Active'
        }
    ]);

    const [form, setForm] = useState({
        client: '',
        careType: '',
        description: '',
        startDate: '',
        endDate: '',
        frequency: '',
        instructions: '',
        status: 'Active'
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

        if (
            !form.client ||
            !form.careType ||
            !form.description.trim() ||
            !form.startDate ||
            !form.endDate ||
            !form.frequency
        ) {
            alert('Please fill all required fields');
            return;
        }

        if (form.endDate < form.startDate) {
            alert('End date cannot be before start date');
            return;
        }

        if (editId !== null) {
            setPlans(plans.map(plan =>
                plan.id === editId
                    ? { ...form, id: editId }
                    : plan
            ));
            setEditId(null);
        } else {
            setPlans([
                ...plans,
                { ...form, id: Date.now() }
            ]);
        }

        resetForm();
    };

    const resetForm = () => {
        setForm({
            client: '',
            careType: '',
            description: '',
            startDate: '',
            endDate: '',
            frequency: '',
            instructions: '',
            status: 'Active'
        });
        setEditId(null);
    };

    const handleEdit = (plan) => {
        setForm({ ...plan });
        setEditId(plan.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this care plan?')) {
            setPlans(plans.filter(plan => plan.id !== id));
        }
    };

    const filteredPlans = plans.filter(plan =>
        plan.client.toLowerCase().includes(search.toLowerCase()) ||
        plan.careType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="careplans-page">

            <h1>Care Plans Management</h1>
            <p>Create and manage healthcare care plans</p>

            <div className="care-form">

                <h2>
                    {editId !== null ? 'Edit Care Plan' : 'Create New Care Plan'}
                </h2>

                <form onSubmit={handleSubmit}>

                    <select
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                    >
                        <option value="">Select Client</option>
                        <option>Arun Kumar</option>
                        <option>Meena</option>
                        <option>Ramesh</option>
                    </select>

                    <select
                        name="careType"
                        value={form.careType}
                        onChange={handleChange}
                    >
                        <option value="">Select Care Type</option>
                        <option>Home Care</option>
                        <option>Blood Collection</option>
                        <option>Lab Test</option>
                        <option>General Checkup</option>
                        <option>Personal Care</option>
                    </select>

                    <input
                        name="description"
                        placeholder="Care Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="startDate"
                        value={form.startDate}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="endDate"
                        value={form.endDate}
                        min={form.startDate || undefined}
                        onChange={handleChange}
                    />

                    <select
                        name="frequency"
                        value={form.frequency}
                        onChange={handleChange}
                    >
                        <option value="">Select Frequency</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Twice a Week</option>
                        <option>Monthly</option>
                    </select>

                    <textarea
                        name="instructions"
                        placeholder="Special Instructions"
                        value={form.instructions}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option>Active</option>
                        <option>Completed</option>
                        <option>On Hold</option>
                    </select>

                    <button type="submit">
                        {editId !== null ? 'Update Care Plan' : 'Add Care Plan'}
                    </button>

                    {editId !== null && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}

                </form>
            </div>

            <div className="care-list">

                <h2>Registered Care Plans</h2>

                <input
                    className="care-search"
                    placeholder="Search by client or care type..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="care-table-wrapper">

                    <table>
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Care Type</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Frequency</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPlans.map(plan => (
                                <tr key={plan.id}>
                                    <td>{plan.client}</td>
                                    <td>{plan.careType}</td>
                                    <td>{plan.description}</td>
                                    <td>{plan.startDate}</td>
                                    <td>{plan.endDate}</td>
                                    <td>{plan.frequency}</td>
                                    <td className={
                                        plan.status === 'Active'
                                            ? 'active-status'
                                            : 'other-status'
                                    }>
                                        {plan.status}
                                    </td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(plan)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(plan.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredPlans.length === 0 && (
                                <tr>
                                    <td colSpan="8">No care plans found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}

export default CarePlans;