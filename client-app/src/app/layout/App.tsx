import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agents from "../api/agent";
import { Activity } from "../models/Activity";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (activity.id) {
      agents.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agents.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agents.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
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
        <h2>{activityStore.title}</h2>
        <Button
          content="Add exclamation!"
          positive
          onClick={activityStore.setTitle}
        ></Button>
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
          submitting={submitting}
        ></ActivityDashboard>
      </Container>
    </Fragment>
  );
}

export default observer(App);
