/* GET users listing. */

*  GET users listing : `GET /api/user/` | Need to be admin
router.get("/", isAdmin, async (req, res, next) => {

router.get("/my-profile", isConnected, async (req, res, next) => {

router.post("/", isAdmin, async (req, res, next) => {

router.patch("/option", isConnected, async (req, res, next) => {

router.patch("/contract", isConnected, async (req, res, next) => {

router.delete("/:id", isAdmin, async (req, res, next) => {

| METHOD   |    ENDPOINT   |  Code |  Auth required  |
|----------|:-------------:|------:|------:|
| col 1 is |  left-aligned | $1600 | $1600 |
| col 2 is |    centered   |   $12 |   $12 |
| col 3 is | right-aligned |    $1 |    $1 |