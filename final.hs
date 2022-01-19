module FunkcZH where

import Data.List

posNumSum :: (Num a, Ord a) => (a, a, a) -> Maybe a
posNumSum (x, y, z) 
    | x+y+z > 0 = Just (x+y+z)
    | otherwise = Nothing

fancyText :: String -> String
fancyText xs = "~=:::" ++ xs ++ (reverse "~=:::")

heads :: Eq a => [[a]] -> a -> [a]
heads [] _ = []
heads (x:xs) b
    | length (take 1 x) == 0 = b : heads xs b
    | otherwise = (head x) : heads xs b


alternating [] _ = []
alternating (x:xs) i
    | mod i 2 == 0 && x < 0 = negate x : alternating xs (i+1)
    | mod i 2 == 0 && x >= 0 = x : alternating xs (i+1)
    | mod i 2 == 1 && x < 0 = x : alternating xs (i+1)
    | otherwise = negate x : alternating xs (i+1)

alternatingSignList :: (Ord a, Num a) => [a] -> [a]
alternatingSignList xs = alternating xs 0


divisible [] _ = []
divisible (x:xs) i 
    | mod x i == 0 = x : divisible xs (i+1)
    | otherwise = divisible xs (i+1)

maxDivisibleByIndex :: Integral a => [a] -> a
maxDivisibleByIndex xs = maximum (divisible xs 1)

{-
checkRelationBy _ [] = Nothing
checkRelationBy _ [x] = Nothing
checkRelationBy f (x:y:xs) i
    | 
-}

isZoomerSentence :: String -> Bool
isZoomerSentence xs = isInfixOf "lol" xs || isInfixOf "uwu" xs || isInfixOf "xd" xs || isInfixOf "rawr" xs

insertWord :: String -> Int -> String -> String
insertWord ins a xs = unwords (fst(splitAt a (words (xs))) ++ [ins] ++ snd(splitAt a (words (xs))))


getSatisfying :: (a -> Bool) -> [[a]] -> [[a]]
getSatisfying f [] = []
getSatisfying f (x:xs)
    | length (filter f x) /= 0 = (filter f x) : getSatisfying f xs
    | otherwise = getSatisfying f xs


parity [] _ _ = []
parity (x:xs) i e
    | mod x 2 == 1 = (i,x) : parity xs (i+1) e
    | otherwise = (e,x) : parity xs i (e+1)

parityIndex :: Integral a => [a] -> [(Int, a)]
parityIndex xs = parity xs 1 1


data Result = Error String | Ok Int
    deriving (Show, Eq)

isError (Error _) = True
isError (Ok _) = False

getOk (Ok a) = a

filterOk [] = []
filterOk (x:xs)
    | isError x = filterOk xs
    | otherwise = x : filterOk xs

filterError [] = []
filterError (x:xs) 
    | isError x = filterError xs
    | otherwise = x : filterError xs

sumResult [] = Nothing
sumResult xs 
    | (sum (map getOk (filterError xs))) == 0 = Nothing
    | otherwise = Just (sum (map getOk (filterError xs)))

szamjegy a = ((div a 100), (div a 10)-(div a 100)*10, a-((div a 100)*100)-((div a 10)-(div a 100)*10)*10)

egy (a,b,c) = a*a+b*b+c*c

lista a 
    | 1 == egy (szamjegy a) || 89 == egy (szamjegy a) = egy (szamjegy a) : []
    | otherwise =  egy (szamjegy a) : lista (egy (szamjegy a))

isGets a = elem 1 (lista a)

getsToList xs = length (filter (True==) (map isGets xs))

getsTo1 :: Int -> Int
getsTo1 x = getsToList [1..x]




