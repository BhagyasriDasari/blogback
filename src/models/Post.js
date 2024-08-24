const db = require('../config/database');

class Post {
    static getAll(callback) {
        db.all('SELECT * FROM posts', callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM posts WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        const { title, content, summary } = data;
        db.run(
            'INSERT INTO posts (title, content, summary) VALUES (?, ?, ?)',
            [title, content, summary],
            function (err) {
                callback(err, this.lastID);
            }
        );
    }

    static update(id, data, callback) {
        const { title, content, summary } = data;
        db.run(
            'UPDATE posts SET title = ?, content = ?, summary = ? WHERE id = ?',
            [title, content, summary, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM posts WHERE id = ?', [id], callback);
    }
}

module.exports = Post;
