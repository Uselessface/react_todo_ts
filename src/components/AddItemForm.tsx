import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskValue, setNewTaskValue] = useState("")
    const [error, setError] = useState(false)

    function rerenderTasks() {
        if (newTaskValue.trim() === '') {
            setError(true);
            return
        }
        props.addItem(newTaskValue)
        setNewTaskValue("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskValue(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            rerenderTasks()
        }
    }
    const addNewTask = () => rerenderTasks()
    return <div>
        <TextField
            id="outlined-basic"
            label="type value"
            variant="outlined"
            value={newTaskValue}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            error={error}
            size={'small'}
            helperText={error ? "Field is required!" : ''}
        />
        <IconButton
            onClick={addNewTask}
            color={'primary'}
        ><Add/>
        </IconButton>
    </div>
}

