export class Task {
    title: string;
    subtasks: SubTask[];
    assignedTo: String[];


    constructor(obj?: Partial<Task>) {
        this.title = obj?.title ?? '';
        this.subtasks = obj?.subtasks?.map(subtask => new SubTask(subtask)) ?? [];
        this.assignedTo = obj?.assignedTo ?? [];
    }
}

export class SubTask {
    title: string;
    done: boolean;

    constructor(obj?: any){
        this.title = obj ? obj.title : '';
        this.done = obj ? obj.done : false;
    }
}