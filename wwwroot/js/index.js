"use strict";
var _a, _b, _c, _d, _e;
let gameActive = false;
let score = 0;
const evalArray = [
    "-1 + Math.floor(Math.round(4.5 / 5.6 * 20.7 / 2.8 * 6.9 / 7.1 * 8.2 / 9.3 * 1.4 * 2.5))",
    "-1 + Math.floor(Math.round(5.4 / 4.5 * 20.6 / 6.7 * 7.8 / 8.9 * 9.1 / 1.2 * 2.3 * 1.5))",
    "-1 + Math.floor(Math.round(6.1 * 3.2 / 18.3 * 5.4 / 8.5 * 7.6 / 6.7 * 5.8 / 4.9 * 1.2))",
    "-1 + Math.floor(Math.round(5.7 / 4.8 * 20.9 / 6.1 * 7.2 / 8.3 * 9.4 / 1.5 * 2.6 * 1.5))",
    "-1 + Math.floor(Math.round(9.7 * 4.8 / 13.9 * 1.1 / 2.2 * 3.3 / 4.4 * 5.5 / 6.6))",
    "-1 + Math.floor(Math.round(7.2 * 3.3 / 21.4 * 8.5 / 6.6 * 5.7 / 4.8 * 3.9 / 2.1))",
    "-1 + Math.floor(Math.round(3.5 / 7.6 * 21.7 / 6.8 * 5.9 / 4.1 * 2.2 / 3.3 * 1.4 * 1.8))",
    "-1 + Math.floor(Math.round(5.1 / 6.2 * 30.3 / 1.4 * 9.5 / 8.6 * 7.7 / 6.8 * 5.9 * 1.7))",
    "-1 + Math.floor(Math.round(3.1 * 8.2 / 11.3 * 1.4 / 7.5 * 6.6 / 5.7 * 4.8 / 3.9 * 1.4))",
    "-1 + Math.floor(Math.round(3.5 / 7.6 * 21.7 / 6.8 * 5.9 / 4.1 * 2.2 / 3.3 * 1.4))",
    "-1 + Math.floor(Math.round(5.1 / 6.2 * 30.3 / 1.4 * 9.5 / 8.6 * 7.7 / 6.8 * 5.9))",
    "-1 + Math.floor(Math.round(7.2 * 3.3 / 21.4 * 8.5 / 6.6 * 5.7 / 4.8 * 3.9 / 2.1 * 1.4))",
    "-1 + Math.floor(Math.round(8.3 / 4.4 * 2.5 / 6.6 * 1.7 / 2.8 * 3.9 / 4.1 * 5.2 * 1.9))",
    "-1 + Math.floor(Math.round(8.9 / 4.1 * 2.2 / 7.3 * 2.4 / 3.5 * 4.6 / 5.7 * 6.8))",
    "-1 + Math.floor(Math.round(4.9 / 5.1 * 20.2 / 2.3 * 6.4 / 7.5 * 8.6 / 9.7 * 1.8 * 1.3))",
    "-1 + Math.floor(Math.round(8.5 * 4.6 / 2.7 * 5.8 / 1.9 * 2.1 / 3.2 * 4.3 / 5.4))",
    "-1 + Math.floor(Math.round(10.6 * 5.7 / 2.8 * 8.9 / 2.1 * 3.2 / 4.3 * 5.4 / 6.5 * 1.6))",
    "-1 + Math.floor(Math.round(7.8 * 6.9 / 13.1 * 1.2 / 2.3 * 3.4 / 4.5 * 5.6 / 6.7))",
    "-1 + Math.floor(Math.round(2.5 * 3.6 / 6.7 * 4.8 / 5.9 * 6.1 / 7.2 * 8.3 / 9.4 * 1.4))",
    "-1 + Math.floor(Math.round(10.2 / 5.3 * 2.4 / 6.5 * 1.6 / 3.7 * 4.8 / 5.9 * 6.1 * 1.5))",
    "-1 + Math.floor(Math.round(8.1 / 4.2 * 2.3 / 3.4 * 1.5 / 6.6 * 7.7 / 8.8 * 9.9 * 1.3))",
    "-1 + Math.floor(Math.round(9.7 / 2.8 * 11.9 / 1.1 * 4.2 / 3.3 * 2.4 / 5.5 * 6.6 * 1.9))",
    "-1 + Math.floor(Math.round(6.6 / 2.7 * 12.8 / 4.9 * 7.1 / 8.2 * 9.3 / 1.4 * 2.5 * 1.9))",
    "-1 + Math.floor(Math.round(8.6 / 4.7 * 2.8 / 7.9 * 2.1 / 3.2 * 4.3 / 5.4 * 6.5))",
    "-1 + Math.floor(Math.round(4.6 * 2.7 / 2.8 * 3.9 / 1.1 * 2.2 / 5.3 * 6.4 / 7.5 * 1.4))",
    "-1 + Math.floor(Math.round(4.6 * 2.7 / 2.8 * 3.9 / 1.1 * 2.2 / 5.3 * 6.4 / 7.5))",
    "-1 + Math.floor(Math.round(9.7 / 2.8 * 11.9 / 1.1 * 4.2 / 3.3 * 2.4 / 5.5 * 6.6))",
    "-1 + Math.floor(Math.round(8.5 / 4.6 * 2.7 / 3.8 * 1.9 / 6.1 * 7.2 / 8.3 * 9.4))",
    "-1 + Math.floor(Math.round(10.1 / 5.2 * 2.3 / 8.4 * 1.5 / 3.6 * 4.7 / 6.8 * 7.9 * 2.1))",
    "-1 + Math.floor(Math.round(2.2 * 3.3 / 6.4 * 4.5 / 5.6 * 6.7 / 7.8 * 8.9 / 9.1 * 1.4))",
    "-1 + Math.floor(Math.round(1.5 * 2.4 / 3.6 * 4.8 / 5.2 * 6.3 / 7.4 * 8.5 / 9.6))",
    "-1 + Math.floor(Math.round(6.4 * 3.5 / 18.6 * 5.7 / 8.8 * 7.9 / 6.1 * 5.2 / 4.3))",
    "-1 + Math.floor(Math.round(8.5 * 4.6 / 2.7 * 5.8 / 1.9 * 2.1 / 3.2 * 4.3 / 5.4 * 1.8))",
    "-1 + Math.floor(Math.round(9.2 / 2.3 * 11.4 / 4.5 * 3.6 / 2.7 * 5.8 / 6.9 * 7.1 * 1.9))",
    "-1 + Math.floor(Math.round(5.4 * 6.5 / 11.6 * 1.7 / 3.8 * 4.9 / 5.1 * 6.2 / 7.3))",
    "-1 + Math.floor(Math.round(7.2 * 2.3 / 9.4 * 4.5 / 3.6 * 2.7 / 1.8 * 6.9 / 7.1))",
    "-1 + Math.floor(Math.round(1.5 * 2.4 / 3.6 * 4.8 / 5.2 * 6.3 / 7.4 * 8.5 / 9.6 * 1.7))",
    "-1 + Math.floor(Math.round(3.6 * 8.7 / 11.8 * 1.9 / 7.1 * 6.2 / 5.3 * 4.4 / 3.5))",
    "-1 + Math.floor(Math.round(4.3 * 2.4 / 2.5 * 3.6 / 1.7 * 2.8 / 5.9 * 6.1 / 7.2 * 1.4))",
    "-1 + Math.floor(Math.round(6.1 * 5.2 / 30.3 * 3.4 / 9.5 * 8.6 / 7.7 * 6.8 / 5.9))",
    "-1 + Math.floor(Math.round(7.8 * 6.9 / 13.1 * 1.2 / 2.3 * 3.4 / 4.5 * 5.6 / 6.7 * 1.6))",
    "-1 + Math.floor(Math.round(8.9 / 4.1 * 2.2 / 7.3 * 2.4 / 3.5 * 4.6 / 5.7 * 6.8 * 1.7))",
    "-1 + Math.floor(Math.round(9.5 / 5.6 * 14.7 / 1.8 * 2.9 / 3.1 * 4.2 / 5.3 * 6.4 * 1.3))",
    "-1 + Math.floor(Math.round(6.7 * 5.8 / 30.9 * 3.1 / 9.2 * 8.3 / 7.4 * 6.5 / 5.6 * 1.8))",
    "-1 + Math.floor(Math.round(9.8 / 2.9 * 11.1 / 4.2 * 3.3 / 2.4 * 5.5 / 6.6 * 7.7))",
    "-1 + Math.floor(Math.round(5.4 / 4.5 * 20.6 / 6.7 * 7.8 / 8.9 * 9.1 / 1.2 * 2.3))",
    "-1 + Math.floor(Math.round(9.2 / 5.3 * 14.4 / 1.5 * 2.6 / 3.7 * 4.8 / 5.9 * 6.1 * 1.3))",
    "-1 + Math.floor(Math.round(6.1 * 3.2 / 18.3 * 5.4 / 8.5 * 7.6 / 6.7 * 5.8 / 4.9))",
    "-1 + Math.floor(Math.round(8.3 / 4.4 * 2.5 / 6.6 * 1.7 / 2.8 * 3.9 / 4.1 * 5.2))",
    "-1 + Math.floor(Math.round(5.3 * 4.4 / 20.5 * 3.6 / 8.7 * 7.8 / 6.9 * 5.1 / 4.2 * 1.6))",
    "-1 + Math.floor(Math.round(9.3 / 2.4 * 11.5 / 1.6 * 4.7 / 3.8 * 2.9 / 5.1 * 6.2))",
    "-1 + Math.floor(Math.round(2.2 * 3.3 / 6.4 * 4.5 / 5.6 * 6.7 / 7.8 * 8.9 / 9.1))",
    "-1 + Math.floor(Math.round(7.4 / 9.5 * 16.6 / 1.7 * 3.8 / 2.9 * 1.1 / 7.2 * 8.3))",
    "-1 + Math.floor(Math.round(5.4 * 6.5 / 11.6 * 1.7 / 3.8 * 4.9 / 5.1 * 6.2 / 7.3 * 1.6))",
    "-1 + Math.floor(Math.round(5.8 * 4.9 / 20.1 * 3.2 / 8.3 * 7.4 / 6.5 * 5.6 / 4.7 * 1.7))",
    "-1 + Math.floor(Math.round(9.2 / 2.3 * 11.4 / 4.5 * 3.6 / 2.7 * 5.8 / 6.9 * 7.1))",
    "-1 + Math.floor(Math.round(10.9 * 5.1 / 2.2 * 8.3 / 2.4 * 3.5 / 4.6 * 5.7 / 6.8))",
    "-1 + Math.floor(Math.round(9.5 / 5.6 * 14.7 / 1.8 * 2.9 / 3.1 * 4.2 / 5.3 * 6.4))",
    "-1 + Math.floor(Math.round(6.1 * 5.2 / 30.3 * 3.4 / 9.5 * 8.6 / 7.7 * 6.8 / 5.9 * 1.8))",
    "-1 + Math.floor(Math.round(5.8 * 4.9 / 20.1 * 3.2 / 8.3 * 7.4 / 6.5 * 5.6 / 4.7))",
    "-1 + Math.floor(Math.round(8.2 * 4.3 / 2.4 * 5.5 / 1.6 * 2.7 / 3.8 * 4.9 / 5.1))",
    "-1 + Math.floor(Math.round(8.9 / 4.1 * 2.2 / 6.3 * 1.4 / 2.5 * 3.6 / 4.7 * 5.8 * 1.9))",
    "-1 + Math.floor(Math.round(10.1 / 5.2 * 2.3 / 7.4 * 1.5 / 2.6 * 3.7 / 4.8 * 5.9 * 1.3))",
    "-1 + Math.floor(Math.round(8.6 / 4.7 * 2.8 / 7.9 * 2.1 / 3.2 * 4.3 / 5.4 * 6.5 * 1.7))",
    "-1 + Math.floor(Math.round(3.3 * 9.4 / 27.5 * 5.6 / 8.7 * 7.8 / 6.9 * 5.1 / 4.2))",
    "-1 + Math.floor(Math.round(9.4 * 4.5 / 13.6 * 1.7 / 2.8 * 3.9 / 4.1 * 5.2 / 6.3))",
    "-1 + Math.floor(Math.round(6.3 / 2.4 * 12.5 / 4.6 * 7.7 / 8.8 * 9.9 / 1.1 * 2.2))",
    "-1 + Math.floor(Math.round(6.3 / 2.4 * 12.5 / 4.6 * 7.7 / 8.8 * 9.9 / 1.1 * 2.2 * 1.4))",
    "-1 + Math.floor(Math.round(10.4 / 5.5 * 2.6 / 7.7 * 1.8 / 2.9 * 3.1 / 4.2 * 5.3 * 1.3))",
    "-1 + Math.floor(Math.round(9.4 * 4.5 / 13.6 * 1.7 / 2.8 * 3.9 / 4.1 * 5.2 / 6.3 * 1.3))",
    "-1 + Math.floor(Math.round(5.7 / 6.8 * 30.9 / 1.1 * 9.2 / 8.3 * 7.4 / 6.5 * 5.6 * 1.5))",
    "-1 + Math.floor(Math.round(7.6 * 3.7 / 21.8 * 8.9 / 6.1 * 5.2 / 4.3 * 3.4 / 2.5))",
    "-1 + Math.floor(Math.round(6.6 / 2.7 * 12.8 / 4.9 * 7.1 / 8.2 * 9.3 / 1.4 * 2.5))",
    "-1 + Math.floor(Math.round(3.3 * 9.4 / 27.5 * 5.6 / 8.7 * 7.8 / 6.9 * 5.1 / 4.2 * 1.2))",
    "-1 + Math.floor(Math.round(10.1 / 5.2 * 2.3 / 7.4 * 1.5 / 2.6 * 3.7 / 4.8 * 5.9))",
    "-1 + Math.floor(Math.round(8.9 / 4.1 * 2.2 / 6.3 * 1.4 / 2.5 * 3.6 / 4.7 * 5.8))",
    "-1 + Math.floor(Math.round(8.5 / 4.6 * 2.7 / 3.8 * 1.9 / 6.1 * 7.2 / 8.3 * 9.4 * 1.7))",
    "-1 + Math.floor(Math.round(7.9 / 9.1 * 16.2 / 1.3 * 3.4 / 2.5 * 1.6 / 7.7 * 8.8))",
    "-1 + Math.floor(Math.round(3.8 / 7.9 * 21.1 / 6.2 * 5.3 / 4.4 * 2.5 / 3.6 * 1.7 * 1.5))",
    "-1 + Math.floor(Math.round(3.8 / 7.9 * 21.1 / 6.2 * 5.3 / 4.4 * 2.5 / 3.6 * 1.7))",
    "-1 + Math.floor(Math.round(7.4 / 9.5 * 16.6 / 1.7 * 3.8 / 2.9 * 1.1 / 7.2 * 8.3 * 1.7))",
    "-1 + Math.floor(Math.round(4.5 / 5.6 * 20.7 / 2.8 * 6.9 / 7.1 * 8.2 / 9.3 * 1.4))",
    "-1 + Math.floor(Math.round(7.8 * 2.9 / 9.1 * 4.2 / 3.3 * 2.4 / 1.5 * 6.6 / 7.7))",
    "-1 + Math.floor(Math.round(3.1 * 8.2 / 11.3 * 1.4 / 7.5 * 6.6 / 5.7 * 4.8 / 3.9))",
    "-1 + Math.floor(Math.round(10.3 / 5.4 * 2.5 / 8.6 * 1.7 / 3.8 * 4.9 / 6.1 * 7.2 * 1.5))",
    "-1 + Math.floor(Math.round(3.6 * 8.7 / 11.8 * 1.9 / 7.1 * 6.2 / 5.3 * 4.4 / 3.5 * 1.8))",
    "-1 + Math.floor(Math.round(6.8 * 3.9 / 2.1 * 7.2 / 1.3 * 2.4 / 3.5 * 4.6 / 5.7))",
    "-1 + Math.floor(Math.round(10.7 / 5.8 * 2.9 / 6.1 * 1.2 / 3.3 * 4.4 / 5.5 * 6.6))",
    "-1 + Math.floor(Math.round(3.9 * 9.1 / 27.2 * 5.3 / 8.4 * 7.5 / 6.6 * 5.7 / 4.8))",
    "-1 + Math.floor(Math.round(10.1 / 5.2 * 2.3 / 8.4 * 1.5 / 3.6 * 4.7 / 6.8 * 7.9))",
    "-1 + Math.floor(Math.round(7.9 / 9.1 * 16.2 / 1.3 * 3.4 / 2.5 * 1.6 / 7.7 * 8.8 * 1.2))",
    "-1 + Math.floor(Math.round(5.3 * 4.4 / 20.5 * 3.6 / 8.7 * 7.8 / 6.9 * 5.1 / 4.2))",
    "-1 + Math.floor(Math.round(9.2 / 5.3 * 14.4 / 1.5 * 2.6 / 3.7 * 4.8 / 5.9 * 6.1))",
    "-1 + Math.floor(Math.round(9.8 / 2.9 * 11.1 / 4.2 * 3.3 / 2.4 * 5.5 / 6.6 * 7.7 * 1.9))",
    "-1 + Math.floor(Math.round(9.7 * 4.8 / 13.9 * 1.1 / 2.2 * 3.3 / 4.4 * 5.5 / 6.6 * 1.4))",
    "-1 + Math.floor(Math.round(5.5 * 6.6 / 11.7 * 1.8 / 3.9 * 4.1 / 5.2 * 6.3 / 7.4))",
    "-1 + Math.floor(Math.round(7.5 * 6.6 / 13.7 * 1.8 / 2.9 * 3.1 / 4.2 * 5.3 / 6.4 * 1.6))",
    "-1 + Math.floor(Math.round(10.2 / 5.3 * 2.4 / 6.5 * 1.6 / 3.7 * 4.8 / 5.9 * 6.1))",
    "-1 + Math.floor(Math.round(6.4 * 3.5 / 2.6 * 7.7 / 1.8 * 2.9 / 3.1 * 4.2 / 5.3 * 1.6))",
    "-1 + Math.floor(Math.round(4.9 / 5.1 * 20.2 / 2.3 * 6.4 / 7.5 * 8.6 / 9.7 * 1.8))",
    "-1 + Math.floor(Math.round(10.6 * 5.7 / 2.8 * 8.9 / 2.1 * 3.2 / 4.3 * 5.4 / 6.5))",
    "-1 + Math.floor(Math.round(8.2 * 4.3 / 2.4 * 5.5 / 1.6 * 2.7 / 3.8 * 4.9 / 5.1 * 1.9))",
    "-1 + Math.floor(Math.round(8.1 / 4.2 * 2.3 / 3.4 * 1.5 / 6.6 * 7.7 / 8.8 * 9.9))",
    "-1 + Math.floor(Math.round(10.3 / 5.4 * 2.5 / 8.6 * 1.7 / 3.8 * 4.9 / 6.1 * 7.2))",
    "-1 + Math.floor(Math.round(9.3 / 2.4 * 11.5 / 1.6 * 4.7 / 3.8 * 2.9 / 5.1 * 6.2 * 1.9))",
    "-1 + Math.floor(Math.round(5.7 / 4.8 * 20.9 / 6.1 * 7.2 / 8.3 * 9.4 / 1.5 * 2.6))",
    "-1 + Math.floor(Math.round(10.4 / 5.5 * 2.6 / 7.7 * 1.8 / 2.9 * 3.1 / 4.2 * 5.3))",
    "-1 + Math.floor(Math.round(3.9 * 9.1 / 27.2 * 5.3 / 8.4 * 7.5 / 6.6 * 5.7 / 4.8 * 1.2))",
    "-1 + Math.floor(Math.round(4.3 * 2.4 / 2.5 * 3.6 / 1.7 * 2.8 / 5.9 * 6.1 / 7.2))",
    "-1 + Math.floor(Math.round(6.7 * 5.8 / 30.9 * 3.1 / 9.2 * 8.3 / 7.4 * 6.5 / 5.6))",
    "-1 + Math.floor(Math.round(2.5 * 3.6 / 6.7 * 4.8 / 5.9 * 6.1 / 7.2 * 8.3 / 9.4))",
    "-1 + Math.floor(Math.round(10.7 / 5.8 * 2.9 / 6.1 * 1.2 / 3.3 * 4.4 / 5.5 * 6.6 * 1.5))",
    "-1 + Math.floor(Math.round(7.8 * 2.9 / 9.1 * 4.2 / 3.3 * 2.4 / 1.5 * 6.6 / 7.7 * 1.7))",
    "-1 + Math.floor(Math.round(6.4 * 3.5 / 18.6 * 5.7 / 8.8 * 7.9 / 6.1 * 5.2 / 4.3 * 1.2))",
    "-1 + Math.floor(Math.round(5.7 / 6.8 * 30.9 / 1.1 * 9.2 / 8.3 * 7.4 / 6.5 * 5.6))",
    "-1 + Math.floor(Math.round(6.4 * 3.5 / 2.6 * 7.7 / 1.8 * 2.9 / 3.1 * 4.2 / 5.3))",
    "-1 + Math.floor(Math.round(7.5 * 6.6 / 13.7 * 1.8 / 2.9 * 3.1 / 4.2 * 5.3 / 6.4))",
    "-1 + Math.floor(Math.round(5.5 * 6.6 / 11.7 * 1.8 / 3.9 * 4.1 / 5.2 * 6.3 / 7.4 * 2.2))",
    "-1 + Math.floor(Math.round(6.8 * 3.9 / 2.1 * 7.2 / 1.3 * 2.4 / 3.5 * 4.6 / 5.7 * 1.2))",
    "-1 + Math.floor(Math.round(7.6 * 3.7 / 21.8 * 8.9 / 6.1 * 5.2 / 4.3 * 3.4 / 2.5 * 1.8))",
    "-1 + Math.floor(Math.round(7.2 * 2.3 / 9.4 * 4.5 / 3.6 * 2.7 / 1.8 * 6.9 / 7.1 * 1.8))",
    "-1 + Math.floor(Math.round(10.9 * 5.1 / 2.2 * 8.3 / 2.4 * 3.5 / 4.6 * 5.7 / 6.8 * 1.6))",
];
function generateRandomValues(numZeros) {
    const buttons = document.querySelectorAll('.button-grid button');
    let zerosCount = 0;
    let onesCount = 0;
    // Reset all buttons
    buttons.forEach(button => {
        button.style.backgroundColor = '#333'; // Reset background color
        button.disabled = false; // Enable buttons
    });
    // Shuffle buttons array
    const shuffledButtons = Array.from(buttons).sort(() => Math.random() - 0.5);
    // Assign zeros and ones with eval expressions
    shuffledButtons.forEach((button, index) => {
        if (zerosCount < numZeros) {
            let found = false;
            let randomIndex = 0;
            while (!found) {
                randomIndex = Math.floor(Math.random() * evalArray.length);
                if (eval(evalArray[randomIndex]) === 0) {
                    found = true;
                }
                ;
            }
            ;
            button.dataset.value = '' + randomIndex;
            zerosCount++;
        }
        else {
            let found = false;
            let randomIndex = 0;
            while (!found) {
                randomIndex = Math.floor(Math.random() * evalArray.length);
                if (eval(evalArray[randomIndex]) != 0) {
                    found = true;
                }
                ;
            }
            ;
            button.dataset.value = '' + randomIndex;
            onesCount++;
        }
    });
    gameActive = true;
    score = 0; // Reset score
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}
function updateGrid() {
    const gridSizeElement = document.getElementById('gridSizeSlider');
    const gridSize = parseInt(gridSizeElement.value);
    const numberOfButtons = gridSize * gridSize;
    const buttonGrid = document.getElementById('buttonGrid');
    if (buttonGrid) {
        buttonGrid.innerHTML = ''; // Clear existing buttons
        for (let i = 1; i <= numberOfButtons; i++) {
            const button = document.createElement('button');
            button.className = 'game-button';
            button.id = `button${i}`;
            buttonGrid.appendChild(button);
        }
        // Update CSS grid layout
        buttonGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        // Add event listeners to new buttons
        const buttons = document.querySelectorAll('.button-grid button');
        buttons.forEach((button, index) => {
            // Clone the button to remove existing event listeners
            const newButton = button.cloneNode(true);
            button.replaceWith(newButton);
            newButton.addEventListener('click', function () {
                if (gameActive && !newButton.disabled) {
                    newButton.disabled = true; // Disable the button after click
                    const value = eval(evalArray[parseInt('' + newButton.dataset.value)]);
                    if (value === 0) {
                        newButton.style.backgroundColor = 'red';
                        gameActive = false;
                        const buttons2 = document.querySelectorAll('.button-grid button');
                        buttons2.forEach(btn => btn.disabled = true);
                        const playButton = document.getElementById('playButton');
                        const stopButton = document.getElementById('stopButton');
                        if (playButton)
                            playButton.style.display = 'inline-block';
                        if (stopButton)
                            stopButton.style.display = 'none';
                        const scoreElement = document.getElementById('score');
                        if (scoreElement)
                            scoreElement.textContent = `Game Over, Score: ${score}`;
                    }
                    else {
                        newButton.style.backgroundColor = 'green';
                        score++;
                        const scoreElement = document.getElementById('score');
                        if (scoreElement)
                            scoreElement.textContent = `Score: ${score}`;
                    }
                }
            });
        });
    }
}
(_a = document.getElementById('gridSizeSlider')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function () {
    var _a;
    (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
    updateGrid();
});
(_b = document.getElementById('playButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    const numZerosElement = document.getElementById('numZeros');
    const numZeros = parseInt(numZerosElement.value, 10);
    const totalButtons = document.querySelectorAll('.button-grid button').length;
    if (numZeros > 0 && numZeros < totalButtons) {
        generateRandomValues(numZeros);
        this.innerText = 'Replay';
        this.style.display = 'none';
        const stopButton = document.getElementById('stopButton');
        if (stopButton)
            stopButton.style.display = 'inline-block';
    }
    else {
        alert(`Please enter a number between 1 and ${totalButtons - 1}`);
    }
});
(_c = document.getElementById('stopButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    gameActive = false;
    const buttons = document.querySelectorAll('.button-grid button');
    buttons.forEach(btn => btn.disabled = true);
    const playButton = document.getElementById('playButton');
    if (playButton)
        playButton.style.display = 'inline-block';
    this.style.display = 'none';
});
(_d = document.getElementById('numZeros')) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', function () {
    var _a;
    (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
    updateGrid();
});
(_e = document.getElementById('logOff')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    localStorage.removeItem('userToken');
    window.location.href = 'auth/login.html';
});
// Initialize grid on page load
updateGrid();
