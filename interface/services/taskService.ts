import { Task } from "../models/task";
import axios, { AxiosInstance } from "axios";

export class taskService{
    axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: "http://localhost:3000",
            headers: {"Content-type" : "application/json"}
        });
    }

    public async findAll(): Promise<Task[]> {
        try{
            return (await this.axiosClient.get<Task[]>(`/tasks`)).data;
        }
        catch(error : any){
            return Promise.reject(error.response);
        }
    }

    public async cadastrar(tarefa: Task): Promise<string> {
        try{
            return (await this.axiosClient.post<string>(`/tasks`, tarefa)).data;
        }
        catch(error : any){
            return Promise.reject(error.response);
        }
    }

    public async editar(id: number, tarefa: Task): Promise<string> {
        try{
            return (await this.axiosClient.put<string>(`/tasks/${id}`, tarefa)).data;
        }
        catch(error : any){
            return Promise.reject(error.response);
        }
    }

    public async excluir(id: number): Promise<string> {
        try{
            return (await this.axiosClient.delete<string>(`/tasks/${id}`)).data;
        }
        catch(error : any){
            return Promise.reject(error.response);
        }
    }
}
export default new taskService();