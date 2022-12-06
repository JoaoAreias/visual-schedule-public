import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function AddActivityButtom(props){
    
    return (
        <Fab size="large"  color="success" onClick={props.onClick}>
            <AddIcon />
        </Fab>
    )
}

export default AddActivityButtom;