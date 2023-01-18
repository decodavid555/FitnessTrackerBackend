const APIURL = `https://fitnesstrac-kr.herokuapp.com/api`;

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const data = await response.json();
    console.log("my response data:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const verify = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await verify.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async (token) => {
  try {
    const response = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getPublicRoutines = async () => {
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines"
    );
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addRoutine = async (name, goal, isPublic) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      }
    );
    const result = await response.json();
    console.log("whyyyyyyyyyyyyy", result);
    return result;
  } catch (error) {
    throw error;
  }
};

export async function getUserRoutines(username, token) {
  try {
    const response = await fetch(`${APIURL}/users/${username}/routines`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutine(id, token) {
  const response = await fetch(`${APIURL}/routines/${id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

export const Logout = () => {
  localStorage.clear();
};







//                                                    ACTIVITIES START HERE

export async function getActivities() {
  try {
    const response = await fetch(`${APIURL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const activities = await response.json();
    return activities;
  } catch (error) {
    throw error;
  }
}

// export async function addActivity(token, nameInput, descriptionInput) {
//   try {
//     const response = await fetch(`${APIURL}/activities/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         name,
//         description,
//     });
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }



export const addActivity = async (name, description) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch( "https://fitnesstrac-kr.herokuapp.com/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    }
    );
  } catch (error) {
    throw error;
  }
}

export async function updateActivity(nameInput, descriptionInput, activityId) {
  try {
    const response = await fetch(`${APIURL}/activities/${activityId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput,
        description: descriptionInput,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addRoutineActivity(
  activityId,
  countInput,
  durationInput,
  routineId
) {
  try {
    const response = await fetch(
      `${APIURL}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activityId: activityId,
          count: countInput,
          duration: durationInput,
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateRoutineActivity(countInput, durationInput, rAId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${APIURL}/routine_activities/${rAId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count: countInput,
        duration: durationInput,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteRoutineActivity(rAId) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${APIURL}/routine_activities/${rAId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
