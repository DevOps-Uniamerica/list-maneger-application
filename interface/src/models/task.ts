export class Task {
    id!: number;
    tarefa!: string;
    concluido!: boolean;
    constructor(tarefa: string, concluido = false) {
        this.tarefa = tarefa;
        this.concluido = concluido;
    }
}