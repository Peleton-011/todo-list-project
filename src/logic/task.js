

class Task {

    constructor({title, description, priority, dueDate}) {

        this.title = title || "Unnamed Task";
        this.description = description || "No description available";
        this.priority = priority || 5;
        this.dueDate = dueDate || null;

    }




}

export default Task;