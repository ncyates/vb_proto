const express = require('express')
const cors = require('cors')
const app = express()

var corsOptions = {
	origin: 'http://localhost:4200/',
	optionsSuccessStatus: 200
}
 app.use(cors(corsOptions));

app.use(function (req, res, next) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
res.setHeader('Access-Control-Allow-Credentials', true);
next();
});


app.listen(4000, () => console.log('Application listening on port 4000!'))
app.use('/static',express.static('static'));
app.get('/:vid', (req, res) => {
    
	var vidLink = req.params.vid;
    console.log('Node says: received \"' + vidLink + '\" from Angular'); 
	let runPy = new Promise(function(success, nosuccess) {
        const { spawn } = require('child_process');
        //change python call
        const pyprog = spawn('python2', ["C:/_sw/fooNode/fooPyScripts/vidBlend.py", vidLink]);
        pyprog.stdout.on('data', function(data) {success(data);});	
        pyprog.stderr.on('data', (data) => {nosuccess(data);});	
	});


    runPy.then(function(fromRunpy) {        
        //console.log("Message returned from python is: " + fromRunpy.toString());
        res.send(fromRunpy);
    });

})
