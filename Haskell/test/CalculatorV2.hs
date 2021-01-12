-- {-# LANGUAGE DeriveAnyClass #-}

-- import Data.List.Split
import Control.Monad
import Text.ParserCombinators.Parsec
import Text.ParserCombinators.Parsec.Expr
import Text.ParserCombinators.Parsec.Language
import qualified Text.ParserCombinators.Parsec.Token as Token

-- data Expr = Number Double
data Expr = Number Integer
         --  | Expr String Expr Expr
          | Expr ABinOp Expr Expr
         -- | Expr Op Expr Expr
         -- | Op String
         -- | Skip
           deriving (Eq, Ord, Show)
           
data ABinOp = Add
            | Subtract
            | Multiply
            | Divide
              deriving (Show)
-- languageDef =
--    emptyDef {
            --  Token.reservedOpNames = []
            --  Token.reservedOpNames = ["+", "-", "*", "/" ]
            -- }

-- lexer = Token.makeTokenParser languageDef
lexer = Token.makeTokenParser emptyDef

-- identifier = Token.identifier lexer
parens     = Token.parens     lexer
reservedOp = Token.reservedOp lexer
integer    = Token.integer    lexer
double     = Token.float      lexer

aOperators = [ [Prefix (reservedOp "-"   >> return (Neg             ))          ]
             , [Infix  (reservedOp "*"   >> return (Expr Multiply)) AssocLeft,
                Infix  (reservedOp "/"   >> return (Expr Divide  )) AssocLeft]
             , [Infix  (reservedOp "+"   >> return (Expr Add     )) AssocLeft,
                Infix  (reservedOp "-"   >> return (Expr Subtract)) AssocLeft]
             ]

aExpression :: Parser Expr
aExpression = buildExpressionParser aOperators aTerm

aTerm :: Parser Expr
aTerm =  parens aExpression
      <|> liftM Number integer


expression :: Parser Expr
expression =  parens calcExpr 
    -- <|> calcExpr
    -- <|> liftM Number double
    <|> liftM Number integer

-- op :: Parser Char
-- op = oneOf "+-*/"

-- calcOps :: Parser Expr
calcOps = (reservedOp "+" >> return "+")
      <|> (reservedOp "-" >> return "-")
      <|> (reservedOp "*" >> return "*")
      <|> (reservedOp "/" >> return "/")

ops = ['+','-']

calcExpr :: Parser Expr
calcExpr = 
    do expr1 <- expression
       op <- calcOps
       expr2 <- expression
       return $ Expr op expr1 expr2

{-
parseString :: String -> Expr
parseString str = parse Skip $ splitOn " " str

-- parse :: String -> Expr
parse :: Expr -> [String] -> Expr
-- parse Skip [] = Skip
parse expr [] = expr
parse Skip [x] = Number $ read x
parse expr [op, x] = Expr op expr $ Number $ read x
parse Skip (x1:op:x2:xs) = parse (parse (parse Skip [x1]) [op, x2]) xs

-- parse expr (op:x:xs) = parse (parse expr [op, x]) xs

parse _ _ = error ""
-}

-- parse :: String -> Expr
-- parse [x] = Number $ read x
-- parse [x1,op,x2] = Expr op (parse [x1]) (parse [x2])
-- parse [x1,op1,x2,op2,x3] = Expr op2 (parse [x1,op1,x2]) (parse [x3])
-- parse x1:op1:x2:op2:xs = Expr op2 (parse [x1,op1,x2]) (parse [x3])
-- parse [x,y,z] = Expr y (parse [x]) (parse [z])
-- parse x:y:z:l = Expr y (parse [x]) (parse [z])
-- parse (x:xs) = Number 0
-- parse  _ = error ""

-- calc :: Expr -> Double   
calc :: Expr -> Integer   
calc (Number x) = x
calc (Expr "+" x y) = calc x + calc y
calc (Expr "-" x y) = calc x - calc y
calc (Expr "*" x y) = calc x * calc y
-- calc (Expr "/" x y) = calc x / calc y
calc s = error ("not supported: " ++ show s)


-- evaluate :: String -> Double   
-- evaluate str = calc $ parseString str

evaluate :: String -> Expr
evaluate str =
  -- case parse calcExpr "" str of
  case parse aExpression "" str of
--   case parse calcExpr "" [x | x <- str, x /= ' '] of
    Left e  -> error $ show e
    Right r -> r
    -- Right r -> eval r


expr00 = "2 + 4 - 13"                        -- -7
expr01 = "2 + ( 4 - 13 )"                        -- -7
expr1 = "2 / 2 + 3 * 4 - 13"                -- 0
expr2 = "4 + 3 * 4 / 3 - 6 / 3 * 3 + 8"     -- 10
expr3 = "9 + ( 3 - 1 ) * 3 + 10 / 2"        -- 20
