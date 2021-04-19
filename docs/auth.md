# User route

Prefixed route by `/api/user/`

### Table
| METHOD    |    ENDPOINT   |  Code |  Auth required  | Description |
|-----------|:-------------:|------:|----------------:|------------:|
| POST      | /signup       |  200  | No              | Create users|
| POST      | /signin       |  201  | No              | Create      |
| DELETE    | /logout       |  201  | No              | Delete user |

### How it work

Authentification work with a cookie session and encrypted password

# Create one user

Create one user.

**URL** : `/api/auth/signup`

**Method** : `POST`

**Auth required** : No

##### Success Response

**Code** : `201 Created`
**JSON** : Created user without password

##### Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

```json
{
  "email": { type: String, required: true, unique: true },
  "password": { type: String, required: true },
  "type": { type: String, required: true, enum:["user","admin"]},
  "options": [{ type: Schema.Types.ObjectId, ref: "Option"}]
}
```



# Connect one user

Create one user.

**URL** : `/api/auth/signin`

**Method** : `POST`

**Auth required** : No

##### Success Response

**Code** : `201 Created`
**JSON** : Connected user without password

##### Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

```json
{
  "email": { type: String, required: true, unique: true },
  "password": { type: String, required: true }
}
```




# Get one user

Get the details of the user connected without password.

**URL** : `/api/user/my-profile`

**Method** : `GET`

**Auth required** : YES

##### Success Response

**Code** : `200 OK`
**JSON** : User found

##### Failed Response

**Code** : `401 Unauthorized`




# Create one user

Create one user.

**URL** : `/api/user/logout`

**Method** : `DELETE`

**Auth required** : No

##### Success Response

**Code** : `204 No Content`

##### Failed Response

**Code** : `400 Bad request`
**Code** : `500 Server error`
