export default function ShowNote({title,content,ondelete,_id}){
    return(
        <div>
            <hr></hr>
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={()=>{ondelete(_id)}}>Delete</button>
        </div>
    )
}