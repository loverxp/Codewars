module Unsolved where 

import Data.List
import Data.List.Split
import Data.Char

-- https://www.codewars.com/kata/54eb33e5bc1a25440d000891/train/haskell
decompose :: Integer -> Maybe [Integer]
decompose n = Nothing
-- decompose n = 
    -- case decompose' $ n - 1 of
        -- where name = value

decompose' :: Integer -> Integer -> Maybe [Integer]
decompose' n m = Nothing

-- https://www.codewars.com/kata/5c824b7b9775761ada934500/train/haskell
rthnBetween :: Int -> Int -> [Int]
rthnBetween n1 n2 = filter isRightTruncatableHarshad [n1..n2]

isRightTruncatableHarshad :: Int -> Bool
isRightTruncatableHarshad 0 = True
isRightTruncatableHarshad n = and [isHarshad n, isRightTruncatableHarshad $ div n 10]

isHarshad :: Int -> Bool
isHarshad n 
    | n < 10 = True
    | otherwise = 0 == (rem n $ sumOfDigits n)

sumOfDigits :: Int -> Int
sumOfDigits n 
    | n >= 10 = total
    | otherwise = r
    where 
        r = rem n 10
        sum = (sumOfDigits $ div n 10)
        total = r + sum

-- 9000004000000
-- 9000002208852


-- dblLinear :: Int -> Integer
-- dblLinear 0 = 1
-- dblLinear n -- your code


type XY = (Int,Int)
data Move = U | D | R | L deriving (Eq, Show)

-- moves :: [Move]
moves = [U, D, R, L]
opposites = [(U, D), (D, U), (R, L), (L, R)]

solve :: [[Bool]] -> XY -> XY -> [Move] 
solve grid miner exit = undefined

move :: [[Bool]] -> Move -> XY -> XY -> Maybe [Move] 
move grid prevMove miner exit = undefined
    -- where
        -- from = lookup prevMove
        -- moves' = delete from moves

unmap = map (map (== ' '))
map1 = ["   ##" ,"## # " ,"     " ," # ##" ,"#    " ]




