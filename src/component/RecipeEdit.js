import React, { useContext } from 'react'
import Recipe from './Recipe'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext } from './App'
import uuidv4 from 'uuid/v4'

export default function RecipeEdit({ recipe }) {
  const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

  function handleChange(changedVariable) {
    const newObj = { ...recipe, ...changedVariable }
    handleRecipeChange(recipe.id, newObj)
  }

  function handleIngredientChange(id, ingredient) {
    const newIngredients = [...recipe.ingredients]
    const index = recipe.ingredients.findIndex(i => i.id === id)
    newIngredients[index] = ingredient

    handleChange({ ingredients: newIngredients })
  }

  function handleClick() {
    handleRecipeSelect(undefined)
  }

  function handleIngredientAdd() {
    const newIngredient = {
      id: uuidv4(),
      name: '',
      amount: ''
    }

    handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
  }

  function handleIngredientDelete(id) {
    handleChange({ ingredients: recipe.ingredients.filter(i => i.id !== id) })
  }

  return (
    <div className='recipe-edit'>
      <div className='recipe-edit__remove-button-container'>
        <button
          className='btn recipe-edit__remove-button'
          onClick={() => handleClick()}
        >
          &times;
        </button>
      </div>
      <div className='recipe-edit__details-grid'>
        <label htmlFor='name' className='recipe-edit__label'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='recipe-edit__input'
          value={recipe.name}
          onChange={e => handleChange({ name: e.target.value })}
        />
        <label htmlFor='cookTime' className='recipe-edit__label'>
          Cook Time
        </label>
        <input
          type='text'
          name='cookTime'
          id='cookTime'
          className='recipe-edit__input'
          value={recipe.cookTime}
          onChange={e => handleChange({ cookTime: e.target.value })}
        />
        <label htmlFor='servings' className='recipe-edit__label'>
          Servings
        </label>
        <input
          type='number'
          min='1'
          name='servings'
          id='servings'
          className='recipe-edit__input'
          value={recipe.servings}
          onChange={e =>
            handleChange({ servings: parseInt(e.target.value) || '' })
          }
        />
        <label htmlFor='instructions' className='recipe-edit__label'>
          Instructions
        </label>
        <textarea
          name='instructions'
          className='recipe-edit__input'
          id='instructions'
          value={recipe.instructions}
          onChange={e => handleChange({ instructions: e.target.value })}
        />
      </div>
      <br />
      <label className='recipe-edit__label'>Ingredients</label>
      <div className='recipe-edit__ingredient-grid'>
        <div>Name</div>
        <div>Amount</div>
        <div></div>
        {recipe.ingredients.map(ingredient => (
          <RecipeIngredientEdit
            key={ingredient.id}
            ingredient={ingredient}
            handleIngredientChange={handleIngredientChange}
            handleIngredientDelete={handleIngredientDelete}
          />
        ))}
      </div>
      <div className='recipe-edit__add-ingredient-btn-container'>
        <button
          className='btn btn--primary'
          onClick={() => handleIngredientAdd()}
        >
          Add Ingredient
        </button>
      </div>
    </div>
  )
}