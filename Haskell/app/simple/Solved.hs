module Solved where 

-- import Test.Hspec
import Data.Char
import Data.List
import Data.List.Split
-- import Text.Regex.Posix
-- import Test.HUnit
import Test.QuickCheck
-- import Text.Regex.PCRE
-- import Math.NumberTheory.ArithmeticFunctions
-- import Math.NumberTheory.Powers.Squares

-- https://www.codewars.com/kata/523f5d21c841566fde000009/solutions/haskell
difference :: Eq a => [a] -> [a] -> [a]
difference a [] = a
difference [] _ = []
difference (x:xs) b@(y:ys) = 
    if x == y 
    then difference xs b
    else (difference [x] ys) ++ (difference xs b)

-- https://www.codewars.com/kata/5552101f47fc5178b1000050/solutions/haskell
digpow :: Integer -> Integer -> Integer
digpow n p = 
    if mod value n == 0 
        then div value n
        else -1
    where value = digpow' n p

digpow' :: Integer -> Integer -> Integer
digpow' 0 _ = 0
digpow' n p = (digpow' front' p) + (last' ^ ((toInteger len) + p - 1))
    where
        len = (length (show n))
        last' = mod n 10
        front' = div (n - last')  10

-- https://www.codewars.com/kata/555615a77ebc7c2c8a0000b8/solutions/haskell
type Money = Int
data CanHe = NO | YES deriving (Show,Eq)

tickets :: [Money] -> CanHe
tickets l = tickets' [] l

tickets' :: [Money] -> [Money] -> CanHe
tickets' _ [] = YES
tickets' inbox (25:xs) = tickets' (25:inbox) xs
tickets' inbox (50:xs) = 
    if elem 25 inbox
        then tickets' (50:(delete 25 inbox)) xs
        else NO
tickets' inbox (100:xs)  
    | and [has25, has50] = tickets' (100:(delete 50 $ delete 25 inbox)) xs
    | length indexesOf25 >= 3 = tickets' (100:(delete 25 $delete 25 $ delete 25 inbox)) xs
    | otherwise = NO
    where 
        has25 = elem 25 inbox
        has50 = elem 50 inbox
        indexesOf25 = elemIndices 25 inbox
tickets' _ _ = NO
    
-- https://www.codewars.com/kata/55b42574ff091733d900002f/solutions/haskell
friend :: [String] -> [[Char]]
friend l = filter (\str -> 4 == length str) l

-- https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9/solutions/haskell
find_shortest :: String -> Integer
find_shortest = toInteger . head . sort . (map (\w -> length w)) . words 

-- https://www.codewars.com/kata/5266876b8f4bf2da9b000362/solutions/haskell
likes :: [String] -> String
likes [] = "no one likes this"
likes (x:[]) = x ++ " likes this"
likes (x:y:[]) = x ++ " and " ++ y ++ " like this"
likes (x:y:z:[]) = x ++ ", " ++ y ++ " and " ++ z ++ " like this"
likes (x:y:xs) = x ++ ", " ++ y ++ " and " ++ (show $length xs) ++ " others like this"


-- https://www.codewars.com/kata/5277c8a221e209d3f6000b56/solutions/haskell
validBraces :: String -> Bool
validBraces input = length output == 0
    where output = consumeBrace [] input

braces = [('(',')'),('[',']'),('{','}')]
-- leftBraces = map fst braces
-- rightBraces = map snd braces

matchBrace :: Char -> Char -> Bool
matchBrace left right = lookup left braces == Just right

consumeBrace :: String -> String -> String
consumeBrace [] (i:is) = consumeBrace [i] is
consumeBrace stack [] = stack
consumeBrace stack@(x:xs) (i1:i2:is)
    | matchBrace i1 i2 = consumeBrace stack is
    | matchBrace x i1 = consumeBrace xs (i2:is)
    | otherwise = consumeBrace (i2:i1:stack) is
consumeBrace stack@(x:xs) [i] = if matchBrace x i then xs else i:stack


-- https://www.codewars.com/kata/54b724efac3d5402db00065e/solutions/haskell
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
parseMorseCodes str = str
-- parseMorseCodes str = morseCodes ! str

-- ".... . -.--   .--- ..- -.. ."
-- [["....",".","-.--"],[".---","..-","-..","."]]
-- "HEY JUDE"
--- [["H","E","Y"],["J","U","D","E"]]

-- https://www.codewars.com/kata/5679aa472b8f57fb8c000047/solutions/haskell
findEvenIndex :: [Int] -> Int
findEvenIndex arr = findEvenIndex'  0 arr

findEvenIndex' :: Int -> [Int] -> Int
findEvenIndex' n xs 
    | n >= length xs = -1
    | sum as > sum bs = -1
    | sum as == sum bs = n
    | sum as < sum bs = findEvenIndex' (n + 1) xs
    where 
        (as, _:bs) = splitAt n xs
