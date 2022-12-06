import { Card, Button, TextField, Grid, Fab, Alert } from '@mui/material'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import dayjs from 'dayjs';


function AddActivityCard(props){
    const [weekdays, setWeekdays] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [imageURL, setImageURL] = useState();
    const [time, setTime] = useState(dayjs());

    // Error states
    const [titleError, setTitleError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [weekdaysError, setWeekdaysError] = useState(false);
    

    const handleChange = (event, newFormats) => {
        setWeekdays(newFormats);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
            setImageURL(URL.createObjectURL(img));
        }
    };

    const validateSubmit = () => {
        let error = (title === '' || weekdays.length === 0 || time === null || image === null);
        if (!title)
            setTitleError(true);

        if (weekdays.length === 0)
            setWeekdaysError(true);

        if (!image)
            setImageError(true);

        return !error;
    }

    const refreshPage = () => {
        window.location.reload();
    }

    async function handleSubmit(event) {   
        const valid = validateSubmit();
        if (!valid)
            return;

        const img_reader = new FileReader();
        img_reader.readAsDataURL(image);
        img_reader.onload = async () => {
            const response = await fetch('/api/add-activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: props.user.id,
                    title: title,
                    time: `${time.$H}:${time.$m}`,
                    image: img_reader.result,
                    weekdays: weekdays
                })
            });
            props.close();
            refreshPage();
        }
    }

    return (
        <Card sx={{ minWidth: "100px", maxWidth: "700px"}}>
            {titleError && <Alert severity="error" onClose={() => setTitleError(false)}>Title cannot be empty</Alert>}
            {imageError && <Alert severity="error" onClose={() => setImageError(false)}>Image cannot be empty</Alert>}
            {weekdaysError && <Alert severity="error" onClose={() => setWeekdaysError(false)}>Please select at least one day</Alert>}
            <Grid container component='form' sx={{ p: 2 }}  rowSpacing={1}>
                <Grid item xs={6}>
                    <h1>Add Activity</h1>
                </Grid>
                <Grid item container xs={6} rowSpacing={2}>
                    <Grid item container xs={12}>
                        <Grid item xs={3}>
                        <b>Name: </b>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField 
                                id="standard-basic" 
                                label="Activity name" 
                                variant="standard" 
                                sx={{ width: "100%"}}
                                error={titleError}
                                onChange={(event) => setTitle(event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12}>
                        <Grid item xs={3}>
                            <b>Time: </b>
                        </Grid>
                        <Grid item xs={9}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Activity time"
                                    value={time}
                                    onChange={(newTime) => setTime(newTime)}
                                    renderInput={(params) => <TextField variant="standard" {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ToggleButtonGroup
                        value={weekdays}
                        color="primary"
                        onChange={handleChange}
                        aria-label="Days of the week"
                        fullWidth={true}
                        orientation={window.innerWidth < 600 ? "vertical" : "horizontal"}
                    >
                        <ToggleButton value="sunday">Sunday</ToggleButton>
                        <ToggleButton value="monday">Monday</ToggleButton>
                        <ToggleButton value="tuesday">Tuesday</ToggleButton>
                        <ToggleButton value="wednesday">Wednesday</ToggleButton>
                        <ToggleButton value="thursday">Thursday</ToggleButton>
                        <ToggleButton value="friday">Friday</ToggleButton>
                        <ToggleButton value="saturday">Saturday</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item container xs={12} justifyContent="center" sx={{
                    border: "1px dashed #000",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "5px"
                }}>
                    <Grid item>
                        {image ?
                            (
                                <>
                                <img src={imageURL} alt="activity" style={{height: "100px"}}/>
                                <Fab 
                                    size="small" color="error" 
                                    sx={{position: "relative", top: "-70px"}} 
                                    onClick={() => {
                                        setImage(null);
                                        setImageURL(null);
                                        }
                                }>
                                    <CloseIcon />
                                </Fab>
                                </>
                            ):
                            
                            <Button variant="contained" component="label">
                                Upload Image
                                <input type="file" accept="image/*" hidden onChange={onImageChange}/>
                            </Button>
                        }
                    </Grid>
                </Grid>
                <Grid item container justifyContent="flex-end">
                    <Grid item>
                        <Fab 
                            color="success" 
                            variant="extended" 
                            sx={{margin: "10px"}}
                            onClick={handleSubmit}
                        >
                            <AddIcon/> &nbsp;Add
                        </Fab>
                        <Fab    
                            color="error"
                            variant="extended"
                            sx={{margin: "10px"}}
                            onClick={() => props.close()}
                        >
                            <CloseIcon/> &nbsp;Cancel
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}

export default AddActivityCard;