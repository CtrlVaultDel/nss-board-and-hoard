// React
import React, { useContext } from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

// Context
import {CategoryContext} from "../applicationProviders/CategoryProvider.js";
import {MechanicContext} from "../applicationProviders/MechanicProvider.js";

/* ===================================================== */

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
      overflow: 'scroll',
      width: 500,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export const CardModal = ({game}) => {
    // Get Context for categories and mechanics
    const { categories } = useContext(CategoryContext);
    const { mechanics } = useContext(MechanicContext);

    let categoryNames = [];
    let mechanicNames = [];

    // Categories & Mechanics Retriever
    const retriever = (arr, type) => {
        if(type === "categories"){
            arr.forEach(category => {
                for(let j = 0; j < categories.length; j++) {
                    if(category.id === categories[j].id) categoryNames.push(categories[j].name);
                };
            });
        }
        else {
            arr.forEach(mechanic => {
                for(let j = 0; j < mechanics.length; j++) {
                    if(mechanic.id === mechanics[j].id) mechanicNames.push(mechanics[j].name);
                };
            });
        };
    };

    // If the game lists categories, get them and convert them from IDs to names
    game.categories.length > 0 ? retriever(game.categories,"categories") : categoryNames = ["No categories available"]

    // If the game lists mechanics, get them and convert them from IDs to names
    game.mechanics.length > 0 ? retriever(game.mechanics, "mechanics") : mechanicNames = ["No mechanics available"]

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
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="flex-start">
                <div className="game__categories">
                   <h3 className="game__categories__title">
                        Categories
                    </h3>
                   <ul className="game__categories__list">
                        {categoryNames.map(c => <li key={c}>{c}</li>)}
                   </ul>
                </div>
                <div className="game__mechanics">
                    <h3 className="game__mechanics__title">
                        Mechanics
                    </h3>
                    <ul className="game__mechanics__list">
                        {mechanicNames.map(m => <li key={m}>{m}</li>)}
                    </ul>
                </div>
            </Grid>
        </div>
      </div>
    );
  
    return (
        <div>
            <Button variant="contained" color="default" onClick={handleOpen}>
                Details
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    );
};