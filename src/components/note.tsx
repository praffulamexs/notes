import { Button, Card, CardActionArea, CardActions, CardContent, Chip, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Note from '../interfaces/note'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardRoot: {
        height: '100%'
    },
    content: {
        height: '27em',
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        height: 25,
        fontSize: 25,
        overflow: 'hidden',
        textOverflow: 'ellipse',
        whiteSpace: 'nowrap',
    },
    cardContent: {
        marginTop: 20,
        height: '10em',
        overflow: 'scroll',
        scrollbarWidth: 'none'
    },
    tagTitle: {
        marginTop: 10,
        fontSize: 20
    },
    tags: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'scroll',
        scrollbarWidth: 'none'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    actionButton: {
        backgroundColor: theme.palette.error.main,
        color: 'white'
    }
  })
)

type NoteProps = {
    note: Note
    removeNote: (note: Note) => void
}

const SingleNote: React.FC<NoteProps> = ({ note, removeNote }) => {
    const classes = useStyles()

    return (
        <Card elevation={7} className={classes.cardRoot}>
            <CardActionArea>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        {note.title}
                    </Typography>
                    <Typography className={classes.cardContent} variant="body2" color="textSecondary" component="p">
                        {note.content}
                    </Typography>
                    {/* Tags */}
                    <Typography className={classes.tagTitle} gutterBottom variant="h6" component="h6">
                        Tags
                    </Typography>
                    <div className={classes.tags}>
                        {note.tags.map((tag, index) => {
                            return (
                                <Chip key={index} label={tag.label} style={{backgroundColor: tag.color, color: 'white', marginRight: 5, marginTop: 5}} />
                            )
                        })}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button onClick={() => removeNote(note)} variant="contained" size="medium" color="secondary">Delete</Button>
            </CardActions>
        </Card>
    )
}

export default SingleNote