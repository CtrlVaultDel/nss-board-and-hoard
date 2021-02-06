// React
import React, {useContext} from "react";

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import { HoardCard } from "./HoardCard.js";

// Context
import { GameContext } from "../applicationProviders/GameProvider.js";

// Styling
import "./Hoard.css";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
}));

// Takes the array of hoardGames passed in and sends each individual game to HoardCard
// so each is rendered as its own card on the DOM in the Hoard List below the Hoard Filters
export const HoardList = ({hoardGames}) => {
    const { loadingStates } = useContext( GameContext );

    const classes = useStyles();

    // If either states are still loading, render a loading animation
    if (loadingStates.userGamesLoading || loadingStates.hoardGamesLoading) {
        return (
          <div className={classes.root}>
            <CircularProgress />
          </div>
        );
    }
    // When there are hoard games
    else if(hoardGames.length){
        return (
            <div className="hoardList_games">
                {
                    hoardGames.map(hoardGame => <HoardCard 
                        key={hoardGame.id} 
                        hoardGame={hoardGame} 
                    />)
                }
            </div>
        );
    } 
    // When there are no hoard games
    else {
        return <h1 className="hoardList_games">No Games!</h1>
    }
};