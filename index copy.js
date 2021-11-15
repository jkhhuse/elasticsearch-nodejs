const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://100.71.36.32:9200' });

// client.indices
//   .exists({
//     index: 'author-index',
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client.indices
//   .create({
//     index: 'author-index',
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client
//   .index({
//     index: 'author-index',
//     type: 'record',
//     id: 0,
//     body: {
//       author: 'John',
//       article: 'Everything has its time and that time must be watched.',
//       age: 10,
//       interests: ['sports', 'music'],
//       createTime: '2021-11-15',
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client.indices
//   .putMapping({
//     index: 'author-index',
//     type: 'record',
//     include_type_name: true,
//     ignore_unavailable: true,
//     body: {
//       properties: {
//         author: { type: 'keyword' },
//         article: { type: 'text' },
//         age: { type: 'integer' },
//         interests: { type: 'text', fielddata: true },
//         createTime: { type: 'date' },
//       },
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// const dataset = [
//   {
//     author: 'Tom',
//     article: 'All time is no time when it is past.',
//     age: 13,
//     interests: ['sports', 'painting'],
//     createTime: '2020-01-12',
//   },
//   {
//     author: 'Mary',
//     article: 'No one can call back yesterday;Yesterday will not be called again.',
//     age: 15,
//     interests: ['sports', 'painting', 'game', 'music'],
//     createTime: '2021-03-04',
//   },
//   {
//     author: 'David',
//     article: 'Punctuality is the soul of business.',
//     age: 9,
//     interests: ['game'],
//     createTime: '2020-09-22',
//   },
// ];

// const bulkBody = dataset.flatMap((doc, index) => [
//   { index: { _index: 'author-index', _type: 'record', _id: index + 1 } },
//   doc,
// ]);

// client
//   .bulk({
//     index: 'author-index',
//     type: 'record',
//     refresh: true,
//     body: bulkBody,
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client
//   .update({
//     index: 'author-index',
//     type: 'record',
//     id: 0,
//     refresh: true,
//     body: {
//       script: {
//         source: 'ctx._source.age++',
//         lang: 'painless',
//       },
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client
//   .updateByQuery({
//     index: 'author-index',
//     refresh: true,
//     body: {
//       script: {
//         source: 'ctx._source.age++',
//         lang: 'painless',
//       },
//       query: {
//         match: {
//           author: 'Mary',
//         },
//       },
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client
//   .search({
//     index: 'author-index',
//     body: {
//       query: {
//         match: {
//           article: 'time',
//         },
//       },
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

// client
//   .search({
//     index: 'author-index',
//     body: {
//       aggs: {
//         all_interests: {
//           terms: { field: 'interests' },
//         },
//       },
//     },
//   })
//   .then(({ body }) => {
//     console.log(JSON.stringify(body));
//   })
//   .catch(console.error);

client.indices
  .delete({
    index: 'author-index',
  })
  .then(({ body }) => {
    console.log(JSON.stringify(body));
  })
  .catch(console.error);
