#Users
* User object
```
{
  _id: integer
  username: string
  email: string
}
```
**POST /v2/user/signup**
----
  Signup user to db
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
  "message" : "User Created"
}
```
* **Failed Response:**  
* **Code:** 500  
  **Content:**  
```
{
    "error": {
        "driver": true,
        "name": "MongoError",
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "username": 1
        },
        "keyValue": {
            "username": "string"
        }
    }
}
```

**POST /v2/user/login**
----
  Login user 
* **URL Params**  
  None
* **Data Params**  
```
{
  "username" : "string",
  "email" : "string",
  "password" : "string"
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
   
  "message": "Succsess",
  "token": "string"

}
```

#To Do
* ToDo object
```
{
  _id: integer
  username: string
  activity: string
  detail: string
}
```

**GET /v2/to-do**
----
  Get All To-do list with spesific user 
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json 
  Authorization: Bearer XXX
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
    "count": "string",
    "todolist": [
        {
            "_id": "string",
            "activity": "string",
            "detail": "string",
            "request": {
                "type": "GET",
                "url": "string"
            }
        },
        {
            "_id": "string",
            "activity": "string",
            "detail": "string",
            "request": {
                "type": "GET",
                "url": "string"
            }
        }
    ]
}
```
* **Fail Response:**  
* **Code:** 500  
  **Content:** 
```
{
    "error": "Auth Failed"
}
```

**GET /v2/to-do/:ToDoID**
----
  Login user 
* **URL Params**  
  Required: ToDoID=[integer]
* **Data Params**  
  None
* **Headers**  
  Content-Type: application/json
   Authorization: Bearer XXX
* **Success Response:**  
* **Code:** 200  
  **Content:**  
```
{
    "message": "succsess",
    "data": {
        "_id": "String",
        "activity": "String",
        "detail": "String",
        "request": {
            "type": "GET",
            "description": "get all to-do-list",
            "url": "String"
        }
    }
}
```
* **Fail Response:**  
* **Code:** 500  
  **Content:** 
```
{
    "error": "Auth Failed"
}
```
