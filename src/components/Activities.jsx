import React, { useEffect } from "react";
import { getActivities, addActivity } from "../api/index";
import "./Activities.css";

const Activities = ({
  loggedIn,
  activities,
  setActivities,
  nameInput,
  setNameInput,
  descriptionInput,
  setDescriptionInput,
}) => {
  useEffect(() => {
    getActivities().then((results) => {
      setActivities(results);
    });
  }, []); 

  const token = localStorage.getItem("token");
  async function handleSubmit(event) {
    event.preventDefault();
    const result = await addActivity(token, nameInput, descriptionInput);
    if (result.error) {
      alert(result.error);
    } else {
      getActivities().then((results) => {
        
        setActivities(results);
        setNameInput("");
        setDescriptionInput("");
      });
    }
  }

  if (loggedIn) {
    return (
      <div>
        <div>
          <div className="Container">
            <h1 id="LoggedInToWelcomeToActivities">Activities</h1>
            <form className="AddForm" onSubmit={handleSubmit}>
              <h2 id="LoggedInToAddNewActivity">Add A New Activity!</h2>
              <div>
                <input
                  id="AddName"
                  placeholder="Name"
                  value={nameInput}
                  onChange={(event) => {
                    setNameInput(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  id="AddDescription"
                  placeholder="Description"
                  value={descriptionInput}
                  onChange={(event) => {
                    setDescriptionInput(event.target.value);
                  }}
                />
              </div>
              <button id="AddButton" type="Submit">
                Create Activity!
              </button>
            </form>
          </div>
          <div className="activityBox">
            {activities?.length ? (
              activities.map((element) => {
                const { id, name, description } = element;
                return (
                  <div key={id} className="Activity">
                    <h4 id="activityName">{name}</h4>
                    <p id="Description">Description: {description}</p>
                  </div>
                );
              })
            ) : (
              <div> Loading Your Activities... Please Wait....</div>
            )}
          </div>
        </div>
      </div>
    );
  } 
  else {
    return (
      <div>
        <h1>Activities</h1>
        <div>
          {activities?.length ? (
            activities.map((element) => {
              const { id, name, description } = element;
              return (
                <div key={id} className="Activity">
                  <h4 id="activityName">{name}</h4>
                  <p id="Description">Description: {description}</p>
                </div>
              );
            })
          ) : (
            <div> Loading Your Personal Activities... Please Wait....</div>
          )}
        </div>
      </div>
    );
  }
};

export default Activities;
