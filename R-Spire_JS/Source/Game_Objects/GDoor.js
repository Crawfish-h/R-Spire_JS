class GDoor extends RGame_Object
{
    constructor(x, y, char = "@", color = "#FFFFFF", tag = FUtility.Game_Object_Tags.Floor, player = new GPlayer)
    {
        super(x, y, char, color, tag, undefined);

        this.Overlap_Check = this.Overlap_Func;
        this.Can_Generate_Hallway = true;
        this.Door_Destination = undefined;
    }

    Door_Create_Room(direction)
    {

    }

    Overlap_Func(game_World = new GGame_World())
    {
        console.log("Overlap_Func");
        if (this.X == game_World.Player.X && this.Y == game_World.Player.Y && game_World.Player.Can_Enter_Doors == true)
        {
            game_World.Player.Can_Enter_Doors = false;
            if (this.Can_Generate_Hallway == true)
            {
                this.Can_Generate_Hallway = false;
                console.log(this.Direction);
                game_World.Generate_Hallway(this.X, this.Y, this.Direction, this);
                //this.Char = "E";
            }

            console.log(this.Door_Destination)

            if (this.Door_Destination != undefined)
            {
                game_World.Player.Draw_X += game_World.Player.X - this.Door_Destination.X;
                game_World.Player.Draw_Y += game_World.Player.Y - this.Door_Destination.Y;
                game_World.Player.X = this.Door_Destination.X;
                game_World.Player.Y = this.Door_Destination.Y;
            }else
            {
                this.Can_Generate_Hallway == false
            }
             

            /*
            switch (this.Direction)
            {
                case FUtility.Object_Directions.North:
                    game_World.Generate_Hallway(this.X, this.Y, FUtility.Object_Directions.North);
                    break;
                case FUtility.Object_Directions.South:
                    selected_Func(this.X, this.Y, FUtility.Object_Directions.South);
                    break;
                case FUtility.Object_Directions.East:
                    selected_Func(this.X, this.Y, FUtility.Object_Directions.East);
                    break;
                case FUtility.Object_Directions.West:
                    selected_Func(this.X, this.Y, FUtility.Object_Directions.West);
                    break;
                default:
                    break;
            }
            */

            
            
        }
    }
}