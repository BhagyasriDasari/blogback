const db = require('../config/database');

module.exports = {
    getAll(callback) {
        db.all('SELECT * FROM posts', [], callback);
    },
    getById(id, callback) {
        db.get('SELECT * FROM posts WHERE id = ?', [id], callback);
    },
    create(post, callback) {
        const { title, content, summary } = post;
        db.run('INSERT INTO posts (title, content, summary) VALUES (?, ?, ?)', [title, content, summary], function(err) {
            callback(err, this.lastID);
        });
    },
    update(id, post, callback) {
        const { title, content, summary } = post;
        db.run('UPDATE posts SET title = ?, content = ?, summary = ? WHERE id = ?', [title, content, summary, id], callback);
    },
    delete(id, callback) {
        db.run('DELETE FROM posts WHERE id = ?', [id], callback);
    }
};
