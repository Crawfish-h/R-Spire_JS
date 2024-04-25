

class RGame_Object extends RObject
{
    constructor(x = 0, y = 0, char = "@", color = "#FFFFFF", tag = FUtility.Game_Object_Tags.Floor, overlap_Func = (game_World = new GGame_World()) => {},
                can_Overlap = true, can_Collide = true)
    {
        super(x, y);
        this.Char = char;
        this.Color = color;
        this.Tag = tag;
        this.Unique_Id = FUtility.Get_Unique_Id();
        this.Overlap_Check = overlap_Func || this.Super_Overlap_Check; // must accept the GGame_World as an argument.
        this.Can_Overlap = can_Overlap;
        this.Can_Collide = can_Collide;
        this.Start_X = this.X;
        this.Start_Y = this.Y;
        this.List_Index = -1; // The index of this RGame_Object inside of 'GGame_World.Entity_List'.
    }

    Super_Overlap_Check(game_World = new GGame_World())
    {
        
    }

    Is_Object_Tag_In_List(object= new RGame_Object, tag_Search_List= [])
    {
        for (let i = 0; i < tag_Search_List.length; i++)
        {
            if (object.Tag == tag_Search_List[i])
            {
                return true;
            }
        }

        return false;
    }

    Add_Area_Object_To_List(entity = new RGame_Object, tag_Search_List= [], objects_Within_Area= [])
    {
        if (this.Is_Object_Tag_In_List(entity, tag_Search_List) == true)
        {
            objects_Within_Area.push(entity);
        }
    }

    // Using null, "none", or undifined results in the area being scaned originating 
    // at this object, no direction, like a circle or pure square.
    Get_Objects_In_Area(game_World= new GGame_World, direction= FUtility.Object_Directions.North, area_Width= 1, area_Height= 1, 
        tag_Search_List= [])
    {   
        let objects_Within_Area = [];

        for (let i = 0; i < game_World.Entity_List.length; i++)
        {
            switch (direction)
            {
                case FUtility.Object_Directions.North:
                    //console.log("Door Pos: X.%d, Y.%d", this.X, this.Y);
                    if (game_World.Entity_List[i].X <= this.X + area_Width && game_World.Entity_List[i].X >= this.X - area_Width &&
                        game_World.Entity_List[i].Y > this.Y - area_Height && game_World.Entity_List[i].Y < this.Y)
                    {
                        this.Add_Area_Object_To_List(game_World.Entity_List[i], tag_Search_List, objects_Within_Area);
                    }
                    break;
                case FUtility.Object_Directions.South:
                    console.log("Door Pos: X.%d, Y.%d", this.X, this.Y);
                    if (game_World.Entity_List[i].X <= this.X + area_Width && game_World.Entity_List[i].X >= this.X - area_Width &&
                        game_World.Entity_List[i].Y > this.Y && game_World.Entity_List[i].Y < this.Y + area_Height)
                    {
                        console.log("South Add");
                        this.Add_Area_Object_To_List(game_World.Entity_List[i], tag_Search_List, objects_Within_Area);
                    }
                    break;
                case FUtility.Object_Directions.East:
                    if (game_World.Entity_List[i].X <= this.X + area_Height && game_World.Entity_List[i].X >= this.X &&
                        game_World.Entity_List[i].Y <= this.Y + area_Width && game_World.Entity_List[i].Y >= this.Y - area_Width)
                    {
                        this.Add_Area_Object_To_List(game_World.Entity_List[i], tag_Search_List, objects_Within_Area);
                    }
                    break;
                case FUtility.Object_Directions.West:
                    if (game_World.Entity_List[i].X <= this.X && game_World.Entity_List[i].X >= this.X - area_Height &&
                        game_World.Entity_List[i].Y <= this.Y + area_Width && game_World.Entity_List[i].Y >= this.Y - area_Width)
                    {
                        this.Add_Area_Object_To_List(game_World.Entity_List[i], tag_Search_List, objects_Within_Area);
                    }
                    break;
                default:
                    if (game_World.Entity_List[i].X <= this.X + area_Width && game_World.Entity_List[i].X >= this.X - area_Width &&
                        game_World.Entity_List[i].Y <= this.Y + area_Height && game_World.Entity_List[i].Y >= this.Y - area_Height)
                    {
                        this.Add_Area_Object_To_List(game_World.Entity_List[i], tag_Search_List, objects_Within_Area);
                    }
                    break;
            }
        }

        if (objects_Within_Area.length > 0)
        {
            return { objects_In_Area: true, object_list: objects_Within_Area }
        }else
        {
            return { objects_In_Area: false, object_list: [] }
        }
    }


    // Unused.
    Collision_Check(entity_List = [new RGame_Object()], move_Value = 0, move_X_Axis = true)
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
                        this.X += move_Value_X;
                        this.Y += move_Value_Y;
                        return true;
                        break;
                }
                
            }
        }
    }
}