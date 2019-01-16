const printer = require('./../../../../NodePrinter/module/index');
const angles = [2900, 2825, 2660, 2620, 2590, 2460, 2450, 2270, 1850, 1190, 1175, 1140, 700, 635];
const lambdas = [690.7, 671.6, 623.4, 612.3, 607.2, 579.0, 576.9, 546.0, 491.6, 435.8, 434.7, 433.9, 407.7, 404.6];
const angles2 = [2790, 1800, 1160];
var lambdas2 = getLambdas2();
var v = getV();
const n = [3, 4, 5];
var n2 = [1 / 9, 1 / 16, 1 / 25];
var l = approx();

const rt = 109677.593;

let table1 = genTable1();
let graph1 = genGraph1();
let table2 = genTable2();
let graph2D = genGraph2Dots();
let graph2l = genGraph2L();
let r1 = -l.k;
let r24 = l.b;
let r2 = l.b * 4;
let e = 10973731 * 6.548 * Math.pow(10, -15) * 299792458 / 1.6;
printer.addToPrint('table1', table1, 'string');
printer.addToPrint('graph1', graph1, 'string');
printer.addToPrint('graph2Dots', graph2D, 'string');
printer.addToPrint('graph2L', graph2l, 'string');
printer.addToPrint('table2', table2, 'string');
printer.addToPrint('ap', '\\widetilde{v} = ' + outNumber(l.k) + ' \\cdot (1/n^2) +' + outNumber(l.b), 'string');
printer.addToPrint('rf1', '$ R =  ' + outNumber(r1) + ' [cm^{-1}]$', 'string');
printer.addToPrint('r/4', outNumber(r24) + ' [см^{-1}]', 'string');
printer.addToPrint('r2', outNumber(r2) + ' [см^{-1}]', 'string');
printer.addToPrint('rt', outNumber(rt) + ' [см^{-1}]', 'string');
printer.addToPrint('r12', '$ R = ' + outNumber(r1) + '; \\,R = ' + outNumber(r2) + ' $', 'string');
printer.addToPrint('ef', ' 1,054 \\cdot 10^{-15} \\cdot 299792458 \\cdot ' + outNumber(r2) + ' / 1,6 = ' + outNumber(e) + '[эВ]', 'string');
printer.addToPrint('e', '$ E_И = ' + outNumber(e) + '[эВ] $', 'string');
printer.addToPrint('et', ' 13,600[эВ] ', 'string');

printer.print('./2 курс/1 семестр/Физика/Лабораторная работа 3/preLab.tex', './2 курс/1 семестр/Физика/Лабораторная работа 3/lab.tex');

function genTable1() {
    let table1 = '';
    for (let index = 0; index < angles.length; index++) {
        table1 += outNumber(lambdas[index]) + ' & ' + outNumber(angles[index]);
        table1 += '\\\\ \r\n \\hline \r\n'
    }

    return table1;
}

function genGraph1() {
    let graph1 = '';
    for (let index = 0; index < angles.length; index++) {
        graph1 += '(' + lambdas[index] + ',' + angles[index] + ') ';
    }
    return graph1;
}

function genGraph1() {
    let graph1 = '';
    for (let index = 0; index < angles.length; index++) {
        graph1 += '(' + lambdas[index] + ',' + angles[index] + ') ';
    }
    return graph1;
}

function genGraph2Dots() {
    let graph1 = '';
    for (let index = 0; index < n2.length; index++) {
        graph1 += '(' + n2[index] + ',' + v[index] + ') ';
    }
    return graph1;
}

function genGraph2L() {
    let graph1 = '(0,' + l.b + ') (' + -l.b / l.k + ', 0)';
    return graph1;
}

function genTable2() {
    let table1 = '';
    for (let index = 0; index < lambdas2.length; index++) {
        table1 += outNumber(angles2[index]) + ' & ' + outNumber(lambdas2[index]) + ' & ' + outNumber(v[index]) + ' & ' + outNumber(n[index]) + ' & ' + outNumber(n2[index]);
        table1 += '\\\\ \r\n \\hline \r\n'
    }

    return table1;
}

function outNumber(number) {
    return (number.toFixed(3)).toString().replace('.', ',');
}

function getLambdas2() {
    let lambdas2 = new Array(3);
    for (let j = 0; j < angles2.length; j++) {
        let i;
        for (let k = 1; k < angles.length; k++) {
            if (angles2[j] >= angles[k]) {
                i = k;
                break;
            }
        }
        lambdas2[j] = (lambdas[i] - lambdas[i - 1]) / (angles[i] - angles[i - 1]) * angles2[j] + lambdas[i] - (lambdas[i] - lambdas[i - 1]) / (angles[i] - angles[i - 1]) * angles[i];
    }
    return lambdas2;
}

function getV() {
    let v = new Array(3);
    for (let index = 0; index < lambdas2.length; index++) {
        const element = lambdas2[index];
        v[index] = 10000000 / element;
    }
    return v;
}

function approx() {
    let l = new Object();
    let sumX = 0.0;
    let sumXX = 0.0;
    let sumY = 0.0;
    let sumXY = 0.0;
    let n = n2.length;
    for (let index = 0; index < angles2.length; index++) {
        sumX += n2[index];
        sumXX += n2[index] * n2[index];
        sumY += v[index];
        sumXY += v[index] * n2[index];
    }
    l.k = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    l.b = (sumY - l.k * sumX) / n;
    return l;
}