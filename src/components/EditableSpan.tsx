import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string,
    onChange: (value: string) => void
}


export function EditableSpan(props: EditableSpanPropsType) {
    const [newTaskValue, setNewTaskValue] = useState(props.title)
    const [editMode, setEditMode] = useState(false)
    const changeEditMode = () => {
        setEditMode(true)
    }
    const changeViewMode = () => {
        setEditMode(false);
        props.onChange(newTaskValue)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskValue(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setNewTaskValue(e.currentTarget.value);
            changeViewMode()
        }
    }
    return editMode
        ? <TextField
            variant={'standard'}
            size={'small'}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeHandler}
            onBlur={changeViewMode}
            value={newTaskValue}
            autoFocus
            name=""
            id=""/>
        : <span
            onDoubleClick={changeEditMode}
        >
            {newTaskValue}
        </span>
}
