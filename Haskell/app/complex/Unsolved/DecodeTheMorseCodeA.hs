-- https://www.codewars.com/kata/54b72c16cd7f5154e9000457/train/haskell
module Kata.DecodeMorseAdvanced where

-- import Kata.DecodeMorseAdvanced.Preload    -- holds the "morseCodes" data structure for you
import Data.Char
import Data.List
import Data.List.Split
import Data.Map.Strict ((!))

decodeBits :: String -> String
decodeBits bits = error "not implemented"

decodeMorse :: String -> String
decodeMorse str = combineString " " $ map (combineString "") mm 
    where mm = map (\x -> map parseMorseCodes x) $ splitMorse str

-- mmm = map (\x -> map (morseCodes !) x) $ splitMorse str
mmm = [["H","E","Y"],["J","U","D","E"]]
mmmm = ["H","E","Y"]

splitMorse :: String -> [[String]]
splitMorse str = map (\x -> splitOn " " x) $splitOn "   " $ trim str

combineString :: String -> [String] -> String
combineString _ [] = []
combineString _ [x] = x
combineString s (x:xs) = x ++ s ++ combineString s xs

trim = dropWhile isSpace . dropWhileEnd isSpace

parseMorseCodes :: String -> String
-- parseMorseCodes "···−−−···" = "···−−−···"
parseMorseCodes "" = ""
-- parseMorseCodes str = str
parseMorseCodes str = morseCodes ! str


-- morseCodes ! str = str
-- ".... . -.--   .--- ..- -.. ."
-- [["....",".","-.--"],[".---","..-","-..","."]]
-- "HEY JUDE"
--- [["H","E","Y"],["J","U","D","E"]]

