const router = require('express').Router();
const { User, Post, Vote } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // select all users from user table using findAll method (similar to SELECT * FROM users)
    User.findAll({
        // do not return password data
        attributes: { exclude: ['password'] }
    })
    // send data as JSON
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    // select one user from user table using findOne method (similar to SELECT * FROM users WHERE id = ?)
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {   // see what posts User has made
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {   // use the Comment model to JOIN title to User query
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {   // see what posts User has voted on
                model: Post,
                attributes: ['title'],
                through: Vote,
                as: 'voted_posts'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            // alert user that everything is fine but user does not exist
            res.status(404).json({ message: 'No user found with this id '});
        }
        // send data as JSON
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
    // expects {username: 'string', email: 'string@string.string', password: 'string > 4 char'}
    // similar to using INSERT INTO users (username, email, password) VALUES ('string', 'string@string.string', 'string > 4 char');
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    // expects {username: 'string', email: 'string@string.string', password: 'string > 4 char'}
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }
        // res.json({ user: dbUserData });

        // Verify user password
        const validPassword = dbUserData.checkPassword(req.body.password);
        // if password does not match, send error message and exit function
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects {username: 'string', email: 'string@string.string', password: 'string > 4 char'}
    // similar to using UPDATE users SET username = 'string', email = 'string@string.string', password = 'string > 4 char' WHERE id = ?;
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;