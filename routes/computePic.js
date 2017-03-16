module.exports = function(io) {
    const express = require('express');
    const router = express.Router();
    const PythonShell = require('python-shell');
    const multer = require('multer');
    const upload=multer({dest:'./processing'});
    // const pyOptions = {
    //     mode: 'text',
    //     scriptPath: './',
    //     args: ['poza_bogdan.png']
    // }
    //io.on(...);
    var obj;
    router.use('/', upload.single('poza'));
    router.post('/', (req, res) => {
        //const pyShell = new PythonShell('my_script.py', pyOptions);
        PythonShell.run('my_script.py',{scriptPath:'./processing',args: req.file}, (err, data) => {
          if (err){
            console.log(err);
            return res.status(400).send("Something bad happened!");
          }
            console.log(data);
            console.log('done');
            obj=data;
        })
        // const pyShell = new PythonShell('my_script.py', pyOptions);
        // pyShell.on('message', (data) => {
        //     console.log(data);
        //     console.log("dada");
        //     obj = data;
        // });
        // pyShell.on('close', (err) => {
        //     //fac verificarile n stuff
        //     if (err) {
        //         console.log(err);
        //         return res.status(400).send("Something crashed");
        //     }
        //     console.log("Execution ok");
        //     res.send(obj);
        // });
        console.log('Merge');
        io.on('connection', (socket) => {
            console.log('Sal boss');
            //  socket.emit('numeEvent'),{ceva:'ceva'});
            socket.on('disconnect', () => {
                console.log('Pa boss');
            })
        })
        res.send(obj);
    })
    return router;
}
