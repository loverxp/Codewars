
-- https://www.codewars.com/kata/52f78966747862fc9a0009ae/train/haskell
calculate :: String -> Double
calculate str = calcWithStack (reverse $ words str) []

ops = ["+", "-", "*", "/"]

calcWithStack :: [String] -> [Double] -> Double
calcWithStack [] [] = 0
calcWithStack [] [x] = x
calcWithStack (x:xs) [] = calcWithStack xs [read x]
calcWithStack (x:xs) stack@[_] = calcWithStack xs $ (read x):stack
calcWithStack (x:xs) stack@(v1:v2:vs) 
    | elem x ops = calcWithStack xs $ (doCalc x v1 v2):vs
    | otherwise  = calcWithStack xs $ (read x):stack
calcWithStack _ _ = error "expr error!"

doCalc op x y =
    case op of
        "+" -> x + y
        "-" -> x - y
        "*" -> x * y
        "/" -> x / y
        otherwise -> error "op error!"

-- ["1","2","+"]

-- "/ + 3 5 * 2 2"