import gameData, { StatKeys } from "./gameData";
import Stat from "./stat";

type StatChangeMethodType = "add" | "remove" | "set" | "max" | "min"

type DoActionTimeType = {
    method: "add" | "set"
    days?: number,
    hours?: number,
    mins?: number
}

type DoStatActionRequirmentType = {
    statKey: StatKeys,
    minValue?: number,
    maxValue?: number
}

export type DoStatChangeType = {
    statKey: StatKeys,
    actionMethod: StatChangeMethodType,
    actionValue?: number
}

type DoStatActionType = {
    actionChanges: Array<DoStatChangeType>
    actionRequirements?: Array<DoStatActionRequirmentType>
    actionTime?: DoActionTimeType
} & RerenderOptionType

type RerenderOptionType = {
    rerender?: boolean
}

export const DoStatAction = (actionDetails: DoStatActionType) => {

    const checkPassed = actionDetails.actionRequirements?.every((actionRequirement) => {
        const stat: Stat = gameData.getStat(actionRequirement.statKey)
        if (actionRequirement.maxValue && stat.value > actionRequirement.maxValue) return false
        if (actionRequirement.minValue && stat.value < actionRequirement.minValue) return false
        return true
    }) ?? true

    if (checkPassed) {
        actionDetails.actionChanges.forEach(actionChange => {

            const stat: Stat = gameData.getStat(actionChange.statKey)
            switch (actionChange.actionMethod) {
                case "add":
                    actionChange.actionValue && stat.AddValue(actionChange.actionValue);
                    break;
                case "remove":
                    actionChange.actionValue && stat.RemoveValue(actionChange.actionValue);
                    break;
                case "max":
                    stat.SetToMax()
                    break

                default:
                    break;
            }
        });

        if (actionDetails.actionTime) {
            const beforeTime = gameData.time.getTimeWrapper();
            if (actionDetails.actionTime?.method === "add") {
                actionDetails.actionTime?.mins && gameData.time.addMins(actionDetails.actionTime?.mins)
                actionDetails.actionTime?.hours && gameData.time.addHours(actionDetails.actionTime?.hours)
                actionDetails.actionTime?.days && gameData.time.addDays(actionDetails.actionTime?.days)
            }

            if (actionDetails.actionTime?.method === "set") {
                actionDetails.actionTime?.mins !== undefined && gameData.time.setMins(actionDetails.actionTime?.mins)
                actionDetails.actionTime?.hours !== undefined && gameData.time.setHours(actionDetails.actionTime?.hours)
                actionDetails.actionTime?.days !== undefined && gameData.time.setDays(actionDetails.actionTime?.days)
            }
            gameData.time.checkTimeEvent(beforeTime)
        }



        if ((actionDetails.rerender !== false || actionDetails.actionTime !== undefined) && gameData.sidebarRerender) gameData.sidebarRerender()
    }

}