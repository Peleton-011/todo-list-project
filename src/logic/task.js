

class Task {

    constructor({title, description, priority, dueDate, id}) {

        this.title = title || "Unnamed Task";
        this.description = description || "No description available";
        this.priority = priority || 5;
        this.dueDate = dueDate || null;
        this.id = id;


    }




}

export default Task;