import TaskType from "./TaskType";
import Moment from "moment";

class Task {
    uid = {};
    repeatOnDays = {}; //Dic day to times
    taskType = {}; //TaskType
    days = []; // [sunday, monday...]
    times = []; //Date()s

    constructor(serverModel) {
        this.uid = serverModel.uid;
        this.taskType = TaskType.serialize(serverModel);
        this.repeatOnDays = this.serializeRepeatOnDays(serverModel.repeateOnDates);
    }

    serializeRepeatOnDays(repeatOnDays) {
        const myModelRepeatOnDays = {};
        let times = [];
        for (const key in repeatOnDays) {
            if (repeatOnDays[key]) {
                myModelRepeatOnDays[key] = repeatOnDays[key];
                this.days.push(key);
                times = repeatOnDays[key];
            }
        }

        const datesAsTimes = times.map(function (time) {
            const date = Moment(time,"HH:mm'");
            return date
        }) ;
        this.times = datesAsTimes;
        return myModelRepeatOnDays;
    }
}

export default Task;