class FHallway
{
    #Game_World;

    constructor(origin_X = 0, origin_Y = 0, direction = FUtility.Object_Directions.North, length_Min, length_Max,
                game_World = GGame_World, parent_Door = GDoor)
    {
        this.Origin_X = origin_X;
        this.Origin_Y = origin_Y;
        this.Length_Min = length_Min;
        this.Length_Max = length_Max;
        this.Direction = direction;
        this.#Game_World = game_World;
        this.Hallway_Entities = [];
        this.Parent_Door = parent_Door;

        // '0' = curving to the left, '1' = completely straight, '2' = curving to the right.
        const hallway_Curve = FUtility.IRandom_Range(0, 4);
        const hallway_Length = FUtility.IRandom_Range(this.Length_Min, this.Length_Max);
        let curve_Value = 0;

        let room_Offset_X = 0;
        let room_Offset_Y = 0;

        for (let i = 0; i < hallway_Length; i++)
        {
            if (FUtility.IRandom_Range(0, 100) < 50)
            {
                if (hallway_Curve < 2)
                {
                    curve_Value++;
                }else if (hallway_Curve > 2)
                {
                    curve_Value--;
                }
            }

            if (this.Hallway_Entities.length == 0)
            {
                curve_Value = 0;
            }

            switch (this.Direction)
            {
                default:
                case FUtility.Object_Directions.North:
                    this.Create_Hallway(curve_Value, -i - 2);
                break;
                case FUtility.Object_Directions.South:
                    this.Create_Hallway(curve_Value, i - 1);
                    room_Offset_Y = 2;
                break;
                case FUtility.Object_Directions.East:
                    this.Create_Hallway(i + 1, curve_Value - 1);
                    room_Offset_X = 1;
                    room_Offset_Y = 1;
                break;
                case FUtility.Object_Directions.West:
                    this.Create_Hallway(-i - 1, curve_Value - 1);
                    room_Offset_X = -1;
                    room_Offset_Y = 1;
                break;
            }
        }

        const last_Entity = this.Hallway_Entities[this.Hallway_Entities.length - 1];
        let room = this.#Game_World.Generate_Room(last_Entity.X + room_Offset_X, last_Entity.Y + room_Offset_Y, this.Direction, this.Parent_Door);
        
        if (room.Is_Room_Inside_Room == false)
        {
            for (let i = 0; i < this.Hallway_Entities.length; i++)
            {
                this.#Game_World.Add_Entity(this.Hallway_Entities[i]);
            }
        }else
        {
            this.Hallway_Entities.length = 0;
        }

        //this.Hallway_Entities.length = 0;
    }

    Create_Hallway(offset_X = 0, offset_Y = 0)
    {
        let entity = new RGame_Object(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "Hallway", "#618275", FUtility.Game_Object_Tags.Floor, undefined, false, false);
        this.Hallway_Entities.push(entity);
    }
}