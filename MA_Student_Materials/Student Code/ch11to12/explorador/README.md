ParkFinder
=============

A mobile web application to help explore parks in HRM 

To merge the Master branch into your own branch run the following:
```
git fetch origin
git checkout <named branch>
git merge origin/master
```
Where <named branch> is the name of your development branch you want to merge into.
Once you are done your development work do not merge into master.

To run the ParkFinder server, use:
```
npm install
node app.js
```
This will install all needed node modules as listed in packages.json, and setup the needed directory structure.
If testing locally browse to http://localhost:8880
If testing on HRM-Apps server be sure to change the port number in index.js to avoid collisions with other users.
Then browse to http://140.184.132.239:8880 (with your chosen port)

To keep the node process running use nohup
```
   nohup node app.js > node_output.log &
```

#Troubleshooting

If you recieve a node error "Error: listen EADDRINUSE" 
please change the port the node application is listening on.
