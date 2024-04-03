import { useEffect, useState } from 'react'
import CreateArea from './com/CreateArea'
import ShowNote from './com/ShowNote';
import axios, { Axios } from "axios";

function App() {

  const [ArrNotes, setArrNotes] = useState([]);
  const [cheak, setcheak] = useState(false);
  const APIURL = "http://localhost:4000";

  const addnotes = (note) => {
    
    // console.log(note)
    async function additem() {
      try {
        // console.log("addnote api called");
        const response = await axios.post(APIURL + `/addnote?Title=${note.Title}&Content=${note.Content}`);
        return response.data;

      }
      catch (err) {
        // console.log("Error in addnotes asyns function");
        console.log(err);
      }
    }

    additem().then((data) => {
      setcheak(false)
      // console.log(data);
    }).catch((err) => {
      console.log(err);
      // console.log("HEllo Error");
    })

    // setArrNotes((prevalue) => {
    //   return [...prevalue, note]
    // });
    // console.log(ArrNotes);
  }

  const handledelete = (_id) => {

    async function deletefunction() {
      try {
        const response = await axios.post(APIURL +`/delete/${_id}`);
        console.log(response.data);
        return response.data;
        
      }
      catch (err) {
        console.log(err);
        console.log("delete Error");
      }
    }

    deletefunction().then((data)=>{
      setArrNotes(data);
    }).catch((err)=>{
      console.log(err);
    })
    // console.log(id);
    // setArrNotes(ArrNotes.filter((item, index) => {
    //   return id != index;
    // }))
    // console.log(ArrNotes);
  }

  useEffect(() => {
    async function call() {
      try {
        // console.log("get APi call");
        const response = await axios.get(APIURL);
        return response.data;
      }
      catch {
        // console.log("Error IN async function call");
      }
    }

    call().then((data) => {
      // console.log(data);
      setArrNotes(data);
      setcheak(true);

    }).catch((err) => {
      console.log("Error");
    })
  }, [cheak]);
  // arrnotes

  return (
    <>
      <CreateArea addnotes={addnotes} />
      {ArrNotes.map((item, index) => {
        return (
          <ShowNote title={item.Title} content={item.Content} ondelete={handledelete} _id={item._id} />
        )
      })
      }
    </>
  )
}

export default App
