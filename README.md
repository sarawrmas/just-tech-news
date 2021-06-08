POST http://localhost:3001/api/users
{
    "username": "username1",
    "email": "email@email.com",
    "password": "password1"
}

POST http://localhost:3001/api/posts
{
    "title": "Title1",
    "post_url": "https://runbuddy.com",
    "user_id": "1"
}

PUT http://localhost:3001/api/posts/1
{
    "title": "Runbuddy reaches 2 million subscribers"
}