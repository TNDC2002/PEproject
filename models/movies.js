export default (req, res) => {
    const q = "SELECT * FROM movies LIMIT 200;"
    let htmlreturn = ""
    db.query(q, (err, data) => {
        if (err) {
            console.error('Error fetching data from MySQL database:', err);
            res.json(err);
        } else {
            let tableRows = '';
            for (let i = 0; i < data.length; i++) {
                tableRows += `<tr><td>${data[i].tconst}</td><td>${data[i].titleType}</td><td>${data[i].primaryTitle}</td><td>${data[i].originalTitle}</td><td>${data[i].isAdult}</td><td>${data[i].startYear}</td><td>${data[i].endYear}</td><td>${data[i].runtimeMinutes}</td><td>${data[i].genres}</td></tr>`;
            }
            const htmlOutput = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Movies Database</title>
            </head>
            <body>
              <h1>Movies Database</h1>
              <table>
                <thead>
                  <tr>
                    <th>tconst</th>
                    <th>titleType</th>
                    <th>primaryTitle</th>
                    <th>originalTitle</th>
                    <th>isAdult</th>
                    <th>startYear</th>
                    <th>endYear</th>
                    <th>runtimeMinutes</th>
                    <th>genres</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </body>
          </html>
        `;
            res.send(htmlOutput);
        }
    })
}