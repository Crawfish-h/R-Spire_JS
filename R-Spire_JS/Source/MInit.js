function Init()
{
    console.log("Init();");
    game_World = new GGame_World(15, 5);
    game_World.Generate_Room(30, 12, "None");
    game_World.Draw_Screen();

    console.log();

    const battle_System = new FBattle_System(game_World.Player);

    document.addEventListener("keydown", event => 
    {
        //console.log("Player-> X: %d, Y: %d", game_World.Player.X, game_World.Player.Y);

        if (game_World.Player.In_Battle == false)
        {
            switch(event.key)
            {
                case "w":
                    console.log("Player Pos: X.%d, Y.%d", game_World.Player.X, game_World.Player.Y);
                    game_World.Player.Movement(game_World.Entity_List, -1, false);
                    break;
                case "s":
                    game_World.Player.Movement(game_World.Entity_List, 1, false);
                    break;
                case "d":
                    game_World.Player.Movement(game_World.Entity_List, 1, true);
                    break;
                case "a":
                    game_World.Player.Movement(game_World.Entity_List, -1, true);
                    break;
                default:
                    break;
            }
        }else
        {
            Battle_Input(event, game_World, battle_System);
        }
    });

    Game_Loop(game_World, battle_System);
}

function Battle_Input(event= new KeyboardEvent, game_World= new GGame_World, battle_System= new FBattle_System)
{
    // battle_System.Curent_Turn == FBattle_System.Turn_Types.Player 
    if (game_World.Player.Health > 0 && game_World.Player.Battle_Enemy.Health > 0)
    {
        switch(event.key)
        {
            case "1":
                battle_System.Player_Current_Attack_Type = FBattle_System.Attack_Types.Ice;
                break;
            case "2":
                battle_System.Player_Current_Attack_Type = FBattle_System.Attack_Types.Fire;
                break;
            case "3":
                battle_System.Player_Current_Attack_Type = FBattle_System.Attack_Types.Electric;
                break;
            case " ": // Space key.
                battle_System.Battle_Turn(game_World.Player, game_World.Player.Battle_Enemy, battle_System.Player_Current_Attack_Type);
                if (game_World.Player.Battle_Enemy.Health < 1)
                {

                }else
                {
                    battle_System.Battle_Turn(game_World.Player.Battle_Enemy, game_World.Player, game_World.Player.Battle_Enemy.Attack_Type);
                }
                console.log("Space");
                break;
            default:
                break;
        }
    }else if (game_World.Player.Health > 0)
    {
        switch(event.key)
        {
            case "Enter":
                game_World.Player.Battle_Enemy.X = -1000;
                game_World.Player.Battle_Enemy.Y = -1000;
                game_World.Entity_List.splice(game_World.Player.Battle_Enemy.List_Index, 1);
                game_World.Player.Battle_Enemy = null;
                game_World.Player.In_Battle = false;
                break;
            default:
                break;
        }
    }
}

function Game_Loop(game_World= new GGame_World, battle_System= new FBattle_System)
{
    const step = () =>
    {
        //console.log("Stepping!");

        if (game_World.Player.In_Battle == false)
        {
            game_World.Draw_Screen();
            game_World.Overlap_Check_Loop();
        }else
        {
            game_World.Context.clearRect(0, 0, game_World.Canvas.width, game_World.Canvas.height);
            battle_System.Draw_Enemy();
            battle_System.Draw_Player();
            battle_System.Draw_Ice_Button();
            battle_System.Draw_Fire_Button();
            battle_System.Draw_Electric_Button();
            battle_System.Battle_End_Text(game_World.Player.Health, game_World.Player.Battle_Enemy.Health);
            battle_System.Draw_Battle_Log();
        }

        requestAnimationFrame(() =>
        {
            step();
        });
    }
    step();
}