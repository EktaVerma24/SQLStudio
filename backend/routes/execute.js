const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
        const{query} = req.body;
        if(!query){
            return res.status(400).json({message: "Query is required"});
        }
        const trimmedQuery = query.trim().toLowerCase();
        if(!trimmedQuery.startsWith("select")){
            return res.status(400).json({message: "Only SELECT queries are allowed"});
        }  
        try { 
        const result = await pool.query(query);
        res.json({
            success: true,
            rowCount: result.rowCount,
            rows: result.rows
        });
    }
    catch(error){
        console.error("Error executing query:", error);
        res.status(500).json({message: "Error executing query", 
            success: false, 
            error: error.message});
    }});
module.exports = router;   
