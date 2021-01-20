# <span role="image" aria-label="📚" style="font-family: &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, NotoColorEmoji, &quot;Noto Color Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Android Emoji&quot;, EmojiSymbols; line-height: 1em;">📚</span> Pintreach Project Overview


## Project Description

Pintreach is an article sharing application and research tool designed to enable saving and discovery of information on the internet.


## User Stories

1. The `User` login / signup flow

2. A `User` can create, edit, or delete a `board`

3. A `User` can save `articles` to a `board`

4. A `User` can view saved `articles` in `board`

5. A `User` can delete saved `articles` in `board`


## Tech Stack

#### Frontend
- React
- Context API
- Material UI
- CSS

## Backend
- Java
- Spring Boot
- JUnit 4
- PostgreSQL
- OAuth2
- Swagger
- Maven


## APIs

#### [Front End](https://pintreach.netlify.app/) deployed via netlify

#### [Back End](https://laurene-pintreach.herokuapp.com) deployed via Heroku


## Endpoints

#### GET
<details>
<summary>http://localhost:2019/users/users</summary>
  
```JSON

[
    {
        "userid": 6,
        "username": "admin",
        "primaryemail": "admin@admin.com",
        "imageurl": "http",
        "roles": [
            {
                "role": {
                    "roleid": 2,
                    "name": "USER"
                }
            }
        ],
        "boards": [
            {
                "boardid": 8,
                "title": "Board Test",
                "description": "Test description",
                "thumbnail": "Test thumbnail",
                "articles": [
                    {
                        "article": {
                            "articleid": 9,
                            "url": "Test url",
                            "title": "Test title",
                            "author": "Test author",
                            "source": "Test source",
                            "publishedAt": "12/16/20",
                            "urlToImage": "Test urlToImage",
                            "content": "Test content url",
                            "description": "test description"
                        }
                    }
                ]
            }
        ]
    },
    {
        "userid": 7,
        "username": "laurenemick",
        "primaryemail": "lauren@emick.com",
        "imageurl": "http",
        "roles": [
            {
                "role": {
                    "roleid": 2,
                    "name": "USER"
                }
            }
        ],
        "boards": []
    }
]

```

</details>

<details>
<summary>http://localhost:2019/users/myinfo</summary>
  
```JSON

{
    "userid": 6,
    "username": "admin",
    "primaryemail": "admin@admin.com",
    "imageurl": "http",
    "roles": [
        {
            "role": {
                "roleid": 2,
                "name": "USER"
            }
        }
    ],
    "boards": [
        {
            "boardid": 8,
            "title": "Board Test",
            "description": "Test description",
            "thumbnail": "Test thumbnail",
            "articles": [
                {
                    "article": {
                        "articleid": 9,
                        "url": "Test url",
                        "title": "Test title",
                        "author": "Test author",
                        "source": "Test source",
                        "publishedAt": "12/16/20",
                        "urlToImage": "Test urlToImage",
                        "content": "Test content url",
                        "description": "test description"
                    }
                }
            ]
        }
    ]
}

```

</details>

<details>
<summary>http://localhost:2019/articles/articles</summary>
  
```JSON

[
    {
        "articleid": 4,
        "url": "http",
        "title": "World War II",
        "author": "History.com editors",
        "source": "History",
        "publishedAt": "12/16/20",
        "urlToImage": "",
        "content": "https://www.history.com/topics/world-war-ii/world-war-ii-history",
        "description": "",
        "boards": []
    },
    {
        "articleid": 5,
        "url": "http",
        "title": "Nuclear",
        "author": "",
        "source": "Institute for Energy Research",
        "publishedAt": "12/01/17",
        "urlToImage": "",
        "content": "https://www.instituteforenergyresearch.org/?encyclopedia=nuclear&gclid=CjwKCAiA_eb-BRB2EiwAGBnXXjJk4Y278Ze_GNN6994HVRPaY7JyazyscknMw_V1Qzdmf8bkVYYMPRoC7l8QAvD_BwE",
        "description": "Nuclear power comes from the process of nuclear fission, or the splitting of atoms. The resulting controlled nuclear chain reaction creates heat, which is used to boil water, produce steam, and drive turbines that generate electricity.",
        "boards": []
    },
    {
        "articleid": 9,
        "url": "Test url",
        "title": "Test title",
        "author": "Test author",
        "source": "Test source",
        "publishedAt": "12/16/20",
        "urlToImage": "Test urlToImage",
        "content": "Test content url",
        "description": "test description",
        "boards": [
            {
                "board": {
                    "boardid": 8,
                    "title": "Board Test",
                    "description": "Test description",
                    "thumbnail": "Test thumbnail"
                }
            }
        ]
    }
]

```

</details>

<details>
<summary>http://localhost:2019/articles/article/9</summary>
  
