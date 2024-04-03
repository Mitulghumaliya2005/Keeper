import { useState } from "react";

export default function CreateArea({ addnotes }) {

    const [Notes, setNotes] = useState({
        Title: "",
        Content: "",
    })

    const handleNotes = (Event) => {
        setNotes((crr) => {
            return { ...crr, [Event.target.name]: Event.target.value }
        })
    }

    const SubmitNotes = (Event) => {
        setNotes({
            Title: "",
            Content: "",
        })
        addnotes(Notes);
        // console.log(Notes);
        Event.preventDefault();
    }
    return (
        <div>
            <form>
                <input
                    placeholder="Title"
                    onChange={handleNotes}
                    value={Notes.Title}
                    name="Title"
                />
                <br /><br />
                <textarea
                    placeholder="Note..."
                    onChange={handleNotes}
                    value={Notes.Content}
                    name="Content"
                />
                <br /><br />
                <button onClick={SubmitNotes}>Add Note!</button>
                <br />
                <br />
            </form>
        </div>
    )
}