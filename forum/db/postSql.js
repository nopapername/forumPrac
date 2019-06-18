var postSQL = {
  insert: 'INSERT INTO post(title, content, user, postId) VALUES(?,?,?,?)', // 插入数据
  drop: 'DROP TABLE post', // 删除表中所有的数据
  queryAll: 'SELECT * FROM post', // 查找表中所有数据
  getPostById: 'SELECT * FROM post WHERE postId =?', // 查找符合条件的数据
};
module.exports = postSQL;