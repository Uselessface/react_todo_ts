import React from "react";
import {TasksState} from "./App";
import {AddItemForm} from './components/AddItemForm'
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type PropsType = {
    title: string,
    tasks: TasksType[],
    removeTask: (id: string, todoListId: string) => void,
    changeFilter: (value: TasksState, todoListId: string) => void,
    addTask: (title: string, todoListId: string) => void,
    changeStatus: (id: string, todoListId: string) => void,
    filter: TasksState,
    id: string,
    deleteList: (todoListId: string) => void,
    changeTaskTitle: (task: string, title: string, todolist: string) => void
    changeListTitle: (todolist: string, title: string) => void
}

export function Todolist(props: PropsType) {
    const allTasks = () => props.changeFilter('all', props.id)
    const activeTasks = () => props.changeFilter('active', props.id)
    const completedTasks = () => props.changeFilter('completed', props.id)
    const removeList = () => props.deleteList(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeListTitle = (title: string) => {
        props.changeListTitle(props.id, title)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeListTitle}/>
                <IconButton onClick={removeList} color={'primary'}><DeleteIcon/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(el => {
                        const onClickRemove = () => {
                            props.removeTask(el.id, props.id)
                        }
                        const onChangeStatus = () => {
                            props.changeStatus(el.id, props.id)
                        }
                        const onChangeTitle = (newValue: string) => {
                            props.changeTaskTitle(el.id, newValue, props.id)
                        }
                        return (
                            <li key={el.id}>
                                <Checkbox
                                    checked={el.isDone}
                                    onChange={onChangeStatus}
                                />
                                <EditableSpan
                                    title={el.title}
                                    onChange={onChangeTitle}
                                />
                                <IconButton
                                    aria-label="delete"
                                    onClick={onClickRemove}
                                    color={'primary'}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? 'contained' : 'text'}
                    onClick={allTasks}
                    color={'info'}
                >
                    All
                </Button>
                <Button
                    variant={props.filter === "active" ? 'contained' : 'text'}
                    onClick={activeTasks}
                    color={'success'}
                >
                    Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? 'contained' : 'text'}
                    onClick={completedTasks}
                    color={'error'}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}

