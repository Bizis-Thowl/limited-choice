import { Launch } from '@mui/icons-material';
import { Paper } from '@mui/material';
import React, { useState } from 'react';


export default function VideoPlaceholder(props) {

    const {handleClickTracker, handleModalOpen, id} = props;

    const [hoverElevation, setHoverElevation] = useState(1);

    const handleHover = (value) => {
        setHoverElevation(value);
    }

    const handleClick = (e) => {
        handleModalOpen(e);
        handleClickTracker("open video " + id)
    }


    return(
        <Paper sx={{position: "relative", p: 1, '&:hover': { cursor: "pointer"}}} square
            onClick={handleClick}
            elevation={hoverElevation}
            onMouseOver={() => handleHover(3)}
            onMouseLeave={() => handleHover(1)}
        >
            <img src={props.thumbnail} alt={"Video thumbnail"} style={{width: props.width, height:props.height}}/>
            <Paper sx={{position: "absolute", top: 0, right: 0, p: 0, width: 30}} square elevation={0}>
                <Launch color="primary"/>
            </Paper>
        </Paper>
    )
}