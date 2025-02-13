// src/services/taskService.js
import axios from "axios";
import { Task } from "../models/task";

const API_URL = "http://localhost:3000/tasks";

export default {
  async getTasks() {
    try {
      const response = await axios.get(API_URL);
      return response.data.map((task:any) => new Task(task.tarefa, task.concluido));
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
      return [];
    }
  },

  async addTask(tarefa:string) {
    if (!tarefa.trim()) return;

    const newTask = new Task(tarefa, false);
    try {
      const response = await axios.post(API_URL, newTask);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
      return null;
    }
  },

  async toggleTaskStatus(task:any) {
    try {
      task.concluido = !task.concluido;
      await axios.put(`${API_URL}/${task.id}`, task);
    } catch (error) {
      console.error("Erro ao atualizar tarefa", error);
    }
  }
};
