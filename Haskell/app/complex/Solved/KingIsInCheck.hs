-- https://www.codewars.com/kata/5e28ae347036fa001a504bbe/solutions/haskell
module Chess (kingIsInCheck) where

import Data.List
import Data.Char

type Chess = (Char, (Int, Int))

kingIsInCheck :: [[Char]] -> Bool
kingIsInCheck xs = 
    case lookup 'K' allChesses of
        Just k -> isAllCheck k allChesses
        _ -> error "no king!"
    where 
        allChesses = getAllChesses xs

isAllCheck :: (Int, Int) -> [Chess] -> Bool
isAllCheck k xs = or $ map (isCheck xs k) $ xs

isCheck :: [Chess] -> (Int, Int) -> Chess -> Bool
isCheck _ _ ('K', _) = False
isCheck xs k ('Q', q) = or [isCheck xs k ('B', q), isCheck xs k('R', q)]
isCheck xs (a1, b1) ('B', (a2, b2))
    | abs (a1 - a2) == abs (b1 - b2) = 
        0 == length [c | c@(_,(x, y)) <- xs, abs (a1 - x) == abs (b1 - y) && isBetween x a1 a2 && isBetween y b1 b2]
    | otherwise = False
isCheck xs (a1, b1) ('R', (a2, b2))
    | a1 == a2 = 0 == length [c | c@(_,(x, y)) <- xs, a1 == x && isBetween y b1 b2]
    | b1 == b2 = 0 == length [c | c@(_,(x, y)) <- xs, b1 == y && isBetween x a1 a2]
    | otherwise = False
isCheck _ (a, b) ('N', (x, y)) = or [and [abs (a - x) == 1, abs (b - y) == 2], and [abs (a - x) == 2, abs (b - y) == 1]]
isCheck _ (a, b) ('P', (x, y)) = and [abs (b - y) == 1, a - x == 1]
isCheck _ _ _ = error "other chess!"

isBetween :: Int -> Int -> Int -> Bool
isBetween x a b = (a - x)*(x - b) > 0


getAllChesses :: [[Char]] -> [Chess]
getAllChesses [] = []
getAllChesses xs = zip allTypes $ map (\x -> (div x 9, rem x 9)) allIndeices
    where 
        allIndeices = findIndices (not . isSpace) $ unlines xs
        allTypes = filter (not . isSpace) $ unlines xs
    

chess1 = [ "        "
         , "        "
         , "        "
         , "        "
         , "        "
         , " P      "
         , "K       "
         , "        "
         ]
chess2 =    [ "       K"
         , "        "
         , "        "
         , "        "
         , "        "
         , "        "
         , "        "
         , "B       "
         ]
chess3 = [ "        "
         , "        "
         , "        "
         , "    K   "
         , "        "
         , "        "
         , "        "
         , "    R   "
         ]
chess4 = [ "        "
         , "        "
         , "        "
         , "        "
         , "        "
         , " K      "
         , "        "
         , "N       "
         ]
chess5 = [ "        "
         , "        "
         , "  K     "
         , "        "
         , "        "
         , "        "
         , "        "
         , "        "
         ]
chess6 = [ "   B    "
         , "        "
         , "  K     "
         , "  N     "
         , "    P   "
         , "        "
         , "      Q "
         , "        "
         ]

chess7 = [ "        "
         , "       R"
         , "  B     "
         , "       K"
         , "        "
         , "        "
         , " R      "
         , "        "
         ]

all1 = [('B',(0,3)),('K',(2,2)),('N',(3,2)),('P',(4,4)),('Q',(6,6))]
all7 = [('R',(1,7)),('B',(2,2)),('K',(3,7)),('R',(6,1))]
-- [p@(_,(x,y)), (_,k@(a,b))] =  getAllChesses chess1
tr = isCheck [('K',(3,7))] (3,7) ('R',(1,7))
-- cs = [c | c@(_,(x, y)) <- all7, 7 == y && isBetween x b1 a2]