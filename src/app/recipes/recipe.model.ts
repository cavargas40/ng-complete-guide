import { Ingredient } from 'app/shared/ingredient.model';

export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Array<Ingredient>;

    constructor(init?: Recipe) {
        Object.assign(this, init);
    }
}