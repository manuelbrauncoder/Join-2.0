export class Task {
    id: string;
    title: string;
    description: string;
    subtasks: SubTask[];
    assignedTo: String[];
    priority: 'urgent' | 'medium' | 'low';
    dueDate: number;
    category: 'Technical Task' | 'User Story';


    constructor(obj?: Partial<Task>) {
        this.id = obj?.id ?? '';
        this.title = obj?.title ?? '';
        this.description = obj?.description ?? '';
        this.subtasks = obj?.subtasks?.map(subtask => new SubTask(subtask)) ?? [];
        this.assignedTo = obj?.assignedTo ?? [];
        this.priority = obj?.priority ?? 'medium';
        this.dueDate = obj?.dueDate ?? 0;
        this.category = obj?.category ?? 'User Story';
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