import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agent";
import { Activity } from "../models/Activity";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(id?: string) {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  useEffect(() => {
    agents.Activities.list().then((response) => {
      const activities: Activity[] = [];
      response.forEach((a) => {
        a.date = a.date.split("T")[0];
        activities.push(a);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingComponent content="Loading app" />;
  }
  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default App;
