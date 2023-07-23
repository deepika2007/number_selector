import React from 'react';
import { Box, Grid, Divider, Typography, Table, TableRow, TableCell, TableBody } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './picker.scss';

const PickerColumn = ({
    index,
    onMouseEnter,
    onMouseLeave,
    activeCard,
    numberCount,
    powerNumberCount,
    maxSelectNumberCount,
    maxSelectPowerNumberCount,
    ticket,
    singleQuickSearch,
    lineQuickSearch }) => {
    const nCount = maxSelectNumberCount - ticket?.numbers?.length;
    const pCount = maxSelectPowerNumberCount - ticket?.powerNumbers?.length;
    const deleteIcon = ticket?.numbers?.length > 0 || ticket?.powerNumbers?.length > 0;

    console.log(numberCount)
    return (
        <>
            <Grid className={`ticket_card_container`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Grid className={`ticket-line ${(activeCard?.isActiveCard && activeCard?.activeIndex === index) ? 'active__card' : ''}`}>
                    <Box className='card__filter__section'>
                        <Box className='filter_section'>
                            <Box className='quick_pick' onClick={() => lineQuickSearch(index - 1, 'pick')} >Pick</Box>
                            {!!deleteIcon && <Box className='quick_pick' onClick={() => lineQuickSearch(index - 1, 'delete')} ><DeleteOutlineIcon fontSize="small" /></Box>}
                        </Box>
                    </Box>
                    <Box className='ticket_line_content'>
                        <Box className='choose_section'>
                            {nCount > 0 && <>
                                <Typography> Vacant count : {nCount}</Typography>
                            </>}
                        </Box>
                        <Box className='card_count'>
                            <Box className='watermark'>{index}</Box>
                            <Table className='card_table'>
                                <TableBody>
                                    <TableRow className='card_tr' >
                                        {Array(numberCount)?.fill()?.map((number, i) =>
                                            <TableCell className={`card_td  ${(ticket?.numbers?.find(num => num === i + 1)) ? 'card__selected' : ''} `} key={i}
                                                onClick={() => singleQuickSearch(index - 1, 'numbers', i + 1, maxSelectNumberCount)}
                                            >
                                                <Typography variant='span'>{i + 1}</Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        <Box className='choose_section' sx={{ mt: 1 }}>
                            {pCount > 0 && <Typography> Vacant count :  {pCount}</Typography>}
                        </Box>
                        <Divider className='divider_class' />
                        <Box className='card_count'>
                            <Table className='card_table'>
                                <TableBody>
                                    <TableRow className='card_tr' >
                                        {Array(powerNumberCount)?.fill()?.map((number, i) =>
                                            <TableCell className={`card_td ${(ticket?.powerNumbers?.find(num => num === i + 1)) ? 'card_power_selected' : ''} `}
                                                key={i}
                                                onClick={() => singleQuickSearch(index - 1, 'powerNumbers', i + 1, maxSelectPowerNumberCount)}
                                            >
                                                <Typography variant='span'>{i + 1}</Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default PickerColumn


// const lines = [{numbers: [1,6,7,8,2], powerNumbers: [1,2]}, {numbers: [1,7,6,8,2], powerNumbers: [1,2]},{numbers: [1,6,7,5,2], powerNumbers: [1,2]},{numbers: [1,6,3,8,2], powerNumbers: [1,2]}]
// lines.reduce((res, {numbers, powerNumbers}, index) => {
//     const key = `numbers_${numbers.sort().join(',')}_powerNumbers_${powerNumbers.sort().join(',')}`;
//     res.set(key, [...(res.get(key) || []), index])
//     return res;
// }, new Map())