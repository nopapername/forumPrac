var commentSQL = {
  insert: 'INSERT INTO comment(postId,user,content) VALUES(?,?,?)', // 插入数据
  drop: 'DROP TABLE comment', // 删除表中所有的数据
  queryAll: 'SELECT * FROM comment', // 查找表中所有数据
  getPostIdById: 'SELECT * FROM comment WHERE postId =?', // 查找符合条件的数据
};
module.exports = commentSQL;