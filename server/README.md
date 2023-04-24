## Getting started
# Building Image
docker build -t node-app-server-image .
# Run container with all the environment variables and configurations
docker run -p 5000:5000 -e PORT=5000 -e JWT_SECRET='cse2020quydusaigon123' -e MONGO_URL='mongodb+srv://nhomcse2020project:saigondemon123@saigondemon.jmdyggl.mongodb.net/?retryWrites=true&w=majority' -e TMDB_API_KEY='37be93e690e7adb076e5110e93fda06f' -e YOUTUBE_API_KEY1='AIzaSyABHNptc-h_5NQ5Zg06EASYh6COes4i-hE' -e YOUTUBE_API_KEY2='AIzaSyAjXYb9-B3NAeSyDgtbz_bEPGBayNPW8WE' -e AUTH_EMAIL='veritestvgu@gmail.com' -e AUTH_PASS='spcepugsnpnydlij' -d --name node-app-server node-app-server-image
