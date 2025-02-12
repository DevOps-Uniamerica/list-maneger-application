// src/services/taskService.js
import type { Task } from "@/models/task";
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

  async addTask(tarefa: Task) {
    try {
      const response = await axios.post(API_URL, tarefa);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
      return null;
    }
  },

  async updateTask(id: number, tarefa: Task) {
    try {
      const response = await axios.put(API_URL + "/" + id, tarefa);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar tarefa", error);
      return null;
    }
  },

  async deleteTask(id: number) {
    try {
      const response = await axios.delete(API_URL + "/" + id);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar tarefa", error);
      return null;
    }
  }
};
