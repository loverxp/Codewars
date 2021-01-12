module Main where

import Test.QuickCheck
import complex.CalculatorV2.tidy (evaluate)

main = hspec spec
spec = do
  describe "simple expressions" $ do
    it "should_work_for_some_simple_expressions" $ do
        Calculator.evaluate "2 / 2 + 3 * 4 - 13" `shouldBe` 0
        Calculator.evaluate "4 + 3 * 4 / 3 - 6 / 3 * 3 + 8"  `shouldBe` 10
        Calculator.evaluate "9 + ( 3 - 1 ) * 3 + 10 / 2" `shouldBe` 20