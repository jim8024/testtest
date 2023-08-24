import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DatePicker.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppendCard from '../AppendCard';

function DatePicker({ selectedItems }) {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection',
        },
    ]);

    const selectedStartDate = state[0].startDate;
    const selectedEndDate = state[0].endDate;

    const nextDayStartDate = selectedStartDate ? new Date(selectedStartDate) : null;
    if (nextDayStartDate) {
        nextDayStartDate.setDate(nextDayStartDate.getDate() + 1);
    }

    const nextDayEndDate = selectedEndDate ? new Date(selectedEndDate) : null;
    if (nextDayEndDate) {
        nextDayEndDate.setDate(nextDayEndDate.getDate() + 1);
    }

    const dayInMillis = 24 * 60 * 60 * 1000;
    const dateRangeInDays = (nextDayEndDate - nextDayStartDate) / dayInMillis + 1;

    const [expanded, setExpanded] = useState('panel0');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const dateCards = []; // 이차원 배열을 저장할 배열

    for (let i = 0; i < dateRangeInDays; i++) {
        const cardsForDate = []; // 특정 날짜에 대한 카드를 저장할 배열

        // AppendCard에 넘겨줄 props 설정
        const cardProps = {
            selectedItems: selectedItems,
            day: i + 1,
        };

        cardsForDate.push(<AppendCard key={i} {...cardProps} />); // 해당 날짜의 카드를 추가

        dateCards.push(cardsForDate); // 특정 날짜에 대한 카드 배열을 dateCards에 추가
    }

    return (
        <div>
            <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                showDateDisplay={true}
                showSelectionPreview={true}
                months={1}
                direction="horizontal"
                rangeColors={['#0074E4']}
                showMonthAndYearPickers={false}
                format="yyyy-MM-dd"
            />
            <hr />
            <h3>선택한 여행지</h3>
            <hr />
            {dateCards.map((cardsForDate, index) => (
                <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                    <AccordionSummary
                        aria-controls={`panel${index}d-content`}
                        id={`panel${index}d-header`}
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>{index + 1} DAY</Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ padding: 0 }}>
                        {cardsForDate}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default DatePicker;
