class FUtility  
{
    static #Current_Unique_Id = 0;

    static IRandom_Range(min = -10, max = 10)
    {
        return parseInt(Math.random() * ((max + 1) - min) + min);
    }

    static FRandom_Range(min = -10, max = 10)
    {
        return Math.random() * ((max + 1) - min) + min;
    }

    static Game_Object_Tags =
    {
        Player: "Player",
        Entity: "Entity",
        Enemy: "Enemy",
        Wall: "Wall",
        Door: "Door",
        Floor: "Floor",
    }

    static Object_Directions = 
    {
        North: "North",
        South: "South",
        East: "East",
        West: "West",
    }

    static Resistance_Types =
    {
        Neutral: { Type: "Neutral", Value: 1.0},
        Weak: { Type: "Weak", Value: 2.0},
        Strong: { Type: "Strong", Value: 0.5},
        Reflect: { Type: "Reflect", Value: 0.0}
    }

    static Get_Unique_Id()
    {
        return this.#Current_Unique_Id++;
    }
}

Object.freeze(FUtility.Game_Object_Tags);
Object.freeze(FUtility.Object_Directions);
