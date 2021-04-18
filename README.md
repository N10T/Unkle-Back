# UNKLE APIDocs

To run de demo api: npm start or yarn start

## Open Endpoints

Open endpoints require Authentication.

## Endpoints that require Authentication

Some endpoints require a req session Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User connected:

* [Show info](docs/user.md) : `GET /api/user/`
* [Update info](user/put.md) : `PUT /api/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

* [Show Accessible Accounts](accounts/get.md) : `GET /api/accounts/`
* [Create Account](accounts/post.md) : `POST /api/accounts/`
* [Show An Account](accounts/pk/get.md) : `GET /api/accounts/:pk/`
* [Update An Account](accounts/pk/put.md) : `PUT /api/accounts/:pk/`
* [Delete An Account](accounts/pk/delete.md) : `DELETE /api/accounts/:pk/`
