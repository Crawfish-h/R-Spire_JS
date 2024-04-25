class GEnemy_Base extends GFighter_Base
{
    constructor (x = 0, y = 0, char = "E", color = "#FFFFFF")
    {
        super(x, y, char, color, FUtility.Game_Object_Tags.Enemy);
        this.Overlap_Check = this.Overlap_Func;
        this.Name = "Enemy";
        this.Attack_Type = FBattle_System.Attack_Types.Fire;
    }

    Overlap_Func(game_World = new GGame_World())
    {
        if (game_World.Player.Compare_XY(this.X, this.Y) == true)
        {
            game_World.Player.In_Battle = true;
            game_World.Player.Battle_Enemy = this;
        }
    }
}