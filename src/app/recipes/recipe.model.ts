export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(init?: Recipe) {
        Object.assign(this, init);
    }
}