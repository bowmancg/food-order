import React, { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';



const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://http-practice-68dcb-default-rtdb.firebaseio.com/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong.')
            }

            const responseData = await response.json()

            const loadedMeals = []

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }

            setMeals(loadedMeals)
            setIsLoading(false)
        }

            fetchMeals().catch((error) => {
                setIsLoading(false)
                setError(error.message)
            })
    }, [])

    if (isLoading) {
        return <section className={classes.MealsLoading}>
            <p>Loading</p>
        </section>
    }

    if (error) {
        return <section className={classes.MealsError}>
        {error}
    </section>
    }

    const mealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;