```JSON

{
    "articleid": 9,
    "url": "Test url",
    "title": "Test title",
    "author": "Test author",
    "source": "Test source",
    "publishedAt": "12/16/20",
    "urlToImage": "Test urlToImage",
    "content": "Test content url",
    "description": "test description",
    "boards": [
        {
            "board": {
                "boardid": 8,
                "title": "Board Test",
                "description": "Test description",
                "thumbnail": "Test thumbnail"
            }
        }
    ]
}

```

</details>

<details>
<summary>http://localhost:2019/boards/boards</summary>
  
```JSON

[
    {
        "boardid": 8,
        "title": "Board Test",
        "description": "Test description",
        "thumbnail": "Test thumbnail",
        "articles": [
            {
                "article": {
                    "articleid": 9,
                    "url": "Test url",
                    "title": "Test title",
                    "author": "Test author",
                    "source": "Test source",
                    "publishedAt": "12/16/20",
                    "urlToImage": "Test urlToImage",
                    "content": "Test content url",
                    "description": "test description"
                }
            }
        ]
    }
]

```

</details>

<details>
<summary>http://localhost:2019/boards/board/8</summary>
  
```JSON

{
    "boardid": 8,
    "title": "Board Test",
    "description": "Test description",
    "thumbnail": "Test thumbnail",
    "articles": [
        {
            "article": {
                "articleid": 9,
                "url": "Test url",
                "title": "Test title",
                "author": "Test author",
                "source": "Test source",
                "publishedAt": "12/16/20",
                "urlToImage": "Test urlToImage",
                "content": "Test content url",
                "description": "test description"
            }
        }
    ]
}

```

</details>


#### POST

<details>
<summary>http://localhost:2019/boards/board</summary>
  
```JSON

{
	"title": "Board Test 2",
	"description": "Test description 2",
	"thumbnail": "Test thumbnail 2"
}

```

OUTPUT

```TEXT

Status 201 created

```

</details>

<details>
<summary>http://localhost:2019/articles/article</summary>
  
```JSON

{
    "articleid": 9,
    "url": "Test url",
    "title": "Test title",
    "author": "Test author",
    "source": "Test source",
    "publishedAt": "12/16/20",
    "urlToImage": "Test urlToImage",
    "content": "Test content url",
    "description": "test description",
    "boards": [
        {
            "board": {
                "boardid": 8,
                "title": "Board Test",
                "description": "Test description",
                "thumbnail": "Test thumbnail"
            }
        }
    ]
}

```

OUTPUT

```TEXT

Status 201 created

```

</details>


#### PUT

<details>
<summary>http://localhost:2019/users/user/6</summary>
  
```JSON

{
    "boardid": 8,
    "title": "Board Test Updated",
    "description": "Test description",
    "thumbnail": "Test thumbnail",
    "articles": [
        {
            "article": {
                "articleid": 9,
                "url": "Test url",
                "title": "Test title",
                "author": "Test author",
                "source": "Test source",
                "publishedAt": "12/16/20",
                "urlToImage": "Test urlToImage",
                "content": "Test content url",
                "description": "test description"
            }
        }
    ]
}

```

OUTPUT

```TEXT

No Body Data

Status OK

```

</details>


<details>
<summary>http://localhost:2019/articles/article/9</summary>
  
```JSON

{
    "articleid": 9,
    "url": "Test url updated",
    "title": "Test title",
    "author": "Test author",
    "source": "Test source",
    "publishedAt": "12/16/20",
    "urlToImage": "Test urlToImage",
    "content": "Test content url",
    "description": "test description",
    "boards": [
        {
            "board": {
                "boardid": 8,
                "title": "Board Test Updated",
                "description": "Test description",
                "thumbnail": "Test thumbnail"
            }
        }
    ]
}

```

OUTPUT

```TEXT

No Body Data

Status OK

```

</details>

<details>
<summary>http://localhost:2019/boards/board/8</summary>
  
```JSON

{
    "boardid": 8,
    "title": "Board Test Updated",
    "description": "Test description",
    "thumbnail": "Test thumbnail",
    "articles": [
        {
            "article": {
                "articleid": 9,
                "url": "Test url",
                "title": "Test title",
                "author": "Test author",
                "source": "Test source",
                "publishedAt": "12/16/20",
                "urlToImage": "Test urlToImage",
                "content": "Test content url",
                "description": "test description"
            }
        }
    ]
}

```

OUTPUT

```TEXT

No Body Data

Status OK

```

</details>


#### DELETE

<details>
<summary>http://localhost:2019/articles/article/9</summary>
  
OUTPUT

```TEXT

No Body Data

Status 200 OK

```

</details>

<details>
<summary>http://localhost:2019/boards/board/10</summary>
  
OUTPUT

```TEXT

No Body Data

Status 200 OK

```

</details>


## Documentation

[DB Schema](https://dbdesigner.page.link/9Z28kEt5hxtdi5qK7)

[User Flow](https://whimsical.com/pintreach-WBR5cRD4eEbugaMTDgmvvV)

[Wireframes](https://whimsical.com/pintreach-U5QsVRc1KFcAn8sNvcfcVz)

