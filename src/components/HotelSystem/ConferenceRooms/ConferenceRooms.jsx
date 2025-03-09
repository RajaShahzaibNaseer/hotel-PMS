import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import DataTableForm from "../../UI/DataTableForm";
import { API_URL } from "../../../config";

const ConferenceRooms = () => {

    const [conferenceRooms, setConferenceRooms] = useState([]);
    const [conferenceroomname, setconferenceroomname] = useState("");
    const [conferenceroomdesc, setconferenceroomdesc] = useState("");
    const navigate = useNavigate();

    //adding blocks
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
        const body = { conferenceroomname, conferenceroomdesc };
        const response = await fetch(`${API_URL}/conferencerooms`, {
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

        const deleteConferenceRoom = await fetch(`${API_URL}/conferencerooms/${id}` , {
            method: "DELETE"
        });

        setConferenceRooms(conferenceRooms.filter(conferenceRoom => conferenceRoom.id !== id));

        } catch (error) {
        console.error(error.message);
        }
    }

    const getConferenceRooms = async () => {
        try {
        const response = await await fetch(`${API_URL}/conferencerooms`);
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
                    value: conferenceroomname,
                    onChange: (e) => setconferenceroomname(e.target.value),
                },
                {
                    name: "description",
                    type: "text",
                    placeholder: "Enter Description",
                    value: conferenceroomdesc,
                    onChange: (e) => setconferenceroomdesc(e.target.value),
                }
            ]}
            onFormSubmit={onSubmitForm}
            tableHeaders={["Conference Room ID", "Conference Room Name", "Conference Room Description", "Options"]}
            tableData={conferenceRooms}
            dataKeys={["id", "conferenceroomname", "conferenceroomdesc"]}
            renderActions={(row) => (
                <button
                onClick={() => deleteConferenceRoom(row.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                >
                Delete
                </button>
            )}
        />
    );
};

export default ConferenceRooms;