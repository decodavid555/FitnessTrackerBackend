import React, { useState } from "react";
import { updateRoutineActivity, getActivities } from "../api";


const EditRoutineActivity = ({ allActivities, setAllActivities, rAId }) => {
  const [countInput, setCountInput] = useState(0);
  const [durationInput, setDurationInput] = useState(0);

  async function handleSubmit(event) {
    event.preventDefault();
    await updateRoutineActivity(countInput, durationInput, rAId);
    const result = await getActivities();
    setAllActivities([...allActivities, result]);
    setCountInput("");
    setDurationInput("");
  }

  return (
      <div className="EditActivityBox">
        <form className="editAForm" onSubmit={handleSubmit}>
        <h4>Edit Activity: </h4>
          <div>
            <input
              id="EditCount"
              placeholder="Count"
              value={countInput}
              onChange={(event) => {
                setCountInput(event.target.value);
              }}
            />
          </div>
          <div>
            <input
              id="EditDuration"
              placeholder="Duration"
              value={durationInput}
              onChange={(event) => {
                setDurationInput(event.target.value);
              }}
            />
          </div>
          <button className="ActivityButton" id="Editbutton" type="Submit">
            SAVE
          </button>
        </form>
      </div>
  );
};

export default EditRoutineActivity;