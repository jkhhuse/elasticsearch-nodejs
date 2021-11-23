const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://100.71.36.32:9200' });

const createNullIndex = () => {
  return client.indices.create({
    index: 'author-index',
  });
};

const checkIndexExist = () => {
  return client.indices.exists({
    index: 'author-index',
  });
};

const createIndexMapping = () => {
  return client.indices.putMapping({
    index: 'author-index',
    include_type_name: false,
    ignore_unavailable: true,
    body: {
      properties: {
        author: { type: 'keyword' },
        article: { type: 'text' },
        age: { type: 'integer' },
        interests: { type: 'text', fielddata: true },
        createTime: { type: 'date' },
      },
    },
  });
};

const addDoc = () => {
  return client.index({
    index: 'author-index',
    id: 0,
    body: {
      author: 'John',
      article: 'Everything has its time and that time must be watched.',
      age: 10,
      interests: ['sports', 'music'],
      createTime: '2021-11-15',
    },
  });
};

const dataset = [
  {
    author: 'Tom',
    article: 'All time is no time when it is past.',
    age: 13,
    interests: ['sports', 'painting'],
    createTime: '2020-01-12',
  },
  {
    author: 'Mary',
    article: 'No one can call back yesterday;Yesterday will not be called again.',
    age: 15,
    interests: ['sports', 'painting', 'game', 'music'],
    createTime: '2021-03-04',
  },
  {
    author: 'David',
    article: 'Punctuality is the soul of business.',
    age: 9,
    interests: ['game'],
    createTime: '2020-09-22',
  },
];

const bulkBody = dataset.flatMap((doc, index) => [
  { index: { _index: 'author-index', _type: '_doc', _id: index + 1 } },
  doc,
]);

const bulkAddDocs = () => {
  return client.bulk({
    index: 'author-index',
    type: '_doc',
    refresh: true,
    body: bulkBody,
  });
};

const updateIndex = () => {
  client.update({
    index: 'author-index',
    id: 0,
    refresh: true,
    body: {
      script: {
        source: 'ctx._source.age++',
        lang: 'painless',
      },
    },
  });
};

const updateIndexByQuery = () => {
  client.updateByQuery({
    index: 'author-index',
    refresh: true,
    body: {
      script: {
        source: 'ctx._source.age++',
        lang: 'painless',
      },
      query: {
        match: {
          author: 'Mary',
        },
      },
    },
  });
};

const searchKeyword = () => {
  return client.search({
    index: 'author-index',
    body: {
      query: {
        match: {
          article: 'time',
        },
      },
    },
  });
};

const aggregateKeyword = () => {
  return client.search({
    index: 'author-index',
    body: {
      aggs: {
        all_interests: {
          terms: { field: 'interests' },
        },
      },
    },
  });
};

const deleteIndex = () => {
  return client.indices.delete({
    index: 'author-index',
  });
};

async function run() {
  const indexExistResp = await checkIndexExist();
  // 判断索引是否存在
  if (!indexExistResp.body) {
    // 创建空索引
    await createNullIndex();
  }
  // 创建 Mapping
  await createIndexMapping();
  // 增加一个文档
  await addDoc();
  // 批量导入文档
  await bulkAddDocs();
  // 更新索引
  await updateIndex();
  // 使用查询更新索引
  await updateIndexByQuery();
  // 搜索关键词
  const searchResult = await searchKeyword();
  console.log(JSON.stringify(searchResult.body.hits));
  // 执行聚合
  const aggsResult = await aggregateKeyword();
  console.log(JSON.stringify(aggsResult.body.aggregations));
  // 删除索引
  await deleteIndex();
}

run().catch((error) => {
  console.log(JSON.stringify(error));
});
