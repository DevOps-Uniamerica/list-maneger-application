<template>
  <div class="container">
    <h1><span class="logo">🚀</span> <span class="text-green">t</span><span class="text-purple">odo</span></h1>
    
    <div class="input-container">
      <input v-model="newTask" type="text" placeholder="Adicione uma nova tarefa" />
      <button @click="addTask">Criar ➕</button>
    </div>

    <ul>
      <li 
        v-for="task in tasks" 
        :key="task.id" 
        @click="toggleTask(task)" 
        :class="{ completed: task.concluido }">
        {{ task.tarefa }}
      </li>
    </ul>
  </div>
</template>

<script>
import taskService from "@/services/taskService";
import { Task } from "./models/task";

export default {
  data() {
    return {
      newTask: "",
      tasks: []
    };
  },
  methods: {
    async addTask() {
      const newTask = await taskService.addTask(this.newTask);
      if (newTask) {
        this.tasks.push(newTask);
        this.newTask = "";
      }
    },
    async fetchTasks() {
      this.tasks = await taskService.getTasks();
    },
    async toggleTask(task) {
      await taskService.toggleTaskStatus(task);
    }
  },
  mounted() {
    this.fetchTasks();
  }
};
</script>

<style>
.container {
  text-align: center;
  font-family: Arial, sans-serif;
}

.input-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
}

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: purple;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f3f3f3;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

li.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
