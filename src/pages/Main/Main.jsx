import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
const App = () => {
  const [users, setUsers] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/PersonRoute");
        setUsers(res.data);
        getUpcomingEvents(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const getUpcomingEvents = (users) => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const events = users.flatMap((user) => [
      user.birthday && new Date(user.birthday) >= today && new Date(user.birthday) <= nextWeek
        ? { type: "Birthday", name: user.name, date: user.birthday }
        : null,
      user.anniversary && new Date(user.anniversary) >= today && new Date(user.anniversary) <= nextWeek
        ? { type: "Anniversary", name: user.name, date: user.anniversary }
        : null,
    ]).filter(Boolean);

    setUpcoming(events);
  };

  return (
    <div className="main-container">
    
      <div className="details-card">
        <h2>Person Details</h2>
        {users.length ? (
          users.map((user, index) => (
            <div key={index} className="details-info">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Father:</strong>{user.father}</p>
              <p><strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : "N/A"}</p>
              <p><strong>Anniversary:</strong> {user.anniversary ? new Date(user.anniversary).toLocaleDateString() : "N/A"}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Upcoming Events Section */}
      <div className="upcoming-events">
        <h2>Upcoming Events</h2>
        {upcoming.length ? (
          upcoming.map((event, index) => (
            <div key={index} className="event-info">
              <p><strong>{event.type}:</strong> {event.name} on {new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>
    </div>
  );
};

export default App;
