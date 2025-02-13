<template>
  <div class="container">
    <div>
      <img src="./assets/imagem_2025-02-13_192453217-removebg-preview.png" alt="">
    
    <div class="input-container">
      <input v-model="newTask" type="text" placeholder="Adicione uma nova tarefa" />
      <button @click="addTask">Criar ➕</button>
    </div>

    <ul>
      <li 
        v-for="task in tasks" 
        :key="task.id" 
        :class="{ concluido: task.concluido }">
        <label class="task-label">
          <input 
            type="checkbox" 
            class="checkbox" 
            :checked="task.concluido" 
            @change="toggleTask(task)" 
          />
          <span class="task-text" :class="{ completed: task.concluido }">{{ task.tarefa }}</span>
        </label>
        <button class="delete-button" @click.stop="removeTask(task.id)">🗑</button>
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Task } from "../src/models/task";

const newTask = ref("");
const tasks = ref<Task[]>([]);

onMounted(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

watch(tasks, (newTasks) => {
  localStorage.setItem("tasks", JSON.stringify(newTasks));
}, { deep: true });

const addTask = () => {
  if (!newTask.value.trim()) return;
  tasks.value.push({
    id: Date.now(),
    tarefa: newTask.value,
    concluido: false,
  });
  newTask.value = "";
};

const toggleTask = (task: Task) => {
  task.concluido = !task.concluido;
};

const removeTask = (taskId: number) => {
  tasks.value = tasks.value.filter(task => task.id !== taskId);
};
</script>

<style scoped>
.container {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  text-align: center;
  font-family: Arial, sans-serif;
}

.text-green {
  color: green;
}

.text-purple {
  color: purple;
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

.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
}

button.delete-button {
  background-color: #1e1e1e;
  color: white;
  margin-left: 10px;
  border-radius: 10%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button.delete-button:hover {
  background-color: rgb(66, 64, 64);
  color: white;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #1e1e1e;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}

.task-text {
  font-size: 16px;
  color: white;
}

.completed {
  color: #a0a0a0;
  opacity: 0.6;
}
</style>
