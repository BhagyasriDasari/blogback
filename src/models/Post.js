const db = require('../config/database');

class Post {
    static getAll(callback) {
        db.all('SELECT * FROM posts', callback);
    }

    static getById(id, callback) {
        db.get('SELECT * FROM posts WHERE id = ?', [id], callback);
    }

    static create(data, callback) {
        const { title, content, excerpt } = data;
        db.run(
            'INSERT INTO posts (title, content, excerpt) VALUES (?, ?, ?)',
            [title, content, excerpt],
            function (err) {
                callback(err, this.lastID);
            }
        );
    }

    static update(id, data, callback) {
        const { title, content, excerpt } = data;
        db.run(
            'UPDATE posts SET title = ?, content = ?, excerpt = ? WHERE id = ?',
            [title, content, excerpt, id],
            callback
        );
    }

    static delete(id, callback) {
        db.run('DELETE FROM posts WHERE id = ?', [id], callback);
    }
}

module.exports = Post;
