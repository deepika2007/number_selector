import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import './picker.scss';
import PickerColumn from './picker_column';
import { generateQuickPicArray } from '../helper';

let linesList = [
    { label: `2 columns`, value: 2 },
    { label: `3 columns`, value: 3 },
    { label: `5 columns`, value: 5 },
    { label: `7 columns`, value: 7 },
    { label: `10 columns`, value: 10 },
    { label: `15 columns`, value: 15 },
    { label: `20 columns`, value: 20 },
    { label: `25 columns`, value: 25 },
]

const PickerContainer = () => {
    const [lines, setLines] = useState([
        { numbers: [], powerNumbers: [] },
        { numbers: [], powerNumbers: [] }])

    const [activeCard, setActiveCard] = useState({
        activeIndex: null,
        isActiveCard: false
    })

    const handleLines = (i) => {
        while (i > lines.length) {
            lines.push({ numbers: [], powerNumbers: [] })
        }
        while (i < lines.length) {
            const spliceCount = lines.length - i
            lines.splice(i, spliceCount)
        }
        setLines([...lines])
    }


    const onMouseHandle = (i, isKey) => {
        setActiveCard({
            activeIndex: i,
            isActiveCard: isKey
        })
    }

    // cell selection in lines
    const singleQuickSearch = (key, property, ticketNumber, length) => {
        if (lines[key][property]?.includes(ticketNumber)) {
            lines[key][property]?.splice(lines[key][property]?.indexOf(ticketNumber), 1)
        } else if (lines[key][property].length < length) {
            lines[key][property].push(ticketNumber)
        }
        setLines([...lines])
    }

    // lines auto selection 
    const lineQuickSearch = (key, action) => {
        const count = 8;
        lines[key]['numbers'] = action === 'pick' ? generateQuickPicArray(count?.maxSelectTotalNumber, count?.totalShowNumber) : [];
        lines[key]['powerNumbers'] = action === 'pick' ? generateQuickPicArray(count?.maxSelectTotalPowerNumber, count?.totalShowPowerNumber) : [];
        setLines([...lines])
    }

    // all line auto selection
    const completeQuickSearch = (action) => {
        const count = 8;
        lines?.forEach((a, index) => {
            lines[index]['numbers'] = createRemainsLinesCount(action, lines[index]['numbers'], count, count)
            lines[index]['powerNumbers'] = createRemainsLinesCount(action, lines[index]['powerNumbers'], count, count)
        })
        setLines([...lines])
    }


    // handle condition if user select all numbers or user remains any number of count 
    const createRemainsLinesCount = (action, number, maxSelect, showCount) => {
        let numbers = []
        if (action === 'remove') return []
        else {
            if (number.length < maxSelect) {
                numbers = [...generateQuickPicArray(maxSelect, showCount)]
            } else { numbers = [...number] }
            return numbers
        }
    }

    return (
        <Box>
            <Typography variant='h4'>Number Selector</Typography>
            <Box className='actions'>
                <Button variant='outlined' color='success'>All Selection</Button>
                <Button variant='outlined' color='error'>Reset</Button>
            </Box>
            <Grid className='ticket_card_list'>
                <Box className='ticket_lines_list'>
                    {linesList?.map((i) => {
                        return <Typography sx={{ pl: 2 }} key={i?.value} className={(lines?.length === i?.value) ? 'active_tab' : ''}
                            onClick={() => handleLines(i?.value)} >{i?.label}</Typography>
                    })}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {lines?.map(({ numbers, powerNumbers }, index) => <PickerColumn
                        key={index}
                        index={index + 1}
                        onMouseEnter={() => onMouseHandle(index + 1, true)}
                        onMouseLeave={() => onMouseHandle(null, false)}
                        activeCard={activeCard}
                        numberCount={70}
                        powerNumberCount={20}
                        maxSelectNumberCount={9}
                        maxSelectPowerNumberCount={1}
                        ticket={{ numbers, powerNumbers }}
                        singleQuickSearch={singleQuickSearch}
                        lineQuickSearch={lineQuickSearch}
                    />)
                    }
                </Box>
            </Grid >
        </Box >
    )
}

export default PickerContainer