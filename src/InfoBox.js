import React from 'react';
import './InfoBox.css';
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox({title,cases, total, active, isRed, ...props}) {
    return (
        <Card className={`infobox ${active && 'infobox--selected'} ${isRed && 'infobox--red'}`} 
            onClick={props.onClick}>
            <CardContent>
                <Typography className='infobox__title' color='textSecondary'>
                   <strong> {title} </strong>
                </Typography>
                <h1 className={`infobox__cases ${!isRed && 'infobox__cases--green'}`}>{cases}</h1>
                <Typography className='infobox__total' color='textSecondary'>
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
