import * as React from "react";
import {
    Card, CardContent, CardMedia, Typography, Box, Button, IconButton, FormControl
    , InputLabel, Select, MenuItem, Grid
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import DeleteForever from '@mui/icons-material/DeleteForever';
import { createContext, useState, Fragment } from "react";

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
        <Fragment>
            <Toaster position="top-center" reverseOrder={false} />
            <Box
                sx={{
                    display: "flex",
                    boxShadow: 1,
                    borderRadius: 2,
                    flexGrow: 1,
                    mr: 10,

                }}>
                <Grid container direction="row">
                    <Grid
                        item
                        xs={4}
                        container
                        justifyContent="sapce-between"
                        alignItems="space-between"
                        direction="row"
                        sx={{mt:"10px"}}
                    >
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    color: "primary.main",
                                    fontWeight: "bold",
                                    mt: 1,
                                    ml: 1,
                                }}
                            >
                                {props.category}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "secondary.main",
                                    ml: 1,
                                }}
                            >
                                {props.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sx={{mb:"10px", mt:"10px"}}>
                        <CardMedia sx={{ objectFit: 'cover', height: "100px", width: "100px" }}
                            component="img"
                            image={props.imageURL}
                            alt={props.name}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        container
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        direction="column"
                    >
                        <Grid item xs={6}>
                            <Typography
                            >
                                {props.price} ₪
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Amount</InputLabel>
                                <Select
                                    value={amount}
                                    label="amount"
                                    onChange={handleChange}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} sx={{ display:"flex" }}>
                        <IconButton onClick={onRemoveFromCartClick}
                            edge="end"
                            aria-haspopup="true"
                        >
                            <DeleteForever />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}
