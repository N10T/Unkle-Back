/* GET users listing. */

Prefixed route by 'api/user/'
*  GET users listing : `GET /api/user/` | Need to be admin
router.get("/", isAdmin, async (req, res, next) => {

router.get("/my-profile", isConnected, async (req, res, next) => {

router.post("/", isAdmin, async (req, res, next) => {

router.patch("/option", isConnected, async (req, res, next) => {

router.patch("/contract", isConnected, async (req, res, next) => {

router.delete("/:id", isAdmin, async (req, res, next) => {

| METHOD    |    ENDPOINT   |  Code |  Auth required  | Description |
|-----------|:-------------:|------:|----------------:|------------:|
| GET       | /             | 200 | Admin             | All users   |
| GET       | /my-profile   | 200 | Yes               | One user    |
| POST      | /             | 201 | Admin             | Create      |
| PATCH     | /option       | 200 | Yes               | Add option  |
| PATCH     | /contract     | 200 | Yes               |Delete option|
| DELETE    | /:id          | 201 | Admin             | Delete user |

### Get All users '/'

Get the details of all users without passwords.

**URL** : `/api/user/`

**Method** : `GET`

**Auth required** : YES as Admin

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`
-


### Get one user

Get the details of the user connected without password.

**URL** : `/api/user/my-profile`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`
-


### Create one user

Create one user.

**URL** : `/api/user/`

**Method** : `POST`

**Auth required** : Admin

## Success Response

**Code** : `201 Created`

## Failed Response

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
-


### Add unique options in user 

Add option selected by user and verify if the current user don't already have it.

**URL** : `/api/user/option`

**Method** : `PATCH`

**Auth required** : Yes

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

```json
{
  "options": [{ type: Schema.Types.ObjectId, ref: "Option"}]
}
```
-


### Add contract in user 

Add option selected by user and verify if the current user don't already have it.

**URL** : `/api/user/contract`

**Method** : `PATCH`

**Auth required** : Yes

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

```json
{
  "contract": [{ type: Schema.Types.ObjectId, ref: "Contract"}]
}
```
-


### Delete one user 

Add option selected by user and verify if the current user don't already have it.

**URL** : `/api/user/:id`

**Method** : `DELETE`

**Auth required** : Admin

## Success Response

**Code** : `204 No Content`

## Failed Response

**Code** : `401 Unauthorized`
-

/my-profile  
/            
/option      
/contract    
/:id         