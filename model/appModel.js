'user strict';
var sql = require('./db.js');

var Task = function(task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

Task.createTask = function(newTask, result) {
  sql((err, connection) => {
    if (err) {
      console.log('connection error', error);
      result(err, null);
    }
    connection.query('INSERT INTO tasks set ?', newTask, function(e, res) {
      if (e) {
        console.log('error: ', e);
        result(e, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
    connection.release();
  });
};

Task.getTaskById = function(taskId, result) {
  sql((err, connection) => {
    if (err) {
      console.log('connection error', error);
      result(err, null);
    }
    connection.query('Select task from tasks where id = ? ', taskId, function(e, res) {
      if (e) {
        console.log('error: ', e);
        result(e, null);
      } else {
        result(null, res);
      }
    });
    connection.release();
  });
};

Task.getAllTask = function(result) {
  sql((err, connection) => {
    if (err) {
      console.log('connection error', error);
      result(err, null);
    }
    connection.query('Select * from tasks', function(e, res) {
      if (e) {
        console.log('error: ', e);
        result(e, null);
      } else {
        console.log('tasks : ', res);

        result(null, res);
      }
    });
    connection.release();
  });
};

Task.updateById = function(id, task, result) {
  sql((err, connection) => {
    if (err) {
      console.log('connection error', error);
      result(err, null);
    }
    connection.query('UPDATE tasks SET task = ? WHERE id = ?', [task.task, id], function(e, res) {
      if (e) {
        console.log('error: ', e);
        result(e, null);
      } else {
        result(null, res);
      }
    });
    connection.release();
  });
};

Task.remove = function(id, result) {
  sql((err, connection) => {
    if (err) {
      console.log('connection error', error);
      result(err, null);
    }
    connection.query('DELETE FROM tasks WHERE id = ?', [id], function(e, res) {
      if (e) {
        console.log('error: ', e);
        result(e, null);
      } else {
        result(null, res);
      }
    });
    connection.release();
  });
};

module.exports = Task;
