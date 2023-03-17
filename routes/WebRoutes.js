import express from "express";
import { Sample_page } from "../controller/controller.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', Sample_page);

  app.use("/", router);
}

export { initWebRoutes };



    /* rest API:
                method get khi lấy data
                router.get('/', controller.<function>)

                method Post khi create
                router.post('/',controller.<function>)

                method Put để cập nhật
                router.put('/',controller.<function>)

                method delete để xóa
                router.delete('/',controller.<function>)
    */