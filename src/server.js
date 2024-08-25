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
        
        // Delete all data in the posts table
        db.run("DELETE FROM posts", (err) => {
            if (err) {
                console.error('Error deleting data from the database:', err.message);
            } else {
                console.log("All sample data deleted from the database.");
                
                // Insert some original blog data
                const insert = db.prepare("INSERT INTO posts (title, content, summary) VALUES (?, ?, ?)");
                
                insert.run(
                    "Understanding JavaScript Closures",
                    "Closures are a fundamental concept in JavaScript. They occur when a function retains access to its lexical scope, even when the function is executed outside that scope.",
                    "An overview of JavaScript closures, a fundamental concept in the language."
                );
                insert.run(
                    "Getting Started with React",
                    "React is a popular JavaScript library for building user interfaces. This post will guide you through the basics of creating a React application.",
                    "An introduction to React and how to get started with it."
                );
                insert.run(
                    "Async/Await in JavaScript",
                    "Async/await is a modern way to handle asynchronous operations in JavaScript. It makes code that handles promises easier to read and write.",
                    "Understanding async/await and how it simplifies handling promises in JavaScript."
                );
                insert.run(
                    "CSS Grid Layout: A Beginner's Guide",
                    "CSS Grid Layout is a powerful layout system available in CSS. It provides a two-dimensional grid-based layout system, optimized for user interface design.",
                    "A beginner's guide to understanding and using CSS Grid Layout."
                );
                insert.run(
                    "Understanding RESTful APIs",
                    "RESTful APIs are a way to provide interoperability between computer systems on the internet. This post explores the fundamentals of REST and how to build a RESTful API.",
                    "An introduction to RESTful APIs and their importance in web development."
                );
                
                insert.finalize((err) => {
                    if (err) {
                        console.error('Error inserting data into the database:', err.message);
                    } else {
                        console.log("Original blog data inserted into the database.");
                    }
                });
            }
        });
    });
});
