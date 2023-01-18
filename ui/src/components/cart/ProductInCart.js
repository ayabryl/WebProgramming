import * as React from "react";
import {
    Card, CardContent, CardMedia, Typography, Box, Button, IconButton, FormControl
    , InputLabel, Select, MenuItem
} from "@mui/material";
import DeleteForever from '@mui/icons-material/DeleteForever';
import { createContext, useState } from "react";

export default function ProductInCart(props) {

    const [amount, setAmount] = useState(props.amount)

    const onRemoveFromCartClick = (event) => {
        props.handleRemoveFromCart(props.id);
        event.preventDefault();
    }

    const handleChange = (event) => {
        setAmount(event.target.value);
        props.setProductAmount(props.id, amount);
    }

    return (
        <Card
            sx={{
                display: "flex",
                height: 120,
                boxShadow: 1,
                borderRadius: 2,
                flexGrow: 1,
                mr: 20
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "right",
                    ml: 1,
                    flexGrow: 1,
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexGrow: 2,
                }}>
                    <CardContent >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography component="div" variant="h6">
                                {props.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" component="div">
                                {props.name}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
                 <Box sx={{
                    display: "flex",
                    flexGrow: 2,
                    justifyContent: "flex-start"
                }}>
                <CardMedia
                    component="img"
                    sx={{ width: 100, maxHigh: 100, height: 100 }}
                    image={props.imageURL}
                    alt={props.name}
                />
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: '20px',
                    flexGrow: 2,
                    justifyContent: "center",
                    justifyContent: "flex-end"
                }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "column",
                        marginRight: '20px',
                        ml: "20px",
                        justifyContent: 'space-evenly'
                    }}>
                        <Typography
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {props.price}₪
                        </Typography>
                        <FormControl sx={{ minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Amount</InputLabel>
                            <Select
                                value={amount}
                                label="amount"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <IconButton onClick={onRemoveFromCartClick} sx={{ marginRight: "5px" }}
                        edge="end"
                        aria-haspopup="true"
                    >
                        <DeleteForever />
                    </IconButton>
                </Box>
            </Box>
        </Card>
    );
}
