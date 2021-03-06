// React
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

/* ===================================================== */

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export const CardRating = ({rating}) => {
    const starRating = (Math.round(rating*2))/2
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Rating 
                name="half-rating-read" 
                defaultValue={starRating} 
                precision={0.5} 
                readOnly 
            />
        </div>
    );
};