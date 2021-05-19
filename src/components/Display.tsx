import React from 'react'
import { StatDictionary } from '../types/stats'
import { tools } from '../types/tools'
import Board from './Board'
import SideBar from './SideBar'

type DisplayProps = tools

const Display = (props: DisplayProps) => <div className="App">
    <SideBar {...props} />
    <Board {...props} />
</div>

export default Display