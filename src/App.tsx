import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {TasksType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import Grid2 from "@mui/material/Unstable_Grid2";
import {AppBar, Button, Grid, IconButton, Menu, Toolbar, Typography} from "@mui/material";

export type TasksState = 'all' | 'completed' | 'active';
export type ToDoListType = {
    id: string,
    title: string,
    filter: TasksState
}
type  TasksStateType = {
    [key: string]: TasksType[]
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();
    let [todoLists, setTodoLists] = useState<ToDoListType[]>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: 'all'}
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "oranges", isDone: false},
            {id: v1(), title: "bananas", isDone: false},
            {id: v1(), title: "cocoa", isDone: false},
            {id: v1(), title: "benis", isDone: false},
        ]
    })

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredArray = tasks.filter(el => el.id !== id);
        tasksObj[todoListId] = filteredArray
        setTasks({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks];
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj});
    }

    function changeFilter(value: TasksState, todoListId: string) {
        let list = todoLists.find(el => el.id === todoListId);
        if (!list) {
            return
        }
        list.filter = value;
        setTodoLists([...todoLists])
    }

    function changeStatus(taskId: string, todoListId: string) {
        let task = tasksObj[todoListId].find(el => el.id === taskId);
        if (task) {
            task.isDone = !task.isDone
            setTasks({...tasksObj})
        }
    }

    function deleteList(todoListId: string) {
        let filteredTodoLists = todoLists.filter(el => el.id !== todoListId);
        delete tasksObj[todoListId];
        setTasks({...tasksObj});
        setTodoLists(filteredTodoLists);
    }

    function addTodoList(title: string) {
        let todoList: ToDoListType = {
            id: v1(), title: title, filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        let task = tasksObj[todoListId].find(el => el.id === taskId);
        if (task) {
            task.title = title
            setTodoLists([...todoLists])
        }
    }

    function changeListTitle(todoListId: string, newTitle: string) {
        let todolist = todoLists.find(el => el.id !== todoListId);
        if (todolist)
            todolist.title = newTitle
        setTasks({...tasksObj});
    }

    return (
        <div className="App">
            <Grid2 container>
                <Grid2 container>
                    <AppBar>
                        <Toolbar>
                            <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                                <Menu open={false}/>
                            </IconButton>
                            <Typography variant={'h6'}>
                                news
                            </Typography>
                            <Button variant={'text'} color={"inherit"}>LogIn</Button>
                        </Toolbar>
                    </AppBar>
                </Grid2>
                <AddItemForm addItem={addTodoList}/>

                {
                    todoLists.map((list) => {
                        let tasksToRender: TasksType[] = tasksObj[list.id];
                        if (list.filter === 'completed') {
                            tasksToRender = tasksToRender.filter(el => el.isDone);
                        }
                        if (list.filter === 'active') {
                            tasksToRender = tasksToRender.filter(el => !el.isDone);
                        }
                        return <Todolist title={list.title}
                                         tasks={tasksToRender}
                                         filter={list.filter}
                                         removeTask={removeTask}
                                         changeFilter={changeFilter}
                                         addTask={addTask}
                                         changeStatus={changeStatus}
                                         key={list.id}
                                         id={list.id}
                                         deleteList={deleteList}
                                         changeTaskTitle={changeTaskTitle}
                                         changeListTitle={changeListTitle}
                        />

                    })
                }
            </Grid2>
        </div>
    );
}

export default App;

