import moment from "moment";
class ScheduledTask {
    taskType = {}; //TaskType
    isCompeate = false;
    timeString = "";
    date = {}; // Date
    uid = "";

    constructor(task, date) {
        this.taskType = task.taskType;
        this.timeString = moment(date).format("HH:mm");
        this.date = date;
        this.uid = task.uid;
    }
}

export default ScheduledTask;