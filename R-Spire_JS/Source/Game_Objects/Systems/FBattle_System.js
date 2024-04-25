class FBattle_System
{
    constructor(player= GPlayer)
    {
        this.Player = player;
        this.Game_Container = document.querySelector(".game-container");
        this.Canvas = this.Game_Container.querySelector(".game-canvas");
        this.Context = this.Canvas.getContext("2d");
        this.Ice_Button_Pos = { X: this.Canvas.width/2 - 500, Y: this.Canvas.height/2 + 400 };
        this.Player_Current_Attack_Type = FBattle_System.Attack_Types.Ice;
        this.Curent_Turn = FBattle_System.Turn_Types.Player;
        this.Battle_Logs = [];
        this.Max_Battle_Log_Size = 12;
        this.Battle_Logs.push("-------");
        this.Battle_Logs.push("-------");
        this.Battle_Logs.push("-------");
        this.Battle_Logs.push("-------");
        this.Battle_Logs.push("-------");
        this.Battle_Logs.push("-------");
    }

    static Turn_Types = 
    {
        Player: "Player",
        Enemy: "Enemy"
    }

    static Attack_Types = 
    {
        Ice: "Ice",
        Fire: "Fire",
        Electric: "Electric"
    }

    Draw_Enemy()
    {
        this.Context.fillStyle = this.Player.Battle_Enemy.Color;
        this.Context.font = "200px serif";
        this.Context.fillText(this.Player.Battle_Enemy.Char, (this.Canvas.width/2 - 200), (this.Canvas.height/2 - 9));
    }

    Draw_Player()
    {
        this.Context.fillStyle = this.Player.Color;
        this.Context.font = "300px serif";
        this.Context.fillText(this.Player.Char, (this.Canvas.width/2 + 500), (this.Canvas.height/2 + 500));
    }

    Draw_Battle_Log()
    {
        this.Context.fillStyle = "#ADB0A3";
        this.Context.font = "20px serif";

        for (let i = 0; i < this.Battle_Logs.length; i++)
        {
            this.Context.fillText(this.Battle_Logs[i], (this.Canvas.width/2 - 1000), (this.Canvas.height/2 - 300) + (i * 27));
        }

        this.Context.font = "40px serif";
        this.Context.fillText("BATTLE LOG", (this.Canvas.width/2 - 1000), (this.Canvas.height/2 + 20));
    }

    Draw_Ice_Button()
    {
        this.Context.fillStyle = "#2B3231";
        this.Context.fillRect(this.Canvas.width/2 - 1000, this.Canvas.height/2 + 270, 400, 200);
        this.Context.fillStyle = "#B3FFFE";
        this.Context.font = "70px serif";
        this.Context.fillText("1. Ice Storm", (this.Canvas.width/2 - 1000), (this.Canvas.height/2 + 410));
    }

    Draw_Fire_Button()
    {
        this.Context.fillStyle = "#2B3231";
        this.Context.fillRect(this.Canvas.width/2 - 500, this.Canvas.height/2 + 270, 400, 200);
        this.Context.fillStyle = "#FF6800";
        this.Context.font = "70px serif";
        this.Context.fillText("2. Fire Strike", (this.Canvas.width/2 - 480), (this.Canvas.height/2 + 410));
    }

    Draw_Electric_Button()
    {
        this.Context.fillStyle = "#2B3231";
        this.Context.fillRect(this.Canvas.width/2 - 0, this.Canvas.height/2 + 270, 400, 200);
        this.Context.fillStyle = "#F7FF00";
        this.Context.font = "70px serif";
        this.Context.fillText("3. Elec Bolt", (this.Canvas.width/2 + 10), (this.Canvas.height/2 + 410));
    }

    Append_Battle_Log(message= "string")
    {
        this.Battle_Logs.push(message);

        if (this.Battle_Logs.length >= this.Max_Battle_Log_Size)
        {
            this.Battle_Logs.shift();
        }
    }

    Battle_Turn(attacker= GFighter_Base, defender= GFighter_Base, attack_Type= FBattle_System.Attack_Types.Ice)
    {
        let damage;
        let damage_Type;
        let res_Type;
        switch (attack_Type)
        {
            case FBattle_System.Attack_Types.Ice:
                damage = defender.Ice_Resistance.Value * attacker.Attack_Damage;
                res_Type = defender.Ice_Resistance.Type;
                damage_Type = "ice";
                break;
            case FBattle_System.Attack_Types.Fire:
                damage = defender.Fire_Resistance.Value * attacker.Attack_Damage;
                res_Type = defender.Fire_Resistance.Type;
                damage_Type = "Fire";
                break;
            case FBattle_System.Attack_Types.Electric:
                damage = defender.Electric_Resistance.Value * attacker.Attack_Damage;
                res_Type = defender.Electric_Resistance.Type;
                damage_Type = "Electric";
                break;
            default:
                damage = defender.Ice_Resistance.Value * attacker.Attack_Damage;
                res_Type = defender.Ice_Resistance.Type;
                damage_Type = "ice";
                break;
        }

        damage += Math.round(damage * FUtility.FRandom_Range(-0.2, 0.2));
        defender.Health -= damage;
        let res_Text;

        switch (res_Type)
        {
            case FUtility.Resistance_Types.Neutral.Type:
                res_Text = "normal";
                break;
            case FUtility.Resistance_Types.Strong.Type:
                res_Text = "low";
                break;
            case FUtility.Resistance_Types.Weak.Type:
                res_Text = "high";
                break;
            default:
                res_Text = "Normal";
                break;
        }

        

        this.Append_Battle_Log(`${attacker.Name} did ${damage} ${res_Text} ${damage_Type} damage to ${defender.Name}!`);
        this.Append_Battle_Log(`${defender.Name} has ${defender.Health} health remaining.`);
    }

    Battle_End_Text(player_Health = 1, enemy_Health = 1)
    {
        if (enemy_Health < 1)
        {
            game_World.Context.clearRect(0, 0, game_World.Canvas.width, game_World.Canvas.height);
            this.Context.fillStyle = "#00FFDC";
            this.Context.font = "80px serif";
            this.Context.fillText("Enemy Defeated!! Battle over!", (this.Canvas.width/2 - 500), (this.Canvas.height/2));
            
            this.Context.font = "60px serif";
            this.Context.fillText("Press Enter to exit the battle.", (this.Canvas.width/2 - 400), (this.Canvas.height/2 + 100));
        }else if (player_Health < 1)
        {
            game_World.Context.clearRect(0, 0, game_World.Canvas.width, game_World.Canvas.height);
            this.Context.fillStyle = "#AB3043";
            this.Context.font = "80px serif";
            this.Context.fillText("YOU ARE DEAD!! Game over!", (this.Canvas.width/2 - 500), (this.Canvas.height/2));

            this.Context.font = "60x serif";
            this.Context.fillText("Reload to start a new game!", (this.Canvas.width/2 - 400), (this.Canvas.height/2 + 100));
        }
    }
}