import { createStyles, makeStyles, Theme, Modal, Backdrop, Fade, Paper, TextField, Chip, Button } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import React, { useState } from 'react'
import Note from '../interfaces/note'
import Tag from '../interfaces/tag'
import AddTag from './addTag'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    modalContent: {
        width: '25em',
        padding: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    addNoteTitle: {
        margin: 0,
        marginBottom: 20
    },
    title: {
        marginBottom: 20
    },
    tagsTitle: {
        // fontWeight: 800,
        fontSize: 14
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        flexWrap: 'wrap'
    },
    saveButton: {
        marginTop: 10
    }
  })
)

type AddNoteProps = {
    open: boolean
    handleClose: () => void
    save: (note: Note) => void
}

const AddNote: React.FC<AddNoteProps> = ({ open, handleClose, save }) => {
    const classes = useStyles()

    // Note
    const [note, setNote] = useState<Note>({
        title: 'Enter Title Here',
        content: 'Enter Content Here.....',
        tags: [
            { color: '#64b5f6', label: 'Tag' }
        ]
    })

    // Title
    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote({
            ...note,
            title: event.target.value
        })
    }

    // Content
    const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNote({
            ...note,
            content: event.target.value
        })
    }
    
    // Tags
    const addTag = (tag: Tag) => {
        setNote({
            ...note,
            tags: [
                ...note.tags, tag
            ]
        })
    }
    const removeTag = (tag: Tag) => {
        setNote({
            ...note,
            tags: note.tags.filter(each => each !== tag)
        })
    }

    return (
        <Modal
            aria-labelledby="add-new-note"
            aria-describedby="use this to add a new note"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper draggable={true} className={classes.modalContent} elevation={5}>
                    <h2 className={classes.addNoteTitle} >Add Note</h2>
                    <TextField className={classes.title} label="Title" onChange={changeTitle} value={note.title} variant="outlined" />
                    {/* <Divider /> */}
                    <TextField
                        label="Content"
                        multiline
                        rows={6}
                        // defaultValue="Enter the content here..."
                        onChange={changeContent} value={note.content}
                        variant="outlined"
                    />
                    <p className={classes.tagsTitle}>Tags</p>
                    <div className={classes.tagContainer}>
                        {note.tags.map((tag, index) => {
                            return (
                                <Chip key={index} label={tag.label} style={{backgroundColor: tag.color, color: 'white', marginRight: 5, marginTop: 5}} onDelete={() => removeTag(tag)} />
                            )
                        })}
                    </div>
                    <AddTag add={(tag: Tag) => addTag(tag)} />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                        onClick={() => {
                            save(note)
                            setNote({
                                title: 'Enter Title Here',
                                content: 'Enter Content Here.....',
                                tags: [
                                    { color: '#64b5f6', label: 'Tag' }
                                ]
                            })
                        }}
                        startIcon={<Save />}
                    >
                        Save Note
                    </Button>
                </Paper>
            </Fade>
      </Modal>
    )
}

export default AddNote