-- https://www.codewars.com/kata/58e24788e24ddee28e000053/train/haskell

import qualified Data.Map.Strict as M
import Text.Read


type Registers = M.Map String Int


data Value = Const Int
           | Register String
             deriving (Show)

data Instruction = Mov String Value 
                 | Inc String
                 | Dec String
                 | Jnz Value Value
                 | Empty
                 | Error
                   deriving (Show)

simpleAssembler :: [String] -> Registers
simpleAssembler ss = M.delete "p" $ simpleAssembler' (map parseString ss) registers

simpleAssembler' :: [Instruction] -> Registers -> Registers
simpleAssembler' [] r = r
simpleAssembler' is r =
    case readNextInstruction is r  of
        Just i -> simpleAssembler' is $ evalInstruction i r
        _ -> r
    where nextI = readNextInstruction is r


registers :: Registers
registers = M.fromList [("p", 0)]

parse :: [String] -> [Instruction]
parse = map parseString

parseString :: String -> Instruction
parseString str = 
    case words str of
        [] -> Empty
        ["mov", x, y] -> Mov x $ parseValue y
        ["inc", x] -> Inc x
        ["dec", x] -> Dec x
        ["jnz", x, y] -> Jnz (parseValue x) (parseValue y)
        otherwise -> Error

parseValue :: String -> Value
parseValue str = 
    case readMaybe str :: Maybe Int of
        Just v  -> Const v
        Nothing -> Register str

evalInstruction :: Instruction -> Registers -> Registers
evalInstruction (Mov rn a) r = M.insert rn i $ moveToNext r
    where 
        i = getValue a r
evalInstruction (Inc rn) r = M.adjust (1+) rn $ moveToNext r
evalInstruction (Dec rn) r = M.adjust (\x -> x - 1) rn $ moveToNext r
evalInstruction (Jnz i j) r = if i' /= 0 then M.adjust (\x -> x + j') "p" r else moveToNext r
    where 
        i' = getValue i r
        j' = getValue j r
evalInstruction Empty r = r
evalInstruction _ _ = error "??"

getValue :: Value -> Registers -> Int
getValue (Const i) _ = i
getValue (Register str) r = 
    case M.lookup str r of
        Just v  -> v
        Nothing -> error $ str ++ " not exist!"

moveToNext :: Registers -> Registers
moveToNext r = M.adjust (+1) "p" r

readNextInstruction :: [Instruction] -> Registers -> Maybe Instruction
readNextInstruction is r 
    | pos < 0 = Nothing
    | pos < length is = Just $ is !! pos
    | otherwise = Nothing
    where Just pos = M.lookup "p" r

is0 = ["mov a 5"]
is1 = ["mov a 5","inc a","dec a","dec a","jnz a -1", "inc a"] 
is12 = ["mov a b","inc a","dec a","dec a","jnz a b", "inc a"] 
is11 = ["mov a 5","inc a","dec a","dec a", "inc a", "inc a"] 
iss1 = [Mov "a" (Const 5),Inc "a",Dec "a",Dec "a",Jnz (Register "a") (Const (-1)),Inc "a"]
is2 = ["mov a -10","mov b a","inc a","dec b","jnz a -2"] 
is21 = ["mov a -10","mov b a","inc a","dec b"] 
is22 = ["mov a -10","mov b a","inc a","dec b","jnz 0 -2"] 
is23 = ["mov a -10","mov b a","inc a","dec b","jnz 0 -2","jnz 5 10"] 
is24 = ["mov a -10","mov b a","inc a","dec b","jnz 0 -2","jnz 5 -10","mov c a"] 