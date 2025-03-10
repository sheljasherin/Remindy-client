import { useEffect, useState } from "react";
import './AdminDashboard.css'
const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [deletedUsers, setDeletedUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/admin/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Error:", error));
    }, []);

    const Delete = (user) => {
        setDeletedUsers([...deletedUsers, user]);
        setUsers(users.filter(u => u.id !== user.id));
   
        const storedUsers = JSON.parse(localStorage.getItem("verifiedUsers")) || [];
        const updatedUsers = storedUsers.filter(u => u.id !== user.id);
        localStorage.setItem("verifiedUsers", JSON.stringify(updatedUsers));
    };
    

    const Restore = (user) => {
        setUsers([...users, user]);
        setDeletedUsers(deletedUsers.filter(u => u.id !== user.id));
    };

    const Verify = (userId) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, verified: true } : user
        ));
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Admin dashboard</h1>

            <div className="w-full max-w-4xl">
                <div className="overflow-x-auto">
                    <table className="w-full border text-center rounded-lg">
                        <thead>
                            <tr >
                                <th className=" p-3">id</th>
                                <th className=" p-3">name</th>
                                <th className="p-3">fathername</th>
                                <th className=" p-3">Birthday</th>
                                <th className=" p-3">Anniversary</th>
                                <th className=" p-3">current Status</th>
                                <th className=" p-3">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} >
                                    <td className=" p-3">{user.id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.fatherName}</td>
                                    <td className=" p-3">{user.birthday }</td>
                                    <td className=" p-3">{user.anniversaryDate }</td>
                                    <td className="p-3">{user.verified ? "verified" : "not verified"}</td>
                                    <td className=" p-3 space-x-2">
                                        {!user.verified && (
                                            <button onClick={() => Verify(user.id)} className="bg-green-500 text-white px-3 py-1 rounded">
                                                Verify
                                            </button>
                                        )}
                                        <button onClick={() => Delete(user)} className="bg-red-500 text-white px-3 py-1 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {deletedUsers.length > 0 && (
                <div className="w-full max-w-2xl mt-8">
                    <h2 className=" text-center mb-4">Deleted Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full  text-center ">
                            <thead>
                                <tr className="">
                                    <th className=" p-3">id</th>
                                    <th className=" p-3">name</th>
                                    <th className=" p-3">actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedUsers.map(user => (
                                    <tr key={user.id} >
                                        <td className="p-3">{user.id}</td>
                                        <td className=" p-3">{user.name}</td>
                                        <td className=" p-3">
                                            <button onClick={() => Restore(user)} className="bg-blue-500 text-white w-50 px-3 py-1 rounded">
                                                Restore
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
