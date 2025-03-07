import Activity from "../Components/Activity.jsx";
import {useEffect, useState} from "react";

export default function ToDo(){
  const [activities, setActivities] = useState(() => {
    return JSON.parse(localStorage.getItem("activities")) || [];
  });
  const [currentId, setCurrentId] = useState(() => {
    return JSON.parse(localStorage.getItem("currentId")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("currentId", JSON.stringify(currentId));
  }, [currentId]);

  function createActivity(){
    let inputValue = document.querySelector("input").value;
    if (!inputValue) return;

    const newActivities = activities.slice();
    newActivities.push({id: currentId, description: inputValue, completed: false});
    document.querySelector("input").value = "";
    setCurrentId(currentId + 1);
    setActivities(newActivities);
  }

  function deleteActivity(id){
    const newActivities = activities.slice();
    const index = newActivities.findIndex((activity) => activity.id === id);
    newActivities.splice(index, 1);
    setActivities(newActivities);
  }

  function completeActivity(id){
    const newActivities = activities.slice();
    const index = newActivities.findIndex((activity) => activity.id === id);
    newActivities[index].completed = true;
    setActivities(newActivities);
  }

  return (
    <>
      <h1>To-Do List</h1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gridGap: "20px", marginBottom: "20px" }}>
        <input type="text" placeholder="Create Activity..." style={{ fontSize: "20px" }}/>
        <button onClick={createActivity}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
      </div>

      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        {activities.map((activity) => {
          return <Activity key={activity.id}
                           description={activity.description}
                           onDelete={() => {deleteActivity(activity.id)}}
                           onComplete={() => {completeActivity(activity.id)}}
                           completed={activity.completed}/>
        })}
      </div>
    </>
  );
}