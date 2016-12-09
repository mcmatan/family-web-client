import TaskType from "./TaskType";

class Task {
    uid = {};
    repeatOnDays = {};
    taskType = {};
    days = [];

    constructor(serverModel) {
        this.uid = serverModel.uid;
        this.taskType = TaskType.serialize(serverModel);
        this.repeatOnDays = this.serializeRepeatOnDays(serverModel.repeateOnDates);
    }

    serializeRepeatOnDays(repeatOnDays) {
        const myModelRepeatOnDays = {};
        for (const key in repeatOnDays) {
            myModelRepeatOnDays[key] = repeatOnDays[key];
            this.days.push(key);
        }
        return myModelRepeatOnDays;
    }
}

export default Task;