findEvenIndex' _ [] = -1 
findEvenIndex' _ _ = -1 

-- l :: [Int]
-- l = [1,2,3,4,3,2,1] 

-- https://www.codewars.com/kata/514b92a657cdc65150000006/solutions/haskell
solution :: Integer -> Integer
solution number  
    | next == 0 = 0
    | mod next 3 == 0 = total
    | mod next 5 == 0 = total
    | otherwise = rest
    where 
        next = number - 1
        rest = solution $ next
        total = next + rest

-- https://www.codewars.com/kata/51b6249c4612257ac0000005/solutions/haskell
romans = [('I', 1), ('V', 5), ('X', 10), ('L', 50), ('C', 100), ('D', 500), ('M', 1000)]

romansSolution :: String -> Int
romansSolution [] = 0
romansSolution [x] = 
    case lookup x romans of
        Just a -> a
        _ -> error ""
romansSolution (x:xs@(y:_))  
    | [x, y] == "IV" = 4
    | otherwise = romansSolution [x] + romansSolution xs


-- https://www.codewars.com/kata/52774a314c2333f0a7000688/solutions/haskell
validParentheses :: String -> Bool
validParentheses input = length output == 0
    where output = consumeParentheses [] input

matchParentheses :: Char -> Char -> Bool
matchParentheses '(' ')' = True
matchParentheses _ _ = False

consumeParentheses :: String -> String -> String
consumeParentheses [] (i:is) = consumeParentheses [i] is
consumeParentheses stack [] = stack
consumeParentheses stack@(x:xs) (i1:i2:is)
    | matchParentheses i1 i2 = consumeParentheses stack is
    | matchParentheses x i1 = consumeParentheses xs (i2:is)
    | otherwise = consumeParentheses (i2:i1:stack) is
consumeParentheses stack@(x:xs) [i] = if matchParentheses x i then xs else i:stack

-- https://www.codewars.com/kata/583203e6eb35d7980400002a/solutions/haskell
countSmileys :: [String] -> Int
countSmileys xs = length ys
    where ys = [y | y <- xs , isSimiley y]

isSimiley :: String -> Bool
isSimiley (':':xs) = isSimileyMouth $ removeNose xs
isSimiley (';':xs) = isSimileyMouth $ removeNose xs
isSimiley _ = False

removeNose :: String -> String
removeNose ('-':xs) = xs
removeNose ('~':xs) = xs
removeNose xs = xs

isSimileyMouth :: String -> Bool
isSimileyMouth ")" = True
isSimileyMouth "D" = True
isSimileyMouth _ = False



-- maxSequence :: [Int] -> Int
-- maxSequence =  maxSequence' . omitNegative . combineValue  



omitNegative :: [Int] -> [Int]
omitNegative [] = []
omitNegative l@(x:xs) = if x > 0 then l else omitNegative xs

combineValue:: [Int] -> [Int]
combineValue [] = []
combineValue [x] = [x]
combineValue (x:xs@(y:ys))
    | x * y > 0 = combineValue ((x + y):ys)
    | otherwise = x:(combineValue xs)

-- https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/solutions/haskell
maxSequence :: [Int] -> Int
maxSequence =  maxSequence' . omitNegative . combineValue  

maxSequence' :: [Int] -> Int
maxSequence' [] = 0
maxSequence' l = max wholeTotal $ max initMax tailMax
    where 
        wholeTotal = sum l
        initMax = maxLeft $ init l 
        tailMax = maxSequence' $ tail l

maxLeft :: [Int] -> Int
maxLeft [] = 0
maxLeft l = max wholeTotal initMax
    where 
        wholeTotal = sum l
        initMax = maxLeft $ init l 

-- l =  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
-- testl :: [Int]
-- testl =  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
-- l =  [-2, 1, -3, 4, -1, 2, 1, -3, 4]
-- l =  [-2, 1, -3, 4, -1, 2, 1, -5]
-- l1 = omitNegative . combineValue $ l
-- l1 = omitNegative . combineValue $ testl
-- result = maxSequence testl


-- https://www.codewars.com/kata/55aa075506463dac6600010d/train/haskell
listSquared :: Int -> Int -> [(Int, Int)]
listSquared m n = 
    [(x, y) | x <- [m..n], y <- return $ squared x, isIntegral $ sqrt $ fromInteger $ toInteger y]
    -- [(x, y) | x <- [m..n], y <- return $ squared x, isSquare y]
    -- filter (\(_,x) -> isIntegral $ sqrt $ fromInteger $ toInteger x) $ map (\x -> (x, squared x)) $ [m..n]
    where
        squared n = sum ((n^2):[x^2 | x <- [1..(div n 2)], n `rem` x == 0])
        isIntegral n = n == fromInteger (round n)
        -- isSquare n = n == fromInteger (round $ sqrt $ fromInteger $ toInteger n)

