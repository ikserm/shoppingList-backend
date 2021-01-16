const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const user = '';

    router.post('/article', (req, res, next) => {
        db.query(
            'INSERT INTO articles (user, name, description, state, date) VALUES (?,?,?,?)', [user, req.body.name, req.body.description, req.body.state, new Date(req.body.date)],
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

    router.get('/article', function(req, res, next) {
        db.query(
            'SELECT id, name, description, state, date FROM events WHERE user=? ORDER BY date LIMIT 10 OFFSET ?', [user, 10 * (req.params.page || 0)],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('article/:id', function(req, res, next) {
        db.query(
            'UPDATE articles SET name=?, description=?, date=? WHERE id=? AND user=?', [req.body.name, req.body.description, req.body.state, new Date(req.body.date), req.params.id, user],
            (error) => {
                if (error) {
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