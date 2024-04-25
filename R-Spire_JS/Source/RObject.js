class RObject
{
    constructor(x = 0, y = 0)
    {
        this.X = x;
        this.Y = y;
        this.Direction = FUtility.Object_Directions.North;
        this.Name = "Object";
    }

    Compare_XY(x = 0, y = 0, use_And = true)
    {
        if (use_And == true)
        {
            if (this.X == x && this.Y == y)
            {
                return true;
            }

            return false;
        }else
        {
            if (this.X == x || this.Y == y)
            {
                return true;
            }

            return false;
        }
    }
}