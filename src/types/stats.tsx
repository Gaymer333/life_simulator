export type StatType = {
    value: number;
    minValue: number;
    maxValue: number;
}

export type StatDictionary = {[key in stats]: StatType}

export type StatHandlerType = {
    stats: StatDictionary,
    _setStats: React.Dispatch<React.SetStateAction<StatDictionary>>
}

export enum stats {
    energy,
    money
}

export const defualtStats: StatDictionary = {
    [stats.energy]: {
        value: 50,
        minValue: 0,
        maxValue: 100
    },
    [stats.money]: {
        value: 0,
        minValue: 0,
        maxValue: Number.MAX_VALUE
    }
}

export const makeDefualtStat = () => {
    return {...{
        value: 100,
        minValue: 0,
        maxValue: 0
    }}
}

