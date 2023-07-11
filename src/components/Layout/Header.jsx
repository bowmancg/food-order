import React from 'react';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            <img src="https://www.marthastewart.com/thmb/aVMX2qtJCGCxLa9nU18qYy9NpOw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cacio-e-pepe-opener-mld109436_horiz-1222-425e28fdf7d4403abe05b1f6ab24d106.jpg" alt="image" />
        </div>
    </React.Fragment>
}

export default Header;