import { useState, useEffect } from "react";
import "./ConferenceRooms.css";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ConferenceRooms = () => {

    const [conferenceRooms, setConferenceRooms] = useState([]);
    const [conferenceRoomName, setConferenceRoomName] = useState("");
    const [conferenceRoomDesc, setConferenceRoomDesc] = useState("");
    const navigate = useNavigate();

    //adding blocks
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
        const body = { conferenceRoomName, conferenceRoomDesc };
        const response = await fetch("http://localhost:5000/conference", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(body),
        });
        console.log(response);
        } catch (error) {
        console.error(error.message);
        }
    }
    
    //delete blocks function
    const deleteConferenceRoom = async id =>{
        try {

        const deleteConferenceRoom = await fetch(`http://localhost:5000/conference/${id}` , {
            method: "DELETE"
        });

        setConferenceRooms(conferenceRooms.filter(conferenceRoom => conferenceRoom.conferenceroomid !== id));

        } catch (error) {
        console.error(error.message);
        }
    }

    const getConferenceRooms = async () => {
        try {
        const response = await await fetch("http://localhost:5000/conference");
        const jsonData = await response.json();

        setConferenceRooms(jsonData);
        } catch (error) {
        console.error(error.message);
        }
    }

    useEffect(() => {
        getConferenceRooms();
    });

    return (
        <div className="admin-container">
        <nav className="vertical-navbar">
            <h2>Welcome, Admin</h2>
            <form onSubmit={onSubmitForm}>
                <input type="text" name="conferenceroomname" value={conferenceRoomName} onChange={e => setConferenceRoomName(e.target.value)} />
                <input type="text" name="description" value={conferenceRoomDesc} onChange={e => setConferenceRoomDesc(e.target.value)} />
                <button type="submit">Add Data</button>
            </form>
            <button onClick={() => navigate("/admin")}>Blocks</button>
            <button onClick={() => navigate("/floors")}>Floors</button>
            <button onClick={() => navigate("/rooms")}>Rooms</button>
            <button onClick={() => navigate("/roomtypes")}>Room Types</button>
            <button onClick={() => navigate("/departments")}>Departments</button>
            <button onClick={() => navigate("/jobs")}>jobs</button>
            <button onClick={() => navigate("/services")}>Auxilary Services</button>
            <button onClick={() => navigate("/mealplanrates")}>Meal Plans</button>
            <button onClick={() => navigate("/paxrates")}>Pax Rates</button>
            <button onClick={() => navigate("/navigator")}>Go Back</button>
        </nav>
        <div className="table-container">
            <table>
            <thead>
                <tr>
                <th>Conference Room ID</th>
                <th>Conference Room Name</th>
                <th>Conference Room Description</th>
                <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {conferenceRooms.map(conferenceRoom => (
                <tr key={conferenceRoom.conferenceroomid}>
                    <td>{conferenceRoom.conferenceroomid}</td>
                    <td>{conferenceRoom.conferenceroomname}</td>
                    <td>{conferenceRoom.description}</td>
                    <td><button onClick={() => deleteConferenceRoom(conferenceRoom.conferenceroomid)}>Delete</button></td>
                </tr>
                ))
                }
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default ConferenceRooms;