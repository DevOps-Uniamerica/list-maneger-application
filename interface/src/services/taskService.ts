// src/services/taskService.js
import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export default {
  async getTasks() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
      return [];
    }
  },

  async addTask(description : string) {
    if (!description.trim()) return;

    const task = { description };
    try {
      const response = await axios.post(API_URL, task);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
      return null;
    }
  }
};
