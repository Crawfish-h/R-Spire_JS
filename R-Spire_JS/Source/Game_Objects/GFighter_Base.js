class GFighter_Base extends RGame_Object
{
    constructor (x = 0, y = 0, char = "F", color = "#C86464", tag = FUtility.Game_Object_Tags.Entity)
    {
        super(x, y, char, color, tag);

        this.Ice_Resistance = FUtility.Resistance_Types.Weak;
        this.Fire_Resistance = FUtility.Resistance_Types.Neutral;
        this.Electric_Resistance = FUtility.Resistance_Types.Strong;
        this.Health = 100;
        this.Max_Health = 100;
        this.Attack_Damage = 15;
    }

}