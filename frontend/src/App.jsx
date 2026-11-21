import CarePlans from './CarePlans';
import { useState } from 'react';
import Login from './Login';
import Clients from './Clients';
import StaffManagement from './StaffManagement';
import VisitSchedule from './VisitSchedule';
import VisitAssignments from './VisitAssignments';
import VisitCompletion from './VisitCompletion';
import Reports from './Reports';
import Settings from './Settings';

import './App.css';
const initialVisits = [
  { id: 1, client: 'Arun Kumar', staff: 'Priya', date: '2026-11-21', time: '09:00', service: 'Blood Collection', status: 'Completed' },
  { id: 2, client: 'Meena', staff: 'Divya', date: '2026-11-21', time: '10:30', service: 'Home Care', status: 'Scheduled' },
  { id: 3, client: 'Ramesh', staff: 'Unassigned', date: '2026-11-22', time: '11:30', service: 'Lab Test', status: 'Scheduled' },
];
function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('Dashboard');
  const [visits, setVisits] = useState(initialVisits);
  const menuItems = [
    'Dashboard',
    'Clients',
    'Care Plans',
    'Staff Management',
    'Visit Schedule',
    'Visit Assignments',
    'Visit Completion',
    'Reports',
    'Settings'
  ];

  const handleLogout = () => {
    setUser(null);
    setActivePage('Dashboard');
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'Clients':
        return <Clients />;

      case 'Care Plans':
        return <CarePlans />;
      case 'Staff Management':
        return <StaffManagement />;

      case 'Visit Schedule':
        return <VisitSchedule visits={visits} setVisits={setVisits} />;
      case 'Visit Assignments':
        return <VisitAssignments visits={visits} setVisits={setVisits} />;
      case 'Visit Completion':
        return <VisitCompletion visits={visits} setVisits={setVisits} />;
      case 'Reports':
        return <Reports visits={visits} />;
      case 'Settings':
        return <Settings user={user} onReset={() => setVisits(initialVisits)} />;
      case 'Dashboard':
        return (
          <>
            <section className="stats">
              <div className="card">
                <h3>Total Clients</h3>
                <h1>120</h1>
                <p>Registered clients</p>
              </div>

              <div className="card">
                <h3>Today's Visits</h3>
                <h1>32</h1>
                <p>Scheduled visits</p>
              </div>

              <div className="card">
                <h3>Completed Visits</h3>
                <h1>24</h1>
                <p>Successfully completed</p>
              </div>

              <div className="card alert">
                <h3>Missed Visits</h3>
                <h1>3</h1>
                <p>Require attention</p>
              </div>
            </section>

            <section className="content">
              <h2>Today's Visit Schedule</h2>

              <table>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Staff</th>
                    <th>Time</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Arun Kumar</td>
                    <td>Priya</td>
                    <td>09:00 AM</td>
                    <td>Blood Collection</td>
                    <td className="completed">Completed</td>
                  </tr>

                  <tr>
                    <td>Meena</td>
                    <td>Divya</td>
                    <td>10:30 AM</td>
                    <td>Home Care</td>
                    <td className="pending">Pending</td>
                  </tr>

                  <tr>
                    <td>Ramesh</td>
                    <td>Karthik</td>
                    <td>11:30 AM</td>
                    <td>Lab Test</td>
                    <td className="missed">Missed</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </>
        );

      default:
        return (
          <section className="content">
            <h2>{activePage}</h2>
            <p>
              This module is under development.
              Please check back soon.
            </p>
          </section>
        );
    }
  };

  return (
    <div className="app">

      <aside className="sidebar">
        <h2>🏥 HomeCare</h2>
        <p>Healthcare Scheduler</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item}
              className={activePage === item ? 'active' : ''}
              onClick={() => setActivePage(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">

        <header>
          <div>
            <h1>{activePage}</h1>
            <p>
              Welcome, {user.username} ({user.role})
            </p>
          </div>

          <button onClick={handleLogout}>
            Logout
          </button>
        </header>

        {renderPage()}

      </main>
    </div>
  );
}

export default App;