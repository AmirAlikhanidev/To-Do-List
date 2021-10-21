import axios from 'axios'
import Swal from 'sweetalert2'
const task = {
    namespaced: true,
    state: {
        tasks: [],
    },
    getters: {
        allTasks(state) {
            return state.tasks;
        },
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        newTask(state, task) {
            state.tasks.unshift(task);
        },
        updateTask(state, updateTask) {
            const index = state.tasks.findIndex((task) => task.id == updateTask.id);
            if (index != -1) {
                state.tasks.splice(index, 1, updateTask);
            }
        },
        removeTask(state, id) {
            state.tasks = state.tasks.filter((task) => task.id != id);
        },
    },
    actions: {
        async fetchTasks({ commit }) {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/todos"
                );
                commit("setTasks", response.data);
                console.log(response);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "API in not succes",
                });
            }
        },

        async filterTask({ commit }, limit) {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
                );
                commit("setTasks", response.data);
                console.log(response);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "API in not succes",
                });
            }
        },

        async storeTask({ commit }, title) {
            try {
                const response = await axios.post(
                    "https://jsonplaceholder.typicode.com/todos", {
                        title: title,
                        completed: false,
                    }
                );
                commit("newTask", response.data);
                Swal.fire({
                        title: "Task Added",
                        icon: "success",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 5000,
                        toast: true,
                        position: "top",
                    }),
                    console.log(response);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "API in not succes",
                });
            }
        },

        async updateTask({ commit }, task) {
            try {
                const response = await axios.put(
                    `https://jsonplaceholder.typicode.com/todos/${task.id}`, {
                        id: task.id,
                        title: task.title,
                        completed: !task.completed,
                    }
                );
                commit("updateTask", response.data);
                Swal.fire({
                        title: "Task Updated",
                        icon: "success",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 5000,
                        toast: true,
                        position: "top",
                    }),
                    console.log(response);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "API in not succes",
                });
            }
        },

        async deleteTask({ commit }, id) {
            try {
                await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
                commit("removeTask", id);
                Swal.fire({
                        title: "Task Deleted",
                        icon: "warning",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 5000,
                        toast: true,
                        position: "top",
                    }),
                    console.log(id);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "API in not succes",
                });
            }
        },
    },
};
export default task;