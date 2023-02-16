import React from 'react'
import "./DateCard.css"



const DateCard = ({ event }) => {
    let { start, end, title, description, link } = event
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    start = new Date(start)
    end = new Date(end)

    return (
        <div className='cardy'>
            <div class="card-container">
                <div class="photo-container">
                    <div class="date">
                        <div class="day">{start.getDate()}</div>
                        <div class="month">{month[start.getMonth()]}</div>
                    </div>
                    <div class="image"></div>
                </div>
                <div class="info-container">
                    <div class="event-name">
                        {title}
                    </div>
                    <div class="event-location">
                        {description}

                    </div>
                    <a className='link' href={link}>{link}</a>
                </div>
            </div>
        </div>
    )
}

export default DateCard