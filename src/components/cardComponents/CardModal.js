// Basic Modal for Cards
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const getModalStyle = () => {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export const CardModal = ({game}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    
    const isDescription = () => {
        if(game.description_preview === ""){
            return "No description available";
        } else {
            return game.description_preview;
        };
    };
    
  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{game.name}</h2>
        <div id="simple-modal-description">
            <div className="game__description">
                {isDescription()}
            </div>
        </div>
      </div>
    );
  
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Details
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            >
            {body}
            </Modal>
        </div>
    );
};