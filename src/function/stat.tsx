import React, { useState } from 'react'
import { StatType, defualtStats, makeDefualtStat, StatHandlerType, stats } from './../types/stats';

const getValueAfterCheck = (stat: StatType, value: number) => {
    return Math.min(stat.maxValue, Math.max(stat.minValue, value))
}

export const setStat = (statHandler: StatHandlerType, stateName: stats, newStatValue: number) => {
    const statToSet: StatType = statHandler.stats[stateName] ?? defualtStats[stateName] ?? makeDefualtStat()
    statToSet.value = getValueAfterCheck(statToSet, newStatValue)
    statHandler._setStats({...statHandler.stats, ...{[stateName]: statToSet}})
}

export const changeStat = (statHandler: StatHandlerType,stateName: stats, newStatValue: number) =>  {
    const statToChange: StatType = statHandler.stats[stateName] ?? defualtStats[stateName] ?? makeDefualtStat()
    statToChange.value = getValueAfterCheck(statToChange, statToChange.value + newStatValue)
    statHandler._setStats({...statHandler.stats, ...{[stateName]: statToChange}})
}

export const getStat = (statHandler: StatHandlerType, stateName: stats) => {
    const statToSend: StatType = statHandler.stats[stateName] ?? defualtStats[stateName]
    return statToSend.value
}

export const getStatMax = (statHandler: StatHandlerType, stateName: stats) => {
    const statToSend: StatType = statHandler.stats[stateName] ?? defualtStats[stateName]
    return statToSend.maxValue
}