import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = (props) => {
    const [formInputValid, setFormInputValid] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalIsValid = isFiveChars(enteredPostal)

        setFormInputValid({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid

        if (!formIsValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    }

    const nameControlClasses = `${classes.control} ${formInputValid.name ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputValid.street ? '' : classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputValid.postal ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputValid.city ? '' : classes.invalid}`


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id='name' ref={nameInputRef} />
                {!formInputValid.name && <p>Enter a valid name.</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id='street' ref={streetInputRef} />
                {!formInputValid.street && <p>Enter a valid street.</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id='postal' ref={postalInputRef} />
                {!formInputValid.postal && <p>Enter a valid postal code (5 chars long).</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id='city' ref={cityInputRef} />
                {!formInputValid.city && <p>Enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button className={classes.submit}>Confirm</button>
                <button type='button' onClick={props.onCancel}>Cancel</button>
            </div>
        </form>
    );
}

export default Checkout;