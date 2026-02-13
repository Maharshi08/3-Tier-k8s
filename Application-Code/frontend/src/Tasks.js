import { Component } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "./services/taskServices";

class Tasks extends Component {
    _isMounted = false;

    state = { tasks: [], currentTask: "" };

    normalizeTasks = (data) => {
        return Array.isArray(data) ? data : [];
    };

    async componentDidMount() {
        this._isMounted = true;
        try {
            const { data } = await getTasks();
            if (this._isMounted) {
                this.setState({ tasks: this.normalizeTasks(data) });
            }
        } catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTask({ task: this.state.currentTask });
            const { data } = await getTasks();
            this.setState({
                tasks: this.normalizeTasks(data),
                currentTask: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    handleUpdate = async (currentTask) => {
        const originalTasks = this.normalizeTasks(this.state.tasks);
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === currentTask);
            if (index === -1) return;
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            this.setState({ tasks });
            await updateTask(currentTask, {
                completed: tasks[index].completed,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (currentTask) => {
        const originalTasks = this.normalizeTasks(this.state.tasks);
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({ tasks });
            await deleteTask(currentTask);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;
