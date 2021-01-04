const _ = require("underscore");
const lion = require("@yasholma/lion-lib-1.0");

const dummyData = [1, 2, 3, 4, 5];

const data = _.map(dummyData, (num) => num * num);
const res = _.contains(dummyData, 3);
console.log({ data });
console.log({ res });

const sum = lion.add(2, 3);
console.log({ sum });
