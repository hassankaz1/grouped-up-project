import React from 'react'
import AvailableGroup from '../AvailableGroup/AvailableGroup'

const AvailableGroupList = ({ groups }) => {

    const rows = []
    groups.forEach(g => {
        rows.push(<AvailableGroup group={g} key={g.id} />)
    })
    return rows
}

export default AvailableGroupList