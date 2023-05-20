import * as dotenv from 'dotenv';
dotenv.config()
import AdminChecker from '../models/AdminChecker_Model.js'
const Admin_checker = async (req, res) => {
    try {
        let AdminChecker_return = await AdminChecker.isAdmin(req)
        if (AdminChecker_return.err) {
            return res.status(AdminChecker_return.status).json({ error: AdminChecker_return.err });
        } else if (AdminChecker_return.isAdmin) {
            return res.status(AdminChecker_return.status).json({ isAdmin: AdminChecker_return.isAdmin });
        }
    } catch (err) {
        console.log("/auth/admin --- error:", err.message)
    }

}

const output = {
    Admin_checker
}
export default output;