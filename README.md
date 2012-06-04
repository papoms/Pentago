Pentago
=======

The Boardgame "Pentago" in Javascript   

From Wikipedia, the free encyclopedia:

>Pentago is a two-player abstract strategy game invented by Tomas Flodén. The Swedish company Mindtwister has the rights of developing and commercializing the product.
>The game is played on a 6×6 board divided into four 3×3 sub-boards (or quadrants). Taking turns, the two players place a marble of their color (either black or white) onto an unoccupied space on the board, and then rotate one of the sub-boards by 90 degrees either clockwise or anti-clockwise.
>A player wins by getting five of their marbles in a vertical, horizontal or diagonal row (either before or after the sub-board rotation in their move). If all 36 spaces on the board are occupied without a row of five being formed then the game is a draw."   


Notation
--------
The Game is played on a 6x6 Board. We will use a-f for column names, and 1-6 to name the rows. The Quadrants are called A, B, C & D.

		abc def

	1	000 000
	2	0A0 0B0 
	3	000 000
		
	4	000 000
	5	0C0 0D0
	6	000 000

So if you want to place a marble in the upper right corner, that would be f1.
To describe a "full" move we also need to know which player places a marble, and in which direction he rotates which quadrant.
         
A single turn is described within 5 characters:

	(P)layer or Color = [W,B]
	(c)olumn = [a-f]
	(r)row = [1-6]
	(Q)uadrant = [A-D]
	(d)irection of rotation [r,l]    

"Wa1Ar" translates to:
White places a marble on a1, and rotates quadrant A clockwise (right). 
A full game can be described as a series of these turns.



