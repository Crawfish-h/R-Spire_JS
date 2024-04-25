class GIce_Enemy extends GEnemy_Base
{
    constructor (x = 0, y = 0, char = "E", color = "#FFFFFF")
    {
        super(x, y, char, color, FUtility.Game_Object_Tags.Enemy);
        this.Name = "Ice Enemy";
        this.Attack_Type = FBattle_System.Attack_Types.Ice;

        this.Ice_Resistance = FUtility.Resistance_Types.Strong;
        this.Fire_Resistance = FUtility.Resistance_Types.Weak;
        this.Electric_Resistance = FUtility.Resistance_Types.Neutral;
        this.Health = 150;
        this.Max_Health = 150;
        this.Attack_Damage = 8;
    }
}