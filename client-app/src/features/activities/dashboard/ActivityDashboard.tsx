import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
}
export default function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
          ></ActivityDetails>
        )}
        <ActivityForm></ActivityForm>
      </Grid.Column>
    </Grid>
  );
}
