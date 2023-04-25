
import { prototype } from 'html-webpack-plugin';
import Task from './Task';

class Project extends Task {

    constructor(params) {
        super(params);

        this.taskList = [];
    }

    addTask(taskParams) {
        this.taskList.push(new Task(taskParams));
    }
}

export default Project;