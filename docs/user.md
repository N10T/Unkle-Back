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
| GET       | /             |  200  |      Admin      | All users   |
| GET       | /my-profile   |  200  |       Yes       | One user    |
| POST      | /             |  201  |      Admin      | Create      |
| PATCH     | /option       |  200  |       Yes       | Add option  |
| PATCH     | /contract     |  200  |       Yes       |Delete option|
| DELETE    | /:id          |  201  |      Admin      | Delete user |

### Current User related Get All users '/'

Get the details of all users without passwords.

**URL** : `/api/user/`

**Method** : `GET`

**Auth required** : YES as Admin

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`
-


### Current User related Get All users '/'

Get the details of all users without passwords.

**URL** : `/api/user/`

**Method** : `GET`

**Auth required** : YES as Admin

## Success Response

**Code** : `200 OK`

## Failed Response

**Code** : `401 Unauthorized`
    
/my-profile  
/            
/option      
/contract    
/:id         