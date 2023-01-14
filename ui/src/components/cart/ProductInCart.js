import * as React from "react";
import { Card, CardContent, CardMedia, Typography, Box, Button, IconButton } from "@mui/material";
import DeleteForever from '@mui/icons-material/DeleteForever';
import EditSharpIcon from '@mui/icons-material/EditSharp';

export default function ProductInCart(props) {

    const onRemoveFromCartClick = (event) => {
        props.handleRemoveFromCart(props.id);
        event.preventDefault();
    }

    const toProductPage = () => {
        props.toProductPage(props.id);
    }

    return (
        <Card
            sx={{
                display: "flex",
                height: 120,
                boxShadow: 1,
                borderRadius: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "right",
                    ml: 1,
                    width: 800,
                    justifyContent: "space-around",
                }}
            >
                <CardContent>
                    <Typography component="div" variant="h6">
                        {props.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                        {props.name}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 100, maxHigh: 100, height: 100 }}
                    image={props.imageURL}
                    alt={props.name}
                />
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {props.price}₪
                </Typography>
                <Box sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection:"column",
                        marginRight:'20px'
                    }}>
                          <IconButton onClick={onRemoveFromCartClick}
                        size="large"
                        edge="end"
                        aria-haspopup="true"
                    >
                        <DeleteForever />
                    </IconButton>
                    <IconButton onClick={toProductPage}
                        size="large"
                        edge="end"
                        aria-haspopup="true"
                    >
                        <EditSharpIcon />
                    </IconButton>
                </Box>

                {/* <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.price}₪
        </Typography> */}
            </Box>
        </Card>
    );
}
