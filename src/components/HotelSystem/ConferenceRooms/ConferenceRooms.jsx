import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";

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
        <DataTableForm
            title="Manage Conference Rooms"
            formFields={[
                {
                    name: "conferenceroomname",
                    type: "text",
                    placeholder: "Enter Conference Room Name",
                    value: conferenceRoomName,
                    onChange: (e) => setConferenceRoomName(e.target.value),
                },
                {
                    name: "description",
                    type: "text",
                    placeholder: "Enter Description",
                    value: conferenceRoomDesc,
                    onChange: (e) => setConferenceRoomDesc(e.target.value),
                }
            ]}
            onFormSubmit={onSubmitForm}
            tableHeaders={["Conference Room ID", "Conference Room Name", "Conference Room Description", "Options"]}
            tableData={conferenceRooms}
            dataKeys={["conferenceroomid", "conferenceroomname", "description"]}
            renderActions={(row) => (
                <button
                onClick={() => deleteConferenceRoom(row.conferenceroomid)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                >
                Delete
                </button>
            )}
        />
    );
};

export default ConferenceRooms;