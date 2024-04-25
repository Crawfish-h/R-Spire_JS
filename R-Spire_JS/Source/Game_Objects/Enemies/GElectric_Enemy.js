class GElectric_Enemy extends GEnemy_Base
{
    constructor (x = 0, y = 0, char = "E", color = "#FFFFFF")
    {
        super(x, y, char, color, FUtility.Game_Object_Tags.Enemy);
        this.Name = "Electric Enemy";
        this.Attack_Type = FBattle_System.Attack_Types.Electric;

        this.Ice_Resistance = FUtility.Resistance_Types.Neutral;
        this.Fire_Resistance = FUtility.Resistance_Types.Weak;
        this.Electric_Resistance = FUtility.Resistance_Types.Strong;
        this.Health = 70;
        this.Max_Health = 70;
        this.Attack_Damage = 30;
    }
}