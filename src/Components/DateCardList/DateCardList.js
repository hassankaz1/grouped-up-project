import React from 'react'
import DateCard from '../DateCard/DateCard'

const DateCardList = ({ events }) => {
    const rows = []

    events.forEach(e => {
        rows.push(<DateCard event={e} ></DateCard>)
    })

    return rows
}

export default DateCardList