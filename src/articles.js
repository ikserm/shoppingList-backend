const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const user = '';

    router.post('/article', (req, res, next) => {
        db.query(
            'INSERT INTO articles (user, name, description, estate, date) VALUES (?,?,?,?)', [user, req.body.name, req.body.description, req.body.estate, new Date(req.body.date)],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    return router;
}

module.exports = createRouter;