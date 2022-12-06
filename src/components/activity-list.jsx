import { Button, Grid, Paper } from '@mui/material';
import ActivityListItem from './activity-list-item';
import { useState } from 'react';




function ActivityList(props) {
  const [activities, setActivities] = useState(props.activities);

  const handleRemoveActivity = (id) => {
    const activity = activities[id];
    const newActivities = [...activities];
    newActivities.splice(id, 1)
    setActivities(newActivities);
    const response = fetch('/api/remove-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: activity.id,
        userId: props.user.id
      })
    });
  }

  const handleCompleteActivity = (id) => {
    const activity = activities[id];
    const newActivities = [...activities];
    newActivities.splice(id, 1)
    setActivities(newActivities);
    const response = fetch('/api/complete-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: activity.id,
        userId: props.user.id
      })
    });
  }
  
  activities.sort((a, b) => {
    return new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time);
  });


  return (
    <Paper variant='outlined' sx={{ 
        background: '#00000010',
        padding: '10px',
        margin: '0px',
        marginBottom: '100px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
    }}>
      <Grid container justifyContent="center" alignItems="center" className='activity-list'>
        {activities.map((activity, key) => (
          <Grid item xs={12} key={key}>
            <ActivityListItem 
              data={activity} 
              key={key} 
              id={key} 
              removeItem={props.removeActivities} 
              completeHandler={handleCompleteActivity} 
              removeHandler={handleRemoveActivity} 
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default ActivityList;
