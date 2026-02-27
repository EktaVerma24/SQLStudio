const express = require('express');
// const dotenv = require('dotenv');
const router = express.Router();

router.get('/', (req, res) => {
    const assignments = [
        {
            id: 1,
            title: 'SELECT Query Assignment',
            difficulty: 'Easy',
            description: 'Write a SQL query to retrieve all records from the employees table.'
        },
        {
            id: 2,
            title: 'WHERE Clause Assignment',
            difficulty: 'Medium',
            description: 'Write a SQL query to fetch the employees names from HR department.'
        },
        {
            id: 3,
            title: 'Conditional Query Assignment',
            difficulty: 'Hard',
            description: 'Write a SQL query to retrieve employees with salary greater than 50000.'
        }
    ];
    res.json(assignments);
});

module.exports = router;