pkill node && echo "Server has been stopped"
echo 'Starting server...' && node index.js 2>&1 & mocha
filewatcher "index.js" "echo 'Restarting server...' && pkill node; node index.js 2>&1 & mocha" &
filewatcher "**/index.html test/*.js" "mocha"