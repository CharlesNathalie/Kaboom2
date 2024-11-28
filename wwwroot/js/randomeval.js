export class RandomEval {
    constructor() {
        this.evalArray = [];
        this.init();
    }
    init() {
        this.evalArray = [
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
    }
}
// Initialize the Index class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new RandomEval();
});
