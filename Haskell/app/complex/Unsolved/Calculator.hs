module Calculator where

import Control.Monad
import Text.ParserCombinators.Parsec
import Text.ParserCombinators.Parsec.Expr
import Text.ParserCombinators.Parsec.Language
import qualified Text.ParserCombinators.Parsec.Token as Token
import Debug.Trace

-- https://www.codewars.com/kata/5235c913397cbf2508000048/train/haskell

data Expr = Number Double
          | Expr Op Expr Expr
            deriving (Show)

data Op = Add | Sub | Mul | Div
          deriving (Show)

lexer = Token.makeTokenParser emptyDef

parens     = Token.parens     lexer
reservedOp = Token.reservedOp lexer
integer    = Token.integer    lexer
double     = Token.float      lexer

aOperators = [ 
              [Infix  (reservedOp "*"   >> return (Expr Mul)) AssocLeft,
               Infix  (reservedOp "/"   >> return (Expr Div)) AssocLeft]
            , [Infix  (reservedOp "+"   >> return (Expr Add)) AssocLeft,
               Infix  (reservedOp "-"   >> return (Expr Sub)) AssocLeft]
             ]

expression :: Parser Expr
expression = buildExpressionParser aOperators term

term :: Parser Expr
term =  parens expression
      <|> liftM Number doubleValue

doubleValue :: Parser Double
doubleValue = 
  do value <- integer
     return $ fromInteger value

calcOps = (reservedOp "+" >> return "+")
      <|> (reservedOp "-" >> return "-")
      <|> (reservedOp "*" >> return "*")
      <|> (reservedOp "/" >> return "/")

calc :: Expr -> Double   
calc (Number x) = x
calc (Expr Add x y) = calc x + calc y
calc (Expr Sub x y) = calc x - calc y
calc (Expr Mul x y) = calc x * calc y
calc (Expr Div x y) = calc x / calc y

evaluate :: String -> Double
evaluate str =
  case parse expression "" str of
    Left e  -> error $ show e
    Right r -> calc r

expr00 = "2 + 4 - 13"                        -- -7
expr01 = "2 + ( 4 - 13 )"                    -- -7
expr02 = "2.0 + 4.0 - 13.0"                  -- -7
expr1 = "2 / 2 + 3 * 4 - 13"                -- 0
expr2 = "4 + 3 * 4 / 3 - 6 / 3 * 3 + 8"     -- 10
expr3 = "9 + ( 3 - 1 ) * 3 + 10 / 2"        -- 20
expr999 = "(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) 33.25)) / 20) - (123.45(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)"
ast1 = Expr Sub (Expr Add (Number 2.0) (Number 4.0)) (Number 13.0)