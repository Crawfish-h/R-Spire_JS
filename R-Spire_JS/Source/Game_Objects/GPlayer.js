class GPlayer extends GFighter_Base
{
    constructor (x = 0, y = 0, char = "@", color = "#FFFFFF", tag = FUtility.Game_Object_Tags.Player)
    {
        super(x, y, char, color, tag);
        this.Generate_Room = false;
        this.In_First_Room = true;
        this.Can_Enter_Doors = true;
        this.Draw_X = 0;
        this.Draw_Y = 0;
        this.In_Battle = false;
        this.Battle_Enemy = GEnemy_Base;
        this.Health = 100;
        this.Max_Health = 100;
        this.Attack_Damage = 20;
        this.Ice_Resistance = FUtility.Resistance_Types.Strong;
        this.Fire_Resistance = FUtility.Resistance_Types.Weak;
        this.Electric_Resistance = FUtility.Resistance_Types.Neutral;
        this.Name = "Player";

        //this.Overlap_Check = this.Overlap_Func;
    }

    // Stops entering and exiting door loops that can go on forever.
    Door_Loop_Stopper()
    {

    }

    Overlap_Func(game_World = new GGame_World())
    {
        
    }

    Movement(entity_List = [new RGame_Object()], move_Value = 0, move_X_Axis = true)
    {
        let move_Value_X = move_Value;
        let move_Value_Y = move_Value;
        if (move_X_Axis == true)
        {
            move_Value_Y = 0;
        }else
        {
            move_Value_X = 0;
        }

        for (let i = 0; i < entity_List.length; i++)
        {
            if (entity_List[i].X == this.X + move_Value_X && entity_List[i].Y == this.Y + move_Value_Y &&
                entity_List[i].Unique_Id != this.Unique_Id)
            {
                //console.log(entity_List[i].Char);
                //console.log(entity_List[i].Tag);
                switch (entity_List[i].Tag)
                {
                    case FUtility.Game_Object_Tags.Wall:
                    case FUtility.Game_Object_Tags.Wall_Corner:
                        return false;
                        break;
                    default:
                        this.Can_Enter_Doors = true;
                        this.X += move_Value_X;
                        this.Y += move_Value_Y;
                        this.Draw_X -= move_Value_X;
                        this.Draw_Y -= move_Value_Y;
                        return true;
                        break;
                }
                
            }
        }
    }

    Movement_Old(game_World = new GGame_World(), move_X, move_Y)
    {
        for (let i = 0; i < game_World.Entity_List.length; i++)
        {
            if (game_World.Entity_List[i].Tag != FUtility.Game_Object_Tags.Player)
            {
                game_World.Entity_List[i].X += move_X;
                game_World.Entity_List[i].Y += move_Y;
            }
        }
    }
}