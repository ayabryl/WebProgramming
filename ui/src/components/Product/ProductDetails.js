import { Card, Box, Typography, CardContent, Grid, Button, IconButton } from "@mui/material";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function ProductDetails(props) {

    const [chosenColor, setChosenColor] = useState(props.makeUpProduct.product_colors.legnth ?
        props.makeUpProduct.product_colors[0] : '');

    const setColor = (color) => {
        setChosenColor(color)
    }

    const productsColors =
        props.makeUpProduct.product_colors.map((p) => (
            <Grid item onClick={() => setColor(p)}
            key={Math.random().toString()}>
                <span 
                style={{
                    height: '25px',
                    width: '25px',
                    borderColor: p.hex_value === chosenColor.hex_value ? '#000000' : p.hex_value,
                    borderStyle: 'solid',
                    borderWidth: '0.2em',
                    backgroundColor: p.hex_value,
                    borderRadius: '50%',
                    display: 'inline-block'
                }}></span>
            </Grid>
        ));

    return (
        <div style={{ display: 'flex' }}>
            <Grid container rowSpacing={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}>
                <Grid item>
                    <Typography component="div" variant="body2">
                        {props.makeUpProduct.brand}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" component="div">
                        {props.makeUpProduct.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6" component="div">
                        {props.makeUpProduct.price_sign}{props.makeUpProduct.price}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h7" component="div">
                        color: {chosenColor.colour_name}
                    </Typography>
                    <Grid container spacing={1} style={{ marginTop: '10px' }}>
                        {productsColors}
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="h7" style={{
                        wordWrap: 'break-word',
                        width: '30rem'
                    }} component="div">
                        {props.makeUpProduct.description}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button size='large'
                    onClick={props.handleAddToCartClick}
                        sx={{
                            color: 'white', backgroundColor: 'black', ':hover': {
                                bgcolor: 'grey',
                                color: 'white',
                            }
                        }}>Add To Cart</Button>
                </Grid>
            </Grid>
        </div>
    )
}
