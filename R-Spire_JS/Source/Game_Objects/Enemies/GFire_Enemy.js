class GFire_Enemy extends GEnemy_Base
{
    constructor (x = 0, y = 0, char = "E", color = "#FFFFFF")
    {
        super(x, y, char, color, FUtility.Game_Object_Tags.Enemy);
        this.Name = "Fire Enemy";
        this.Attack_Type = FBattle_System.Attack_Types.Fire;

        this.Ice_Resistance = FUtility.Resistance_Types.Weak;
        this.Fire_Resistance = FUtility.Resistance_Types.Strong;
        this.Electric_Resistance = FUtility.Resistance_Types.Neutral;
        this.Health = 100;
        this.Max_Health = 100;
        this.Attack_Damage = 15;
    }
}