import React, { useReducer, useState } from 'react';
import './App.scss';
import Display from './components/Display';
import { StatDictionary, StatType, defualtStats, makeDefualtStat, StatHandlerType } from './types/stats';
import { tools } from './types/tools';

function App() {

  const [stats,_setStats] = useState<StatDictionary>(defualtStats)
  const statHandler: StatHandlerType = {stats, _setStats}

  const props: tools = {
    statHandler
  }

  return <Display {...props} />
}

export default App;
