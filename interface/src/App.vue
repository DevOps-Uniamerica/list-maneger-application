<template>
  <div class="container">
    <div>
      <div class="img-input">
        <img src="./assets/imagem_2025-02-13_192453217-removebg-preview.png" alt="">
      
        <div class="input-container">
          <input v-model="newTask" type="text" placeholder="Adicione uma nova tarefa" />
          <button @click="addTask">CRIAR <span class="mais">+</span></button>
        </div>
      </div>

      <!-- Contadores -->
      <div class="task-counters">
        <span class="tasks-created">Tarefas criadas <strong>{{ tasks.length }}</strong></span>
        <span class="tasks-completed">Concluídas <strong>{{ completedTasks }}</strong></span>
      </div>

      <div class="align-check">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { Task } from "../src/models/task";

const newTask = ref("");
const tasks = ref<Task[]>([]);

// Computed para contar tarefas concluídas
const completedTasks = computed(() => tasks.value.filter(task => task.concluido).length);

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
  justify-content: center !important;
  align-items: start !important;
  text-align: center;
  font-family: Arial, sans-serif;
  width: 100%;
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
  width: 600px;
  height: 30px;
}
.img-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  background-color: #F0EDF2;
  padding-top: 50px;
}

button {
  background-color: #6F3CC3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100px;
}

.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 50%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 2px solid #9359F3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.checkbox:checked {
  background-color: #479C6E;
  border-color: #479C6E;
  transition: 0.5s;
}

.checkbox:checked::after {
  content: "✔";
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  position: absolute;
}

button.delete-button {
  background-color: #E0DCE4;
  color: rgb(0, 0, 0);
  margin-left: 10px;
  border-radius: 10%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: x-large;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #E0DCE4;
  color: #6B6572 !important;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 600px;
}

li.concluido {
  background: #ffffff;
  color: #000000;
  border: 1px solid #D1CBD7;
}

li.concluido button.delete-button {
  background-color: #fdfdfd;
}

.task-label {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
}

.task-text {
  font-size: 16px;
}

.completed {
  color: #a0a0a0;
  opacity: 0.6;
}

.align-check {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

/* Estilização dos contadores */
.task-counters {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin: 20px auto;
  font-size: 16px;
}

.tasks-created {
  color: #9359F3;
  font-weight: bold;
}

.tasks-completed {
  color: #479C6E;
  font-weight: bold;
}

.mais {
  font-size: 18px;
}
</style>
