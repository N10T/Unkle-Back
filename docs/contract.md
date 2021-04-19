# Contract route

Prefixed route by `/api/contract/` 

### Table
| METHOD    |    ENDPOINT   |  Code |  Auth required  | Description |
|-----------|:-------------:|------:|----------------:|------------:|
| GET       | /             | 200   | Admin             | All contracts |
| GET       | /my-contracts | 200   | Yes               | My contracts  |
| POST      | /             | 201   | Admin             | Create        |
| PATCH     | /:id/subscribe| 200   | Yes               | Add contract      |
| PATCH     | /:id/unsubscribe| 200   | Yes               | Delete contract   |

# Get All contracts

Get all contracts.

**URL** : `/api/contract/`

**Method** : `GET`

**Auth required** : YES as Admin

##### Success Response

**Code** : `200 OK`
**JSON** : Contracts found

##### Failed Response

**Code** : `401 Unauthorized`




# Get one contract

Get the contracts of the user connected.

**URL** : `/api/contract/my-contracts`

**Method** : `GET`

**Auth required** : YES

##### Success Response

**Code** : `200 OK`
**JSON** : Contract found

##### Failed Response

**Code** : `401 Unauthorized`




# Create one contract

Create one contract.

**URL** : `/api/contract/`

**Method** : `POST`

**Auth required** : YES as Admin

##### Success Response

**Code** : `201 Created`
**JSON** : Created contract

##### Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

```json
{
  "users": [{ type: Schema.Types.ObjectId, ref: "User", required: true, unique:true }],
  "number": { type: Number },
  "status": { type: String , enum:["pending", "active", "finished"], default:"pending"},
  "dateStart": { type: Date, required: true, default: Date.now },
  "dateEnd": { type: Date },
  "dateQuit": { type: Date },
  "options": [{ type: Schema.Types.ObjectId, ref: "Option", required: true }],
}
```




# Add user in contract 

Add user connected if user is client
Add user send if user is admin

**URL** : `/api/contract/:id/subscribe`

**Method** : `PATCH`

**Auth required** : Yes

##### Success Response

**Code** : `200 OK`
**JSON** : Updated contract

##### Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

**params: id**
Id of the contract to udate

**body**
```json
{
  "user": { type: Schema.Types.ObjectId, ref: "User"}
}
```




# Delete user in contract 

Delete user connected if user is client
Delete user send if user is admin
Add a quit date in contract (by default "today")

**URL** : `/api/contract/:id/unsubscribe`

**Method** : `PATCH`

**Auth required** : Yes

##### Success Response

**Code** : `200 OK`
**JSON** : Updated contract

##### Failed Response

**Code** : `401 Unauthorized`

**Request constraints**

**params: id**
Id of the contract to udate

**body**
```json
{
  "user": { type: Schema.Types.ObjectId, ref: "User"},
  "dateQuit": { type: Date },
}
```
