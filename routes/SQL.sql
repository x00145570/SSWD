


-- UPDATE dbo.Category SET CategoryName = 'Play Station 4' WHERE CategoryId = 1;
-- UPDATE dbo.Category SET CategoryName = 'XBOX ONE' WHERE CategoryId = 2;
-- UPDATE dbo.Category SET CategoryName = 'GAMES' WHERE CategoryId = 3;
-- UPDATE dbo.Category SET CategoryName = 'PC' WHERE CategoryId = 4;

-- UPDATE dbo.Category SET CategoryDescription = 'Powerful machines' WHERE CategoryId = 4;
-- UPDATE dbo.Category SET CategoryDescription = 'Variety of PS4, XBOX games' WHERE CategoryId = 3;
-- UPDATE dbo.Category SET CategoryDescription = 'The Xbox One is an eighth-generation home video game console developed by Microsoft' WHERE CategoryId = 2;

-- UPDATE dbo.Category SET CategoryDescription = 'PS4 is an eighth-generation home video game console developed by Sony Interactive Entertainment' WHERE CategoryId = 1;

-- DELETE from dbo.Category  WHERE CategoryId = 7;

UPDATE dbo.Product SET ProductName = 'I7 9700K 2080TI', ProductDescription = 'Core i7-9700K is a 64-bit octa-core high-end performance with new 2080TI featuring 4352 cores and a whopping 11GB of GDDR6 memory', ProductPrice = '2600.00' , ProductStock ='5' WHERE ProductId = 1;
UPDATE dbo.Product SET ProductName = 'I7 8700K 1080TI', ProductDescription = 'Core i7-8700K is a 64-bit octa-core high-end performance with new 1080TI featuring 4352 cores and a whopping 11GB of GDDR6 memory', ProductPrice = '2000.00' , ProductStock ='5' WHERE ProductId = 2;
UPDATE dbo.Product SET ProductName = 'Xbox One S 1TB Console & Star Wars™ Jedi', ProductDescription = 'The best in 4K entertainment', ProductPrice = '300.00' , ProductStock ='10' WHERE ProductId = 3;
UPDATE dbo.Product SET ProductName = 'Xbox One S 1TB', ProductDescription = 'The best in 4K entertainment', ProductPrice = '250.00' , ProductStock ='10' WHERE ProductId = 4;
UPDATE dbo.Product SET ProductName = 'GTA 5', ProductDescription = 'Grand Theft Auto V story experience, free access to the ever-evolving Grand Theft Auto Online and all existing gameplay', ProductPrice = '30.00' , ProductStock ='25' WHERE ProductId = 6;
UPDATE dbo.Product SET ProductName = 'PlayStation®4 Pro 1TB Console & Call of Duty®: Modern Warfare®  ', ProductDescription = 'Prepare to go dark, Modern Warfare® is back!', ProductPrice = '339.99' , ProductStock ='6' WHERE ProductId = 9;
UPDATE dbo.Product SET ProductName = 'PlayStation®4 1TB Console & Fifa 20', ProductDescription = 'Take the beautiful game back to the streets in VOLTA Football – brand-new to FIFA 20.', ProductPrice = '299.99' , ProductStock ='5' WHERE ProductId = 10;
UPDATE dbo.Product SET ProductName = 'Xbox One X Robot White Special Edition Fallout 76 Bundle  ', ProductDescription = 'Games play better on Xbox One X. With 40% more power than any other console, experience immersive true 4K gaming.', ProductPrice = '339.99' , ProductStock ='6' WHERE ProductId = 12;



SELECT * FROM Product

update [dbo].[AppUser] set FirstName = 'Test', LastName = 'Test', Email = 'test@web.com' where UserId = 1

select * from Category

delete dbo.Category where CategoryId = 5