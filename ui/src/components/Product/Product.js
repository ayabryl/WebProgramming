import { Card, CardMedia, Grid, Box, Typography } from "@mui/material";
import { display } from "@mui/system";
import ProductDetails from "./ProductDetails";

export default function Product(props) {

    return (
        <div style={{ height:'100vh' ,display: 'flex', flexDirection: 'column', alignItems:"center"}}>
                {/* <Grid sx={{ flexDirection: 'row',  display: 'flex', flexGrow: 1, justifyContent: 'center' ,
                alignItems:"center", width: '100%'}}
                container spacing={1}> */}
                  <Grid container direction="row" spacing={1}>
                    <Grid item
                        sx={{  display: 'flex', flexGrow: 1, alignItems:"center", justifyContent: 'center' }}>
                        <CardMedia
                        component="img"
                        sx={{  maxWidth: 300, maxHeight: 300, borderRadius: '5%' }}
                        image={props.makeUpProduct.image_link}
                        alt={props.makeUpProduct.name} />
                    </Grid>
                    <Grid item  sx={{  display: 'flex', flexGrow: 1, alignItems:"center", justifyContent: 'flex-start' }}>
                         <ProductDetails chosenColor={props.chosenColor} 
                         handleAddToCartClick={props.handleAddToCart}
                         sx={{  display: 'flex', flexGrow: 1}}
                         makeUpProduct={props.makeUpProduct}></ProductDetails>
                    </Grid>
                </Grid>
        </div>
    )
}
