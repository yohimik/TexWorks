const printer = require('./../../../../NodePrinter/module/index');
const decimal = require('decimal.js'); //https://github.com/MikeMcl/decimal.js/
decimal.set({ precision: 10, rounding: 4 });
let pi = new decimal(Math.PI);
let i0 = new decimal(0.176);
let i = [0.039, 0.02, 0.007, 0.0008, 0.002, 0.012, 0.031, 0.054, 0.078, 0.101, 0.123, 0.135, 0.144, 0.142, 0.132, 0.115, 0.092, 0.067, 0.043, 0.022, 0.008, 0.0007, 0.002, 0.012, 0.03, 0.054, 0.082, 0.106, 0.129, 0.143, 0.149, 0.144, 0.134, 0.116, 0.093, 0.067];
let angles = new Array(i.length);
let maxI = new decimal(i[0]);
let minI = new decimal(i[0]);
let maxAngle;
for (let index = 0; index < i.length; index++) {
    i[index] = new decimal(i[index]);
    angles[index] = new decimal(index * 10);
    if (i[index].greaterThan(maxI)) {
        maxI = i[index];
        maxAngle = angles[index];
    }
    if (i[index].lessThan(minI)) { 
        minI = i[index];
    }
}
let iDev = new Array(i.length);
let cos = new Array(i.length);
for (let index = 0; index < i.length; index++) {
    iDev[index] = i[index].dividedBy(maxI);
    cos[index] = decimal.cos((angles[index].minus(maxAngle)).times(pi).dividedBy(new decimal(180))).toPower(2);
}
let kPar = maxI.dividedBy(i0);
let kPer = minI.dividedBy(i0);

let table1 = generateTable1();
let graph1 = generateGraph1();
let graph2 = generateGraph2();
let data = '$I_0 = ' + outNumber(i0) + '[мА];I_{max} =' + outNumber(maxI) + '[мА];I_{min} =' + outNumber(minI) + '[мА];\\varphi_m =' + outNumber(maxAngle) +  '^\\circ$';

let kParString = outNumber(maxI) + '/' + outNumber(i0)  +  ' = ' + outNumber(kPar);
let kPerString = outNumber(minI) + '/' + outNumber(i0)  +  ' = ' + outNumber(kPer);

printer.addToPrint('table1', table1, 'string');
printer.addToPrint('graph1', graph1, 'string');
printer.addToPrint('graph2', graph2, 'string');
printer.addToPrint('data', data, 'string');
printer.addToPrint('kper', kPerString, 'string');
printer.addToPrint('kpar', kParString, 'string');

printer.print('./2 курс/1 семестр/Физика/Лабораторная работа 4/preLab.tex', './2 курс/1 семестр/Физика/Лабораторная работа 4/lab.tex');

function generateTable1() {
    let table1 = '';
    for (let index = 0; index < angles.length; index++) {
        table1 += outNumber(angles[index]) + ' & ' + outNumber(i[index]) + ' & ' + outNumber(iDev[index]) + ' & ' + outNumber(cos[index]);
        table1 += '\\\\ \r\n \\hline \r\n'
    }

    return table1;
}

function generateGraph1() {
    let graph1 = '';
    for (let index = 0; index < angles.length; index++) {
        graph1 += '(' + outNumberNoRep(angles[index]) + ',' + outNumberNoRep(iDev[index]) + ') ';
    }
    graph1 += '(' + outNumberNoRep(angles[0]) + ',' + outNumberNoRep(iDev[0]) + ') ';
    return graph1;
}

function generateGraph2() {
    let graph1 = '';
    for (let index = 0; index < angles.length; index++) {
        graph1 += '(' + outNumberNoRep(angles[index]) + ',' + outNumberNoRep(cos[index]) + ') ';
    }
    graph1 += '(' + outNumberNoRep(angles[0]) + ',' + outNumberNoRep(cos[0]) + ') ';
    return graph1;
}

function outNumber(number) {
    return (number.toNumber().toFixed(4)).toString().replace('.', ',');
}

function outNumberNoRep(number) {
    return (number.toNumber().toFixed(4)).toString();
}