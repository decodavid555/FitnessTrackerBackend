import React from "react";
import { checkUserLoggedIn } from "./User/Login";


//routine.username?? not sure about that one. Will check later.

const SingleRoutine = ({routine, setRoutines, routines}) => {
    const handleDelete = (id) => {deleteRoutines(id, {setRoutines, routines})}

    const [show, setShow] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [[post], setPost] = useState(posts.filter((post) => post._id === id));
  const token = localStorage.token;

    console.log(routine);
    return routine && routine._id (
      <>
      <h1> Routine </h1>
      <div className="single-routine" key={routine._id}>
        <h2>{routine.title}</h2>
        <p>{routine.description}</p>
        <b>Duration: {routine.duration}</b>
        <b>Goal: {routine.goal}</b>
        <h3>Username: {routine.username}</h3> 
        <b>Count: {routine.count}</b>
        {routine.creatorId? (
          <button onClick={() => handleDelete(routine._id)}>Delete</button>
        ) : checkUserLoggedIn() ? (
        <Link to="/message-form" state={{ id: rout``._id }}>
        <button type="button">Send Message</button>
        </Link>) :
        <div></div>
        }
      </div>
      </>
    );
  };
  export default SingleRoutine;
  