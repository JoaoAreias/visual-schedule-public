import { Grid, Paper, Dialog } from '@mui/material';
import { useState } from 'react';

import AddActivityButtom from './add-activity-buttom';
import RemoveActivityButtom from './remove-activity-buttom';
import AddActivityCard from './add-activity-card';


function Footer(props) {
  const [addActivityDialog, setAddActivityDialog] = useState(false);
  const [removeActivity, setRemoveActivity] = props.removeActivities;

  function openActivityDialog() {
    /*
    *   This function is called when the user clicks on the add activity button
    *   It opens the add activity dialog
    */
    setAddActivityDialog(true);
  }

  function closeActivityDialog() {
    /*
    *   This function is called when the user clicks on the add activity button
    *   It closes the add activity dialog
    */
    setAddActivityDialog(false);
  }

  return (
    <>
    <Dialog open={addActivityDialog} onClose={/*  THE CAT ERASED THIS LINE */} maxWidth={false}>
      <AddActivityCard close={/*  THE CAT ERASED THIS LINE */} user={props.user}/>
    </Dialog>

    <Paper sx={{ 
        position: 'fixed', bottom: 0, left: 0, right: 0, 
        background: 'transparent', padding: '10px'
    }}>
        <Grid container justifyContent="center">
            <Grid item>
                
                <AddActivityButtom onClick={/*  THE CAT ERASED THIS LINE */}/> &nbsp;
                <RemoveActivityButtom onClick={() => setRemoveActivity(!removeActivity)}/>
            </Grid> 
        </Grid>
    </Paper>
    </>
  );
}

export default Footer;