import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addActivity, getPublicRoutines, getActivities } from "../../api"
import "./AddActivity.css"
import "../Activities.css"

const CreateActivity = ({ setActivities, activities }) => {
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await addActivity(nameInput, descriptionInput);

      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
        setNameInput("");
        setDescriptionInput("");
        getActivities().then((results) => {
          setActivities(results);
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = async (activityId) => {
    try {
      const result = await editActivity(activityId, descriptionInput);

      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
        setDescriptionInput("");
        getActivities().then((results) => {
          setActivities(results);
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleClick = async (activityId) => {
    const routines = await getPublicRoutines(activityId);
    navigate("/routines", { state: { routines } });
  };

  return (
    <div>
      {/* {error && <p>{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
        <input
          placeholder="Description"
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <div>
        {activities?.length ? (
          activities.map((activity) => (
            <div key={activity.id}>
              <p>{activity.name}</p>
              <p>{activity.description}</p>
              <button onClick={() => handleEdit(activity.id)}>Edit</button>
              <button onClick={() => handleClick(activity.id)}>
                See related routines
              </button>
            </div>
          ))
        ) : (
          <p>Loading activities...</p>
        )}
      </div>
    </div>
  );
};

export default CreateActivity;
