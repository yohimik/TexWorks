const printer = require('./../../../../NodePrinter/module/index');
const decimal = require('decimal.js'); //https://github.com/MikeMcl/decimal.js/
decimal.set({ precision: 10, rounding: 4 });

const k = new decimal(3);
const x = new decimal(83.4);
const r = new decimal(0.5);
const rd = new decimal(0.02);
const m = [new decimal(2), new decimal(3), new decimal(4), new decimal(5), new decimal(6)];
const x1 = [new decimal(64), new decimal(70.5), new decimal(73.6), new decimal(75.7), new decimal(77)];
const x2 = [new decimal(64.7), new decimal(70.1), new decimal(73.4), new decimal(75.6), new decimal(77)];
const x3 = [new decimal(64.5), new decimal(70.7), new decimal(73.5), new decimal(75.7), new decimal(77.1)];
let d1 = new Array(x1.length)
let d2 = new Array(x1.length)
let d3 = new Array(x1.length)
let mdev = new Array(x1.length)
for (let index = 0; index < x1.length; index++) {
    d1[index] = x.minus(x1[index]);
    d2[index] = x.minus(x2[index]);
    d3[index] = x.minus(x3[index]);
    mdev[index] = new decimal(1).dividedBy(m[index]);
}
var l = approx();

var data = '$X_\\infty = ' + outNumber(x) + '[см];r = ' + outNumber(r) + '\\pm' + outNumber(rd) + '[см]$';
var line = 'd = ' + outNumber(l.k) + '\\cdot 1/m + ' + outNumber(l.b);
let table1 = genTable1();
let graph2D = genGraph2Dots();
let graph2l = genGraph2L();
let lam = '\\frac{(' + outNumber(r) + ')^2}{' + outNumber(l.k) + '} \\cdot 10^5 = ' + outNumber(r.times(r.times(new decimal(100000))).dividedBy(l.k)) + '[нм]';
printer.addToPrint('table1', table1, 'string');
printer.addToPrint('graph1Dots', graph2D, 'string');
printer.addToPrint('graph1L', graph2l, 'string');
printer.addToPrint('data', data, 'string');
printer.addToPrint('line', line, 'string');
printer.addToPrint('lam', lam, 'string');

printer.print('./2 курс/1 семестр/Физика/Лабораторная работа 2/preLab.tex', './2 курс/1 семестр/Физика/Лабораторная работа 2/lab.tex');

function genTable1() {
    let table1 = '';
    for (let index = 0; index < m.length; index++) {
        table1 += outNumber(m[index]) + ' & ' + outNumber(mdev[index]) + ' & ' + outNumber(x1[index]) + ' & ' + outNumber(d1[index]) + ' & ' + outNumber(x2[index]) + ' & ' + outNumber(d2[index]) + ' & ' + outNumber(x3[index]) + ' & ' + outNumber(d3[index]);
        table1 += '\\\\ \r\n \\hline \r\n'
    }

    return table1;
}

function genGraph2Dots() {
    let graph1 = '';
    for (let index = 0; index < m.length; index++) {
        graph1 += '(' + outNumberNoRep(mdev[index]) + ',' + outNumberNoRep((d1[index].plus(d2[index]).plus(d3[index])).dividedBy(k)) + ') ';
    }
    return graph1;
}

function genGraph2L() {
    let graph1 = '\\addplot[black, domain=0:0.5] {' + outNumberNoRep(l.k) + '*x + ' + outNumberNoRep(l.b) + '};';
    return graph1;
}
function outNumber(number) {
    return (number.toNumber().toFixed(3)).toString().replace('.', ',');
}

function outNumberNoRep(number) {
    return (number.toNumber().toFixed(3)).toString();
}

function approx() {
    let l = new Object();
    let sumX = new decimal(0);
    let sumXX = new decimal(0);
    let sumY = new decimal(0);
    let sumXY = new decimal(0);
    let n = new decimal(mdev.length);
    for (let index = 0; index < mdev.length; index++) {
        sumX = sumX.plus(mdev[index]);
        sumXX = sumXX.plus(mdev[index].times(mdev[index]));
        sumY = sumY.plus((d1[index].plus(d2[index]).plus(d3[index])).dividedBy(k));
        sumXY = sumXY.plus(((d1[index].plus(d2[index]).plus(d3[index])).dividedBy(k)).times(mdev[index]));
    }
    l.k = ((n.times(sumXY)).minus(sumX.times(sumY))).dividedBy((n.times(sumXX)).minus(sumX.times(sumX)));
    l.b = (sumY.minus(l.k.times(sumX))).dividedBy(n);
    return l;
}