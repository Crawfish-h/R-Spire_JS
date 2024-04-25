class FRoom
{
    #Game_World;

    constructor(origin_X = 0, origin_Y = 0, direction = FUtility.Object_Directions.North, width_Min, width_Max, height_Min, height_Max,
                game_World = new GGame_World, parent_Door = GDoor)
    {
        this.Origin_X = origin_X;
        this.Origin_Y = origin_Y;
        this.Height_Min = height_Min;
        this.Height_Max = height_Max;
        this.Width_Min = width_Min;
        this.Width_Max = width_Max;
        this.Room_Entities = [];
        this.Direction = direction;
        this.#Game_World = game_World;
        this.Room_Width = FUtility.IRandom_Range(this.Width_Min, this.Width_Max);
        this.Room_Height = FUtility.IRandom_Range(this.Height_Min, this.Height_Max);
        this.Parent_Door = parent_Door;
        this.Is_Room_Inside_Room = false; // Prevent a room from generating inside another room.
        this.Enter_Door = GDoor; // The door that connects to the previous door.

        switch (this.Direction)
        {
            case FUtility.Object_Directions.North:
                //this.Set_Hallway_Size(true);
                this.Origin_Y -= this.Room_Height;
                this.Origin_X -= Math.floor(this.Room_Width/2);
                break;
            case FUtility.Object_Directions.South:
                //this.Set_Hallway_Size(true);
                this.Origin_X -= Math.floor(this.Room_Width/2);
                break;
            case FUtility.Object_Directions.East:
                //this.Set_Hallway_Size(false);
                this.Origin_Y -= Math.floor(this.Room_Height/2);
                break;
            case FUtility.Object_Directions.West:
                //this.Set_Hallway_Size(false);
                this.Origin_Y -= Math.floor(this.Room_Height/2);
                this.Origin_X -= Math.floor(this.Room_Width);
                break;
            default:
                break;
        }

        for (let i = 0; i < this.Room_Width - 1; i++)
        {
            for (let j = 0; j < this.Room_Height - 1; j++)
            {
                this.Create_Floor(1 + i, 1 + j);
            }
        }

        const valid_Spawn_Points = []
        for (let i = 0; i < this.Room_Width - 1; i++)
        {
            for (let j = 0; j < this.Room_Height - 1; j++)
            {
                valid_Spawn_Points.push({ X: i, Y: j });
            }
        }

        let enemy_Count = FUtility.IRandom_Range(0, 7);
        if (enemy_Count > valid_Spawn_Points.length)
        {
            enemy_Count = valid_Spawn_Points.length;
        }

        for (let i = 0; i < enemy_Count; i++)
        {
            let selected_Position_Index = FUtility.IRandom_Range(0, valid_Spawn_Points.length - 1);
            let selected_Enemy_Position = valid_Spawn_Points[selected_Position_Index];
            valid_Spawn_Points.splice(selected_Position_Index, 1);

            if (selected_Enemy_Position.X == this.#Game_World.Player.X &&
                selected_Enemy_Position.Y == this.#Game_World.Player.Y)
            {
                continue;
            }

            this.Create_Enemy(1 + selected_Enemy_Position.X, 1 + selected_Enemy_Position.Y);
        }

        for (let i = 0; i < this.Room_Width; i++)
        {
            if (i != Math.floor(this.Room_Width/2))
            {
                this.Create_Wall(i, 0);
                this.Create_Wall(i, this.Room_Height);
            }else
            {
                this.Create_Door(i, 0, FUtility.Object_Directions.North, FUtility.Object_Directions.South);
                this.Create_Door(i, this.Room_Height, FUtility.Object_Directions.South, FUtility.Object_Directions.North);
            }

            //game_World.Add_Entity(new RGame_Object(origin_X + i, origin_Y, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
            //game_World.Add_Entity(new RGame_Object(origin_X + i, origin_Y + this.Room_Height, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
        }

        for (let j = 0; j < this.Room_Height; j++)
        {
            if (j != Math.floor(this.Room_Height/2))
            {
                this.Create_Wall(0, j);
                this.Create_Wall(this.Room_Width, j);
            }else
            {
                this.Create_Door(0, j, FUtility.Object_Directions.West, FUtility.Object_Directions.East);
                this.Create_Door(this.Room_Width, j, FUtility.Object_Directions.East, FUtility.Object_Directions.West);
            }

            //game_World.Add_Entity(new RGame_Object(origin_X, origin_Y + j, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
            //game_World.Add_Entity(new RGame_Object(origin_X + this.Room_Width, origin_Y + j, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
        }

        if (this.Is_Room_Inside_Room == true)
        {
            this.Room_Entities.length = 0;
        }else
        {
            this.Enter_Door.Can_Generate_Hallway = false;
            this.Enter_Door.Door_Destination = this.Parent_Door;
            this.Parent_Door.Door_Destination = this.Enter_Door;

            for (let i = 0; i < this.Room_Entities.length; i++)
            {
                this.#Game_World.Add_Entity(this.Room_Entities[i]);
            }

            this.#Game_World.Add_Entity(new RGame_Object(this.Origin_X + this.Room_Width, this.Origin_Y + this.Room_Height, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
        }
    }

    Create_Enemy(offset_X = 0, offset_Y = 0)
    {
        if (this.Prevent_Object_Colocation(offset_X, offset_Y) == true) 
        {
            this.Is_Room_Inside_Room = true;
            return;
        }

        let enemy_Type = FUtility.IRandom_Range(0, 2);
        let enemy;
        switch (enemy_Type)
        {
            default:
            case 0:
                enemy = new GFire_Enemy(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "F", "#FF4900");
                break;
            case 1:
                enemy = new GIce_Enemy(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "I", "#00FFC5");
                break;
            case 2:
                enemy = new GElectric_Enemy(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "E", "#ECFF00");
                break;
        }
        
        //this.#Game_World.Add_Entity(enemy);
        this.Room_Entities.push(enemy);
    }

    Set_Hallway_Size(longer_Height = true)
    {
        if (true)
        {
            if (longer_Height == true)
            {
                this.Room_Width = this.Room_Height;
                this.Room_Height = Math.floor(this.Room_Height * 3);
            }else
            {
                this.Room_Height = this.Room_Width;
                this.Room_Width = Math.floor(this.Room_Width * 3);
            }
        }
    }

    Prevent_Object_Colocation(offset_X = 0, offset_Y = 0)
    {
        for (let i = 0; i < this.#Game_World.Entity_List.length; i++)
        {
            if (this.#Game_World.Entity_List[i].Compare_XY(this.Origin_X + offset_X, this.Origin_Y + offset_Y) == true && 
                this.#Game_World.Player.Compare_XY(this.#Game_World.Entity_List[i].X, this.#Game_World.Entity_List[i].Y) == false)
            {
                //if ()

                return true;
            }
        }

        return false;
    }

    Create_Wall(offset_X = 0, offset_Y = 0)
    {
        if (this.Prevent_Object_Colocation(offset_X, offset_Y) == true) 
        {
            this.Is_Room_Inside_Room = true;
            return;
        }

        let entity = new RGame_Object(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true);
        //this.#Game_World.Add_Entity(entity);
        this.Room_Entities.push(entity);
    }

    Create_Door(offset_X = 0, offset_Y = 0, direction, direction_Disable)
    {
        if (this.Prevent_Object_Colocation(offset_X, offset_Y) == true) 
        {
            this.Is_Room_Inside_Room = true;
            return;
        }

        let entity_Door = new GDoor(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "door", "#4a2f27", FUtility.Game_Object_Tags.Door);
        entity_Door.Direction = direction;

        if (this.Direction == direction_Disable)
        {
            this.Enter_Door = entity_Door;
        }/*else if (entity_Door.Get_Objects_In_Area(this.#Game_World, entity_Door.Direction, 5, GGame_World.Hallway_Max_Length + 1, 
            [FUtility.Game_Object_Tags.Wall, FUtility.Game_Object_Tags.Floor, FUtility.Game_Object_Tags.Door]).objects_In_Area == true)
        {
            entity_Door = null;
            this.Create_Wall(offset_X, offset_Y);
            return;
        }*/

        //this.#Game_World.Add_Entity(entity_Door);
        this.Room_Entities.push(entity_Door);
    }

    Create_Floor(offset_X = 0, offset_Y = 0)
    {
        if (this.Prevent_Object_Colocation(offset_X, offset_Y) == true) 
        {
            this.Is_Room_Inside_Room = true;
            return;
        }

        let entity = new RGame_Object(this.Origin_X + offset_X, this.Origin_Y + offset_Y, "Empty_Floor", "#A2A2A2", FUtility.Game_Object_Tags.Floor, undefined, false, false);
        //this.#Game_World.Add_Entity(entity);
        this.Room_Entities.push(entity);
    }

    Manage_Room_Hallway(hallway= new FHallway)
    {
        this.#Game_World.Add_Entity(entity);

        if (this.Is_Room_Inside_Room == true)
        {
            this.Room_Entities.length = 0;
        }
    }
}