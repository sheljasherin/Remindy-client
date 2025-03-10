import { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("verifiedUsers")) || [];
        setVerifiedUsers(Array.isArray(storedData) ? storedData : []);
    }, []);

    const filteredUsers = verifiedUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.fatherName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-container">
            <input
                type="text"
                className="search-bar"
                placeholder="Search by Name or Father Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="details-card">
                <h2>Verified Users</h2>
                {filteredUsers.length > 0 ? (
                    <ul>
                        {filteredUsers.map((user, index) => (
                            <li key={user.id || `user-${index}`} className="details-info">
                                <strong>Name:</strong> {user.name} <br />
                                <strong>Email:</strong> {user.email } <br />
                                <strong>Birthday:</strong> {user.birthday} <br />
                                <strong>Anniversary:</strong> {user.anniversaryDate } <br />
                                <strong>Father Name:</strong> {user.fathername || user.fatherName }
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No verified users found.</p>
                )}
            </div>

            {verifiedUsers.length > 0 && (
                <div className="upcoming-events">
                    <h2>Upcoming Events</h2>
                    <ul>
                        {verifiedUsers.map((user, index) =>
                            (user.birthday || user.anniversaryDate) && (
                                <li key={user.id || `event-${index}`} className="event-info">
                                    <strong>{user.name || "Unknown"}</strong> - 
                                    {user.birthday && <span> Birthday on {user.birthday}</span>}
                                    {user.anniversaryDate && <span> Anniversary on {user.anniversaryDate}</span>}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
