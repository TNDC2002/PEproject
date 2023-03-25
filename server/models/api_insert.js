
export default (req, res) => {
    const accountName = req.body.accountName;
    const accountPassword = req.body.accountPassword;

    const sqlInsert = "INSERT INTO user_accounts (accountName, accountPassword) VALUES (?, ?)"
    db.query(sqlInsert, [accountName, accountPassword], (err, result) => {
        console.log(err);
    })

}