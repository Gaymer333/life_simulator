import React from "react";
import gameData, { StatKeys } from "./gameData";
import Stat from "./stat";

type StatChangeMethodType = "add" | "remove" | "set"

type DoActionTimeType = {
    days?: number,
    hours?: number,
    mins?: number
}

type DoStatActionRequirmentType = {
    statKey: StatKeys,
    minValue?: number,
    maxValue?: number
}

type DoStatChangeType = {
    statKey: StatKeys,
    actionMethod: StatChangeMethodType,
    actionValue: number
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

    let checkPassed = true

    actionDetails.actionRequirements?.map(actionRequirement => {
        const stat: Stat = gameData.getStat(actionRequirement.statKey)
        if(actionRequirement.maxValue && stat.value > actionRequirement.maxValue) checkPassed = false
        if(actionRequirement.minValue && stat.value < actionRequirement.minValue) checkPassed = false
    })

    if (checkPassed) {
        actionDetails.actionChanges.forEach(actionChange => {
            
            const stat: Stat = gameData.getStat(actionChange.statKey)
            switch (actionChange.actionMethod) {
                case "add":
                    stat.AddValue(actionChange.actionValue);
                    break;
                case "remove":
                    stat.RemoveValue(actionChange.actionValue);
                    break;
            
                default:
                    break;
            }
        });

        actionDetails.actionTime?.mins && gameData.time.addMins(actionDetails.actionTime?.mins)
        actionDetails.actionTime?.hours && gameData.time.addHours(actionDetails.actionTime?.hours)
        actionDetails.actionTime?.days && gameData.time.addDays(actionDetails.actionTime?.days)

        if((actionDetails.rerender !== false || actionDetails.actionTime !== undefined) && gameData.rerender) gameData.rerender()
    }

}