import { Avatar, Button, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import React, { useState } from 'react'
import Tag from '../interfaces/tag'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    setTagRoot: {
        border: '0.2px solid black',
        padding: 15,
        borderRadius: 5
    },
    title: {
        width: '100%',
        padding: 0,
        margin: 0
    },
    colorTitle: {
        fontSize: 11,
        margin: 0,
        paddingLeft: 10
    },
    colorGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    colors: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    selectColor: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        margin: 1,
        cursor: 'pointer'
    },
    selectedColor: {
        opacity: 1
    },
    unselectedColor: {
        opacity: 0.25
    },
    blueColor: {
        backgroundColor: theme.palette.info.light
    },
    greenColor: {
        backgroundColor: theme.palette.success.light
    },
    redColor: {
        backgroundColor: theme.palette.error.light
    },
    orangeColor: {
        backgroundColor: theme.palette.warning.light
    },
    addButtonGrid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        paddingTop: 10
    }
  })
)

type AddTagProps = {
    add: (tag: Tag) => void
}

const AddTag: React.FC<AddTagProps> = ({ add }) => {
    const classes = useStyles()
    const [tag, setTag] = useState<Tag>({
        color: '#64b5f6',
        label: ''
    })

    const setColor = (color: string) => {
        setTag({
            ...tag,
            color: color
        })
    }

    const changeLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag({
            ...tag,
            label: event.target.value
        })
    }

    return (
        <Grid className={classes.setTagRoot} container>
            <Grid item xs={6}>
                <TextField onChange={changeLabel} value={tag.label} className={classes.title} label='Tag Name' variant="outlined" />
            </Grid>
            <Grid className={classes.colorGrid} item xs={6}>
                <p className={classes.colorTitle}>Select Color</p>
                <div className={classes.colors}>
                    <Avatar onClick={() => setColor('#64b5f6')} className={tag.color === '#64b5f6' ? `${classes.selectColor} ${classes.blueColor} ${classes.selectedColor}` : ` ${classes.selectColor} ${classes.blueColor} ${classes.unselectedColor}`} > </Avatar>
                    <Avatar onClick={() => setColor('#81c784')} className={tag.color === '#81c784' ? `${classes.selectColor} ${classes.greenColor} ${classes.selectedColor}` : ` ${classes.selectColor} ${classes.greenColor} ${classes.unselectedColor}`} > </Avatar>
                    <Avatar onClick={() => setColor('#ffb74d')} className={tag.color === '#ffb74d' ? `${classes.selectColor} ${classes.orangeColor} ${classes.selectedColor}` : ` ${classes.selectColor} ${classes.orangeColor} ${classes.unselectedColor}`} > </Avatar>
                    <Avatar onClick={() => setColor('#e57373')} className={tag.color === '#e57373' ? `${classes.selectColor} ${classes.redColor} ${classes.selectedColor}` : ` ${classes.selectColor} ${classes.redColor} ${classes.unselectedColor}`} > </Avatar>
                </div>
            </Grid>
            <Grid className={classes.addButtonGrid} item xs={12}>
                <Button
                    variant="contained"
                    color="secondary"
                    // className={classes.button}
                    startIcon={<Save />}
                    onClick={() => {
                        add(tag)
                        setTag({
                            color: '#64b5f6',
                            label: ''
                        })
                    }}
                >
                    Add Tag
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddTag