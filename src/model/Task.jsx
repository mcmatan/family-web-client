import TaskType from "./TaskType";

class Task {
    uid = {};
    repeatOnDays = {}; //Dic day to times
    taskType = {};
    days = [];
    times = [];

    constructor(serverModel) {
        this.uid = serverModel.uid;
        this.taskType = TaskType.serialize(serverModel);
        this.repeatOnDays = this.serializeRepeatOnDays(serverModel.repeateOnDates);
    }

    serializeRepeatOnDays(repeatOnDays) {
        const myModelRepeatOnDays = {};
        let times = [];
        for (const key in repeatOnDays) {
            myModelRepeatOnDays[key] = repeatOnDays[key];
            this.days.push(key);
            times = repeatOnDays[key];
        }
        this.times = times;
        return myModelRepeatOnDays;
    }
}

export default Task;