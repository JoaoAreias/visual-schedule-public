import Fab from '@mui/material/Fab';
import Remove from '@mui/icons-material/Remove';


function RemoveActivityButtom(props){
    
    return (
        <Fab size="large"  color="error" onClick={props.onClick}>
            <Remove />
        </Fab>
    )
}

export default RemoveActivityButtom;