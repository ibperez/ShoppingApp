import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  chosenRecipeDetail: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ 
      shoppingList: {
        ingredients: Ingredient[]
      }
    }>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // recipe id from route
        this.chosenRecipeDetail = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList () {
    // this.recipeService.addIngredientToShoppingList(this.chosenRecipeDetail.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.chosenRecipeDetail.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
