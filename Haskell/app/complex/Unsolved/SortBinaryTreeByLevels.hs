-- import Test.Hspec
-- import Test.QuickCheck

data TreeNode a = TreeNode {
  left  :: Maybe (TreeNode a),
  right :: Maybe (TreeNode a),
  value :: a
  } deriving Show

treeByLevels :: Maybe (TreeNode a) -> [a]
-- treeByLevels (Just (TreeNode left right value)) = []
treeByLevels tree = traverseTree [tree]
-- treeByLevels Nothing = []

traverseTrees :: [Maybe (TreeNode a)] -> [a]
-- traverseTree [] = []
traverseTrees [t@(TreeNode l r v)] = v:((traverseTree l) ++ (traverseTree r))
-- traverseTree [t:ts] = 
traverseTrees _ = []



buildTree :: [a] -> Maybe (TreeNode a)
buildTree l = fst $ walk $ split 1 l
  where split _ [] = []
        split n l = h : split (2*n) t
          where (h, t) = splitAt n l
        walk [] = (Nothing, [])
        walk ls@([] : _) = (Nothing, ls)
        walk ((h : t) : ls) = (Just $ TreeNode l r h, t : ls'')
          where (l, ls') = walk ls
                (r, ls'') = walk ls'

-- testBuildTree :: (Show a, Eq a) => [a] -> Expectation
-- testBuildTree x = treeByLevels (buildTree x) `shouldBe` x

testTree1 = [2, 8, 9]
testTree2 = [2, 8, 9, 1, 3, 4, 5]
-- testTreeNode = Just (TreeNode {left = Just (TreeNode {left = Just (TreeNode {left = Nothing, right = Nothing, value = 1}), right = Just (TreeNode {left = Nothing, right = Nothing, value = 3}), value = 8}), right = Just (TreeNode {left = Just (TreeNode {left = Nothing, right = Nothing, value = 4}), right = Just (TreeNode {left = Nothing, right = Nothing, value = 5}), value = 9}), value = 2})

-- test [] = []
-- test tree = 
result1 = treeByLevels $ buildTree testTree1
result2 = treeByLevels $ buildTree testTree2