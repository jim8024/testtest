// AppendCard.jsx
import React from 'react';
import CardContent from '@mui/material/CardContent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

function textOverCut(txt, len, lastTxt) {
    if (len === '' || len == null) {
        len = 12;
    }
    if (lastTxt === '' || lastTxt == null) {
        lastTxt = '...';
    }
    if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
}

export default function AppendCard({ selectedItems }) {
    return (
        <>
            {selectedItems.map((item, index) => (
                <Card
                    key={index}
                    sx={{
                        display: 'flex',
                        width: 'auto',
                        height: '100px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: '8px',
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{ width: 70, height: 70, flexGrow: '1', borderRadius: '5px', marginLeft: '10px' }}
                        image={item.firstimage}
                        alt={item.title}
                    />
                    <CardContent sx={{ position: 'static', flexGrow: '5' }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 12.8,
                            }}
                        >
                            {textOverCut(item.title, 10.8, '...')}
                        </Typography>
                        <Typography variant="div">
                            <span
                                style={{
                                    fontSize: '1px',
                                    fontWeight: 'bolder',
                                    color: 'skyblue',
                                    marginTop: '-2',
                                }}
                            >
                                도로명
                            </span>
                            <Typography variant="h6" sx={{ fontSize: 8.3 }}>
                                {textOverCut(item.addr1, 15, '...')}
                            </Typography>
                        </Typography>
                        <div>
                            <FavoriteIcon sx={{ fontSize: 13, color: '#F44336' }} />
                            <StarIcon sx={{ fontSize: 14, color: '#FBC02D' }} />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
