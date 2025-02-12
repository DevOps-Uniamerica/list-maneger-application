<template>
  <div class="container">
    <h1><span class="logo">🚀</span> <span class="text-green">t</span><span class="text-purple">odo</span></h1>
    
    <div class="input-container">
      <input v-model="newTask" type="text" placeholder="Adicione uma nova tarefa" />
      <button @click="addTask">Criar ➕</button>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">{{ task.description }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      newTask: "",
      tasks: [],
      apiUrl: "http://localhost:3000/tasks",
    };
  },
  methods: {
    async addTask() {
      if (!this.newTask.trim()) return;
      
      const task = { description: this.newTask };
      try {
        const response = await axios.post(this.apiUrl, task);
        this.tasks.push(response.data);
        this.newTask = "";
      } catch (error) {
        console.error("Erro ao adicionar tarefa", error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get(this.apiUrl);
        this.tasks = response.data;
      } catch (error) {
        console.error("Erro ao buscar tarefas", error);
      }
    },
  },
  mounted() {
    this.fetchTasks();
  },
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
}
</style>
