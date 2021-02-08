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

// For Material UI Loading Circle
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
export const HoardList = ({ filteredHoardGames }) => {
    const { loadingStates, hoardGames } = useContext( GameContext );

    const classes = useStyles();
    console.log("Console logging filteredHoardGames on HoardList",filteredHoardGames)

    return hoardGames.length
        ? ( <div className="hoardList_games">
                {
                    hoardGames.map(game => <HoardCard 
                        key={game.id} 
                        hoardGame={game} 
                    />)
                }
            </div>)
        : (<div>No Games Yet</div>)
}
    // If either states are still loading, render a loading animation
//     if (loadingStates.userGamesLoading || loadingStates.hoardGamesLoading) {
//         return (
//           <div className={classes.root}>
//             <CircularProgress />
//           </div>
//         );
//     }
//     // When there are games saved
//     else if(filteredHoardGames.length > 0 && userGames.length > 0 && filteredHoardGames.length === userGames.length){
//         return (
//             <div className="hoardList_games">
//                 {
//                     filteredHoardGames.map(game => <HoardCard 
//                         key={game.id} 
//                         hoardGame={game} 
//                         userGames={userGames}
//                     />)
//                 }
//             </div>
//         );
//     } 
//     // When there are no games saved
//     else {
//         return (
//             <h1 className="hoardList_games">No Games!</h1>
//         )
//     }
// };