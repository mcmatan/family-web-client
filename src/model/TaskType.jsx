import brushTeeth from "../../public/brushTeeth.png";
import food from "../../public/food.png";
import drugs from "../../public/drugs.png";
import goToWork from "../../public/goToWork.png";
import wakeUp from "../../public/wakeUp.png";
import goToGym from "../../public/goToGym.png";

const TaskType = {

    brushTeeth: {
        key: "brushTeeth",
        display: "Brush your teeth",
        src: brushTeeth,
        index: 0
    },
    food: {
        key: "food",
        display: "Eat food",
        src: food,
        index: 1
    },
    drugs: {
        key: "drugs",
        display: "Take your pills",
        src: drugs,
        index: 2,
    },
    goToWork: {
        key: "goToWork",
        display: "Go to work",
        src: goToWork,
        index: 3,
    },
    goToGym: {
        key: "goToGym",
        display: "Go to the GYM",
        src: goToGym,
        index: 4
    },
    wakeUp: {
        key: "wakeUp",
        display: "Wake up",
        src: wakeUp,
        index: 5
    },

    serialize(serverTaskModel) {
        const allTasksTypes = this.all();
        for (const i in allTasksTypes) {
            if (i) {
                const taskType = allTasksTypes[i];
                if (taskType.key === serverTaskModel.kTaskType) {
                    return taskType;
                }
            }
        }
        console.log("No server model matches task type")
    },

    all() {
        return [this.brushTeeth, this.food, this.drugs, this.goToWork, this.goToGym, this.wakeUp];
    }
};

export default TaskType;