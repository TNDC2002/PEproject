import express from "express";
import controller from "../controller/controller"

let router = express.Router();
let initWebroutes = (app) => {
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
    router.get('/', controller.Sample_page)

	 	
    app.use("/", router)
}

module.exports = initWebroutes;