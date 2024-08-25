const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/postRoutes');
const db = require('./config/database'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    
    db.serialize(() => {
        console.log('Connected to the SQLite database.');
        
       
        db.run("INSERT INTO posts (title, content, summary) VALUES ('First Blog Post', 'This is the content of the first blog post.', 'This is the summary for the first blog post.')");
        db.run("INSERT INTO posts (title, content, summary) VALUES ('Second Blog Post', 'This is the content of the second blog post.', 'This is the summary for the second blog post.')");
        db.run("INSERT INTO posts (title, content, summary) VALUES ('Third Blog Post', 'This is the content of the third blog post.', 'This is the summary for the third blog post.')", (err) => {
            if (err) {
                console.error('Error inserting sample data:', err.message);
            } else {
                console.log("Sample data inserted into the database.");
            }
        });
    });
});