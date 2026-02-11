import {Router} from 'express'
const router = Router()

router.get("/tasks", (req, res)=> {
    res.send("test 1")
})

export default router;