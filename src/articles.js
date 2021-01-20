const express = require('express');

function createRouter(db) {
    const router = express.Router();

    router.post('/article', (req, res, next) => {
        const user = req.user.email;
        db.query(
            'INSERT INTO articles (user, name, description, state, date, quantity) VALUES (?,?,?,?,?,?)', [user, req.body.name, req.body.description, req.body.state, new Date(req.body.date), req.body.quantity],
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
        const user = req.user.email;
        db.query(
            'SELECT id, name, description, state, date, quantity FROM articles WHERE user=? ORDER BY id DESC LIMIT 10 OFFSET ?', [user, 10 * (req.params.page || 0)],
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

    router.put('/article/:id', function(req, res, next) {
        const user = req.user.email;
        db.query(
            'UPDATE articles SET name=?, description=?, state=?, date=?, quantity=? WHERE id=? AND user=?', [req.body.name, req.body.description, req.body.state, new Date(req.body.date), req.body.quantity, req.params.id, user],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.delete('/article/:id', function(req, res, next) {
        const user = req.user.email;
        db.query(
            'DELETE FROM articles WHERE id=? AND user=?', [req.params.id, user],
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