import { useState } from 'react';
import { Card, CardHeader, CardContent, Grid } from '@mui/material';
import { Fab, Fade, } from '@mui/material';
import Done from '@mui/icons-material/Done';

function ActivityListItem({data, id, removeItem, removeHandler, completeHandler}) {
    const [visible, setVisible] = useState(true);
    const timeout = 500;

    const handleDone = async () => {
        setVisible(false);
        setTimeout(() => { 
            setVisible(true);
            completeHandler(id);
        }, timeout);
    }

    // Format time
    let time = data.time.split(':');
    let timeString = '';
    if (time[0] > 12) {
        timeString = (time[0] - 12) + ':' + time[1] + ' PM';
    } else {
        timeString = time[0] + ':' + time[1] + ' AM';
    }
    

    return (
        <Fade in={visible} timeout={timeout}>
            <Card sx={{margin: "10px"}}>
                <Grid container alignItems="center" direction="row" spacing={2}>
                    <Grid item xs={4}>
                        <div style={{
                            height: "98%", width: "98%",
                            margin: "1px auto 1px auto",
                        }}>
                            <img src={data.image} style={{
                                maxWidth: "230px", maxHeight: "230px",
                                width: "100%",
                                height: "auto"
                        }}/>
                        </div>
                    </Grid>
                    <Grid item xs={8}>
                        <CardHeader title={data.title} />
                        <hr/>
                        <CardContent>
                            <b>When:</b> { timeString }
                            <Grid container justifyContent="flex-end" spacing={1} sx={{marginTop: '1vh'}}>
                                <Grid item>
                                    <Fab color="success" variant="extended" onClick={() => handleDone()} sx={{minWidth: "120px"}}>
                                        <Done /> &nbsp; Done
                                    </Fab>
                                </Grid>
                                <Fade in={removeItem} timeout={timeout} unmountOnExit={true}>
                                    <Grid item>
                                        <Fab color="error" variant="extended" onClick={() => removeHandler(id)}>
                                            X &nbsp; Remove
                                        </Fab>                                    
                                    </Grid>
                                </Fade>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid item xs={1}>
                        
                    </Grid>
                </Grid>
            </Card>
        </Fade>
    );
}

export default ActivityListItem;