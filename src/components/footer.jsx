import { Grid, Paper, Dialog } from '@mui/material';
import { useState } from 'react';

import AddActivityButtom from './add-activity-buttom';
import RemoveActivityButtom from './remove-activity-buttom';
import AddActivityCard from './add-activity-card';


function Footer(props) {
  const [addActivityDialog, setAddActivityDialog] = useState(false);
  const [removeActivity, setRemoveActivity] = props.removeActivities;

  return (
    <>
    <Dialog open={addActivityDialog} onClose={() => setAddActivityDialog(false)} maxWidth={false}>
      <AddActivityCard close={() => setAddActivityDialog(false)} user={props.user}/>
    </Dialog>

    <Paper sx={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, 
        background: 'transparent', padding: '10px'
    }}>
        <Grid container justifyContent="center">
            <Grid item>
                <AddActivityButtom onClick={() => setAddActivityDialog(true)}/> &nbsp;
                <RemoveActivityButtom onClick={() => setRemoveActivity(!removeActivity)}/>
            </Grid> 
        </Grid>
    </Paper>
    </>
  );
}

export default Footer;