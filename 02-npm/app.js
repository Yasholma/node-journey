const _ = require("underscore");

const dummyData = [1, 2, 3, 4, 5];

const data = _.map(dummyData, (num) => num * num);
const res = _.contains(dummyData, 3);
console.log({ data });
console.log({ res });
