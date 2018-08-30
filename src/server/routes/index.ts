import {Router} from "express";
import {getPageList} from "../../scrapbox";

const router = Router();

router.get("/", async (req, res, next) => {
    const data = {
        pageList: JSON.stringify(await getPageList().catch(next)),
    };
    return res.render("index", data)
});

export const routes = router;