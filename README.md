#Users
* User object
```
{
  id: integer
  username: string
  email: string
}
```
**POST v2/user/signup**
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
