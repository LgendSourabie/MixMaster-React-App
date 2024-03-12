import React from "react";
import { useLoaderData, Link, Navigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailPage";
import axios from "axios";

const singleCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export const loader = async ({ params }) => {
  const { id } = params;
  const { data } = await axios.get(`${singleCocktailUrl}${id}`);
  return { id, data };
};

const Cocktail = () => {
  const { id, data } = useLoaderData();
  const singleDrink = data.drinks[0];

  let ingredients = [];
  // console.log(ingredients, typeof ingredients);

  // if (!data) return <h2>somethin went wrong...</h2>;
  if (!data) return <Navigate to="/" />;

  const { strDrink: name, strDrinkThumb: image, strGlass: glass, strAlcoholic: info, strInstructions: instructions, strCategory: category } = singleDrink;

  let ing = Object.keys(singleDrink).filter((ingredient) => {
    if (ingredient.includes("strIngredient") && singleDrink[ingredient] !== 0) {
      return singleDrink[ingredient];
    }
  });

  ing.forEach((el) => ingredients.push(singleDrink[el]));

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">ingredients:</span>
            {ingredients.join(", ")}
          </p>
          <p>
            <span className="drink-data">instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