-- https://www.codewars.com/kata/5b16490986b6d336c900007d/solutions/haskell
type Language = String
type Score = Int

myLanguages :: [(Language,Score)] -> [Language]
myLanguages list = [y | (x,y) <- (reverse $ sort [(y,x) | (x, y) <- (sort list)]), x >= 60]


-- https://www.codewars.com/kata/57eadb7ecd143f4c9c0000a3/solutions/haskell
getInitials :: String -> String
getInitials str =  intersperse '.' [toUpper x | (x:_) <- splitOn " " str ]

-- str0 = "sam harris"
-- str1 = "Sam Harris"
-- str2 = "Patrick Feeney"


-- https://www.codewars.com/kata/551dc350bf4e526099000ae5/solutions/haskell
songDecoder :: String -> String
songDecoder =  unwords . (filter (not . null)) . splitOn "WUB"

-- str1 =  "AWUBBWUBC" 
-- str2 =  "AWUBWUBWUBBWUBWUBWUBC" 
-- str3 =  "WUBAWUBBWUBCWUB" 
-- str4 =  "WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB"
-- str5 =  "NEVERWUBWUBGONNAWUBGIVEWUBWUBYOUWUBWUBUPWUBWUBNEVERWUBWUBWUBWUBGONNAWUBWUBLETWUBWUBYOUWUBWUBDOWN"

-- https://www.codewars.com/kata/54c9fcad28ec4c6e680011aa/solutions/haskell
isMerge :: String -> String -> String -> Bool
isMerge "" "" "" = True
isMerge a "" c =  a == c
isMerge a b "" =  a == b
isMerge a@(x:xs) b@(y:ys) c@(z:zs) 
    | a == b ++ c = True
    | a == c ++ b = True
    | and [x == y, x == z] = or [mergeLeft , mergeRight]
    | x == y = mergeLeft
    | x == z = mergeRight
    | otherwise = False
    where 
        mergeLeft  = isMerge xs ys c
        mergeRight = isMerge xs b zs
isMerge _ _ _ = False

-- isMerge "codewars" "cdw" "oears"
-- isMerge "ars" "" "ars"
-- isMerge "codewars" "code" "wars"
-- isMerge "wars" "" "wars"
-- isMerge "Bananas from Bahamas" "Bahas" "Bananas from am"
-- isMerge "ahamas" "ahas" "am"
-- isMerge "amas" "as" "am"


-- https://www.codewars.com/kata/551f23362ff852e2ab000037/solutions/haskell
longestSlideDown :: [[Int]] -> Int
longestSlideDown x = head $ head $ longestSlideDown' $ reverse x


longestSlideDown' :: [[Int]] -> [[Int]]
longestSlideDown' [x] = [x]
longestSlideDown' (x:y:s) = longestSlideDown' $ newLayer:s
    where newLayer = combine2Layers y x

combine2Layers :: [Int] -> [Int] -> [Int]
combine2Layers [] _ = [] 
combine2Layers (x:xs) (y1:y2:ys) = (x + max y1 y2):(combine2Layers xs (y2:ys))

{-
testResult1 = longestSlideDown' $ reverse pyramids1
testResult2 = longestSlideDown' $ reverse pyramids2

pyramids1 = [[3], [7, 4], [2, 4, 6], [8, 5, 9, 3]] 
pyramids2 =
    [[75],
     [95, 64],
     [17, 47, 82],
     [18, 35, 87, 10],
     [20, 04, 82, 47, 65],
     [19, 01, 23, 75, 03, 34],
     [88, 02, 77, 73, 07, 63, 67],
     [99, 65, 04, 28, 06, 16, 70, 92],
     [41, 41, 26, 56, 83, 40, 80, 70, 33],
     [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
     [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
     [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
     [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
     [63, 66, 04, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
     [04, 62, 98, 27, 23, 09, 70, 98, 73, 93, 38, 53, 60, 04, 23]] 
-}

-- https://www.codewars.com/kata/55911ef14065454c75000062/solutions/haskell
multiply :: String -> String -> String
multiply xs ys = show $ read xs * read ys


-- https://www.codewars.com/kata/52f78966747862fc9a0009ae/train/haskell
calc :: String -> Double
calc str = calcWithStack (words str) []

ops = ["+", "-", "*", "/"]

calcWithStack :: [String] -> [Double] -> Double
calcWithStack [] [] = 0
calcWithStack [] [x] = x
calcWithStack (x:xs) [] = calcWithStack xs [read x]
calcWithStack (x:xs) stack@[_] = calcWithStack xs $ (read x):stack
calcWithStack (x:xs) stack@(v1:v2:vs) 
    | elem x ops = calcWithStack xs $ (doCalc x v2 v1):vs
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
