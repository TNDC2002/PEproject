import express from "express";
import * as controller from "../controller/controller.js";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', controller.default.Sample);
  router.post('/api/insert', controller.default.Api_insert);
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