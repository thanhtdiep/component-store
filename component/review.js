import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';


const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
];

var carts = [];

const useStyles = makeStyles((theme) => ({
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();
    const cookies = new Cookies();

    carts = cookies.get('order_details');
    if (carts) {
        return (
            <React.Fragment>

                {/* <List disablePadding>
                <ListItem>
                    <ListItemText inset={true}>Photo</ListItemText>
                    <ListItemText inset={true} >Name</ListItemText>
                    <ListItemText inset={true}>Location</ListItemText>
                    <ListItemText inset={true} >Quantity</ListItemText>
                    <ListItemText inset={true}>Return</ListItemText>
                </ListItem>
                {carts.map((cart) => (
                    <ListItem className={classes.listItem} key={cart.component_name}>
                        <ListItemText>
                            <img alt="Google" height="40" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                        </ListItemText>
                        <ListItemText inset={true} primary={cart.component_name} />
                        <ListItemText inset={true}>{cart.location}</ListItemText>
                        <ListItemText inset={true} variant="body2"><input value={cart.quantity} /></ListItemText>
                        <ListItemText inset={true}><input type="checkbox" checked={cart.returnItem} /></ListItemText>

                    </ListItem>
                ))}
            </List> */}
                <div className="container">
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-2">Photo</div>
                            <div className="col col-1">Name&nbsp;</div>
                            <div className="col col-4">Location&nbsp;</div>
                            <div className="col col-4">Quantity&nbsp;</div>
                            <div className="col col-5">Return</div>
                        </li>
                        {carts.map((cart) => (
                            <li className="table-row" key={cart.component_name}>
                                <div className="col col-2">
                                    <img alt="Google" height="35" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                                </div>
                                <div className="col col-1">{cart.component_name}</div>
                                <div className="col col-3">{cart.location}</div>
                                <div className="col col-3">{cart.quantity}</div>
                                <div className="col col-5"><input type="checkbox" checked={cart.returnItem} /></div>

                            </li>
                        ))}

                    </ul>
                </div>

            </React.Fragment>
        );
    } else {
        return (
            <div>
                <Typography align="center" style={{ marginTop: "15px" }}> Your cart is empty. </Typography>

            </div>
        )
    }

}
