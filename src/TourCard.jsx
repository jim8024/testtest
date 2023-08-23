import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import output from './finalresult.json';


export default function TourCard({ selectedItems, setSelectedItems }) {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTitle, setSearchTitle] = useState('');

    const handleAddButtonClick = (item) => {
        setSelectedItems((choiceItems) => [...choiceItems, item]);
    };

    const filteredOutput = output.filter(item => item.areacode === 1 && item.title.includes(searchTitle));
    const totalItems = filteredOutput.length;
    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const visibleItems = filteredOutput.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pageCount) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <Paper className='searchContainer' component="form">
                <InputBase
                    className='searchInput'
                    placeholder="검색할 관광지 입력"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
                <IconButton type="button" aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            {visibleItems.map((item, i) => (
                <Card
                    key={i}
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        height: '100px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{ width: 70, height: 70, flexGrow: '1', borderRadius: '5px', marginLeft: '10px' }}
                        image={item.firstimage}
                        alt="Live from space album cover"
                    />
                    <CardContent sx={{ position: 'static', flexGrow: '5' }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: 12 }}>
                            {item.title}
                        </Typography>
                        <Typography variant="div">
                            <h7 style={{ fontSize: '1px', fontWeight: 'bolder', color: 'skyblue' }}>도로명</h7>
                        </Typography>
                        <div>
                            <FavoriteIcon sx={{ fontSize: 13, color: '#F44336' }} />
                            <StarIcon sx={{ fontSize: 14, color: '#FBC02D' }} />
                        </div>
                    </CardContent>
                    <div
                        style={{
                            flexGrow: '1',
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'center',
                        }}
                    >
                        <Button sx={{ height: '30px', width: '30px', padding: '0', minWidth: '0' }}>
                            <AddBoxRoundedIcon className="addBtn" onClick={() => handleAddButtonClick(item)} />
                        </Button>
                    </div>
                </Card>
            ))}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button disabled={currentPage === 1} onClick={handlePrevPage}>
                    <ArrowBackIosIcon />
                </Button>
                <Button disabled={currentPage === pageCount} onClick={handleNextPage}>
                    <ArrowForwardIosIcon />
                </Button>
            </div>
        </>
    );
}
