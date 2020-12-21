import { createStyles, makeStyles, Theme, Container, Fab, GridList, GridListTile } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useState } from 'react'
import AddNote from './components/addNote';
import Note from './interfaces/note';
import SingleNote from './components/note'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'whitesmoke',
      overflow: 'scroll'
    },
    noNotes: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addNotesButton: {
      position: 'absolute',
      zIndex: 200,
      bottom: theme.spacing(3),
      right: theme.spacing(3)
    },
    addNotesIcon: {
      marginRight: theme.spacing(1),
    },
    gridList: {
      width: '100%',
      paddingBottom: 80
      // padding: 5
    },
    gridItem: {
      padding: '10px !important',
      height: '25em !important',
    }
  })
)

const App = (props: any) => {
  const classes = useStyles()

  // Notes
  const [notes, setNotes] = useState<Note[]>([
    {
      title: 'Some Title',
      content: 'Here is some content that I want to read...',
      tags: [
        {
          label: 'Website',
          color: '#64b5f6'
        }
      ]
    }
  ])
  const addNote = (note: Note) => {
    setNotes([
      ...notes,
      note
    ])
    console.log(notes)
  }

  const removeNote = (note: Note) => {
    setNotes(notes.filter(each => each !== note))
  }

  // Modal Options
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
      setOpen(true)
  };
  const handleClose = () => {
      setOpen(false)
  }

  const getGridListCols = () => {
    if (isWidthUp('sm', props.width)) {
      return 1;
    }
    return 4;
  }

  return (
    <Container className={classes.background} maxWidth='xl'>

      {notes.length === 0 ? (
        <div className={classes.noNotes}>
          <p>No notes</p>
        </div>
      ) : (
        <GridList className={classes.gridList} cols={4}>
          {notes.map((note, index) => (
            <GridListTile className={classes.gridItem} key={index} cols={getGridListCols()}>
              <SingleNote note={note} removeNote={(note: Note) => removeNote(note)} />
            </GridListTile>
          ))}
        </GridList>
      )}

      {/* Note Modal */}
      <AddNote open={open} save={(note: Note) => {
        addNote(note)
        handleClose()
      }} handleClose={handleClose} />
      
      {/* Add Button */}
      <Fab className={classes.addNotesButton} onClick={handleOpen} color='secondary' size='medium' variant="extended">
        <AddCircle className={classes.addNotesIcon} />
        Add Note
      </Fab>

    </Container>
  )
}

export default withWidth()(App)
