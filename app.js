'use strict'

const co = require('co');
const fs = require('fs-promise');

co(function* () {

/*-------------------------------------start-series-part---------------------------------------------------*/
  var start = new Date();
  
  let s1 = yield fs.readFile('citylots.json'),
    s2 = yield fs.readFile('citylots.json'),
    s3 = yield fs.readFile('citylots.json'),
    s4 = yield fs.readFile('citylots.json'),
    s5 = yield fs.readFile('citylots.json'),
    s6 = yield fs.readFile('citylots.json'),
    s7 = yield fs.readFile('citylots.json');

  var end = new Date();
  console.log('series exec time: ', end - start)

/*---------------------------------------end-series-part---------------------------------------------------*/


/*-------------------------------------start-parallel-part-------------------------------------------------*/

  let p1 = fs.readFile('citylots.json'),
    p2 = fs.readFile('citylots.json'),
    p3 = fs.readFile('citylots.json'),
    p4 = fs.readFile('citylots.json'),
    p5 = fs.readFile('citylots.json'),
    p6 = fs.readFile('citylots.json'),
    p7 = fs.readFile('citylots.json');

  // you can run promises in parallel by yield them as array or object

  /*
  start = new Date();
  let paralizeByArr = yield [p1, p2, p3, p4, p5, p6]
  end = new Date();
  console.log('parallel "array_style" exec time: ', end -  start)
  */

  start = new Date();
  let paralizeByObj = yield {
    first: p1,
    second: { sub1: p2, sub2: p3},
    third: { sub1: p4, sub2: {ssub1: p5, ssub2:{sssub1: p7}}}
  }
  end = new Date();
  console.log('parallel "object_object" exec time: ', end - start) 

  //access nested object
  console.log("first: ",JSON.parse(paralizeByObj.first).type)
  console.log("second.sub1: ",JSON.parse(paralizeByObj.second.sub1).type)
  console.log("third.sub2.ssub1: ",JSON.parse(paralizeByObj.third.sub2.ssub1).type)
  console.log("third.sub2.ssub1.sssub1: ",JSON.parse(paralizeByObj.third.sub2.ssub2.sssub1).type)

/*--------------------------------------end-parallel-part--------------------------------------------------*/

}).catch(function (err) {
  console.error(err.stack);
});