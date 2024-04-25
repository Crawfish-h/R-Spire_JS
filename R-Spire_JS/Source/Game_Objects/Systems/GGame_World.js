class GGame_World extends RGame_Object
{
    // config: Room_Size_Min: min room size, Room_Size_Max: max room size.
    constructor(room_Size_Max, room_Size_Min)
    {
        super(0, 0, "", "#FFFFFF", "none");
        this.Room_Size_Max = room_Size_Max;
        this.Room_Size_Min = room_Size_Min;
        this.Game_Container = document.querySelector(".game-container");
        this.Canvas = this.Game_Container.querySelector(".game-canvas");
        this.Context = this.Canvas.getContext("2d");
        this.Entity_List = [];
        this.Hallway_List = [];
        this.Player = new GPlayer(34, 16, "@", "#FFFFFF", FUtility.Game_Object_Tags.Player);
        this.Add_Entity(this.Player);
    }

    static Hallway_Max_Length = 14;

    Draw_Object_Text(iterator = 0, offset_X = 0, offset_Y = 0, char = "")
    {
        if (char == "")
        {
            char = this.Entity_List[iterator].Char;
        }
        //this.Context.fillText(char, (this.Entity_List[iterator].X + offset_X) * 30, (this.Entity_List[iterator].Y + offset_Y) * 30);
        this.Context.fillText(char, (this.Entity_List[iterator].X + offset_X + this.Player.Draw_X) * 30, (this.Entity_List[iterator].Y + offset_Y + this.Player.Draw_Y) * 30);
    }

    Overlap_Check_Loop()
    {
        for (let i = 0; i < this.Entity_List.length; i++)
        {
            if (this.Entity_List[i].Can_Overlap == true)
            {
                this.Entity_List[i].Overlap_Check(this);
            }
        }
    }

    Draw_Screen()
    {
        this.Context.font = "40px serif";
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        for (let i = 0; i < this.Entity_List.length; i++)
        {
            this.Context.fillStyle = this.Entity_List[i].Color;

            switch (this.Entity_List[i].Char)
            {
                case "Horizontal_Wall":
                    //this.Context.fillRect(this.Entity_List[i].X * 30, (this.Entity_List[i].Y) * 30, 30, 10);
                    this.Draw_Object_Text(i, 0, 0, "#");
                    break;
                case "Vertical_Wall":
                    //this.Context.fillRect(this.Entity_List[i].X * 30, (this.Entity_List[i].Y) * 30, 10, 30);
                    this.Draw_Object_Text(i, 0, 0, "#");
                    break;
                case "Hallway":
                    this.Context.fillRect((this.Entity_List[i].X + this.Player.Draw_X) * 30, (this.Entity_List[i].Y + this.Player.Draw_Y) * 30, 30, 30);
                    //this.Draw_Object_Text(i, 0, 0, "#");
                    break;
                case "Empty_Floor":
                    this.Draw_Object_Text(i, 0.2, -0.4, ".");
                    break;
                case "door":
                    this.Draw_Object_Text(i, 0, 0, "+");
                    //this.Context.fillText("+", (this.Entity_List[i].X) * 30, (this.Entity_List[i].Y) * 30);
                    break;
                case "@":
                    //this.Draw_Object_Text(i, -0.2, -0.2);
                    this.Context.fillText("@", (this.Canvas.width/2 - 9) * 1, (this.Canvas.height/2 - 9) * 1);
                    //this.Context.fillText("A", (this.Player.X) * 30, (this.Player.Y) * 30); // Player position marker.
                    //this.Context.fillText("B", (this.Player.X + this.Player.Draw_X) * 30, (this.Player.Y + this.Player.Draw_Y) * 30); // Player position marker 2.
                    break;
                case "X":
                    this.Draw_Object_Text(i, -0.12, 0, "");
                    break;
                default:
                    this.Draw_Object_Text(i, 0, 0, "");
                    break;
            }
        }
    }

    Generate_Room(room_Origin_X = 0, room_Origin_Y = 0, direction = FUtility.Object_Directions.North, door = GDoor)
    {
        const room = new FRoom(room_Origin_X, room_Origin_Y, direction, 6, 16, 6, 16, this, door);
        return room;
    }

    Generate_Hallway(room_Origin_X = 0, room_Origin_Y = 0, direction = FUtility.Object_Directions.North, door = GDoor)
    {
        //const hallway = new FRoom(room_Origin_X, room_Origin_Y, direction, 3, 5, 3, 5, this, true);
        const hallway = new FHallway(room_Origin_X, room_Origin_Y, direction, 6, GGame_World.Hallway_Max_Length, this, door);
    }

    Generate_Room_Old(room_Origin_X = 0, room_Origin_Y = 0)
    {
        let max_Doors = FUtility.IRandom_Range(1, 4);
        let door_Num = { value: 0 };
        let room_Size = FUtility.IRandom_Range(this.Room_Size_Min, this.Room_Size_Max);
        for (let j = room_Origin_Y; j < room_Size + room_Origin_Y; j++)
        {
            for (let i = room_Origin_X; i < room_Size + room_Origin_X; i++)
            {
                let entity;
                let entity_Type = "Empty_Floor";
                let entity_Tag = FUtility.Game_Object_Tags.Floor;
                let entity_Color = "#A2A2A2";
                let wall_X_Add = 0;
                let can_Overlap = false;
                let can_Collide = false;

                if (i == room_Origin_X)
                {
                    entity_Type = "Vertical_Wall";
                    entity_Color = "#FFFFFF";
                    entity_Tag = FUtility.Game_Object_Tags.Wall;
                    can_Overlap = true;
                    can_Collide = true;
                }

                if (j == room_Origin_Y)
                {
                    entity_Type = "Horizontal_Wall";
                    entity_Color = "#FFFFFF";
                    entity_Tag = FUtility.Game_Object_Tags.Wall;
                    can_Overlap = true;
                    can_Collide = true;
                }

                if (i == room_Size + room_Origin_X - 1)
                {
                    entity_Type = "Vertical_Wall";
                    entity_Color = "#FFFFFF";
                    entity_Tag = FUtility.Game_Object_Tags.Wall;
                    can_Overlap = true;
                    can_Collide = true;
                }

                if (j == room_Size + room_Origin_Y - 1)
                {
                    entity_Type = "Horizontal_Wall";
                    entity_Color = "#FFFFFF";
                    entity_Tag = FUtility.Game_Object_Tags.Wall;
                    can_Overlap = true;
                    can_Collide = true;
                }

                if (j == room_Size + room_Origin_Y - 1 && i == room_Size + room_Origin_X - 1)
                {
                    entity_Type = "Horizontal_Wall";
                    entity_Color = "#FFFFFF";
                    //wall_X_Add = -0.67;
                    entity_Tag = FUtility.Game_Object_Tags.Wall;
                    can_Overlap = true;
                    can_Collide = true;
                }

                if (j == room_Origin_Y && i == room_Origin_X)
                {
                    this.Add_Entity(new RGame_Object(i, j, "Vertical_Wall", "#FFFFFF", FUtility.Game_Object_Tags.Wall, undefined, true, true));
                }

                entity = new RGame_Object(i + wall_X_Add, j, entity_Type, entity_Color, entity_Tag, undefined, can_Overlap, can_Collide);
            
                this.Add_Entity(entity);

                if (door_Num.value < max_Doors && FUtility.IRandom_Range(0, 100) <= 10)
                {
                    this.Room_Add_Doors(room_Origin_X, room_Origin_Y, room_Size, door_Num);
                }
            }
        }

        while (door_Num.value == 0)
        {
            let random_Entity = this.Entity_List[FUtility.IRandom_Range(0, this.Entity_List.length - 1)];
            if (this.Room_Corner_Check(random_Entity, room_Origin_X, room_Origin_Y, room_Size) == false)
            {
                door_Num.value++;
                this.Create_Door(random_Entity, room_Origin_X, room_Origin_Y, room_Size);
                break;
            }

        }
    }  

    Add_Entity(entity= RGame_Object)
    {
        this.Entity_List.push(entity);
        entity.List_Index = this.Entity_List.length - 1;
    }

    // Checks if an entity is a corner of a room.
    Room_Corner_Check(entity = new RGame_Object(), room_Origin_X = 0, room_Origin_Y = 0, room_Size = 0)
    {
        if (entity.Compare_XY(room_Origin_X, room_Origin_Y) == true || 
            entity.Compare_XY(room_Size + room_Origin_X - 1, room_Size + room_Origin_Y - 1) == true ||
            entity.Compare_XY(room_Origin_X, room_Size + room_Origin_Y - 1) == true ||
            entity.Compare_XY(room_Size + room_Origin_X - 1, room_Origin_Y) == true)
        {
            return true;
        }

        return false;
    }

    Create_Door(entity, room_Origin_X, room_Origin_Y, room_Size)
    {
        this.Entity_List.pop();
        entity = new GDoor(entity.X, entity.Y, "door", "#4a2f27", FUtility.Game_Object_Tags.Door);
        this.Add_Entity(entity);
        entity.Direction = FUtility.Object_Directions;

        switch (entity.X)
        {
            case room_Origin_X:
                entity.Direction = FUtility.Object_Directions.West;
                break;
            case room_Size + room_Origin_X - 1:
                entity.Direction = FUtility.Object_Directions.East;
                break;
            default:
                entity.Direction = FUtility.Object_Directions.North;
                break;
        }

        switch (entity.Y)
        {
            case room_Origin_Y:
                entity.Direction = FUtility.Object_Directions.North;
                break;
            case room_Size + room_Origin_Y - 1:
                entity.Direction = FUtility.Object_Directions.South;
                break;
            default:
                break;
        }
    }

    Room_Add_Doors(room_Origin_X, room_Origin_Y, room_Size, door_Num)
    {
        // Make sure the entity is a wall and is not a corner.
        let entity = this.Entity_List[this.Entity_List.length - 1];
        if (entity.Tag == FUtility.Game_Object_Tags.Wall &&
            this.Room_Corner_Check(entity, room_Origin_X, room_Origin_Y, room_Size) == false)
        {
            door_Num.value++;
            this.Create_Door(entity, room_Origin_X, room_Origin_Y, room_Size);
        }
    }
    
}