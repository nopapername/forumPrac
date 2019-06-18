var UserSQL = {
  insert: 'INSERT INTO user(uid,userName) VALUES(?,?)', // 插入数据
  drop: 'DROP TABLE user', // 删除表中所有的数据
  queryAll: 'SELECT * FROM user', // 查找表中所有数据
  getUserById: 'SELECT * FROM user WHERE uid =?', // 查找符合条件的数据
};
module.exports = UserSQL;