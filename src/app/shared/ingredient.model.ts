export class Ingredient {
    public name: string;
    public amount: number;

    constructor(init?: Ingredient){
        Object.assign(this, init);
    }
}