var express = require('express');
var router = express.Router();

router.get('/getInfo', function (req,res,next) {
  console.log(req);
  res.send("reached");
  
})

/* GET users listing. */
router.post('/', async function (req, res, next) {
  const { exec, execSync } = require("child_process");
  var fs = require('fs');

  try {
    //var myData = String.fromCharCode(...(req.body.xml));
    var myData = req.body.xml;
    var fileName = Date.now() + ".bpmn"
    fs.appendFile(fileName, myData, async function (err) {
      if (err) {
        res.send(err);
      }
      try {
        var result = execSync("bpmnlint " + fileName, (error, stdout, stderr) => {
          if (error) {
            fs.stat(fileName, function (err, stats) {
              if (err) {
              } else {
                fs.unlink(fileName, function (err) {
                  if (err) {
                    console.log(err)
                   }
                });
              }
            });
            res.send(error.output.toString());
          }
          if (stderr) {
            fs.stat(fileName, function (err, stats) {
              if (err) {
              } else {
                fs.unlink(fileName, function (err) {
                  if (err) {
                    console.log(err)
                   }
                });
              }
            });
            res.send(stderr.output.toString());
          }
          fs.stat(fileName, function (err, stats) {
            if (err) {
            } else {
              fs.unlink(fileName, function (err) {
                if (err) {
                  console.log(err)
                 }
              });
            }
          });
          res.send(stdout.output.toString());
        });
        fs.stat(fileName, function (err, stats) {
          if (err) {
          } else {
            fs.unlink(fileName, function (err) {
              if (err) {
                console.log(err)
               }
            });
          }
        });
        if(result && result.output){
          res.send(result.output.toString());
        } else {
          res.send(result.toString());
        }
      } catch (error) {
        fs.stat(fileName, function (err, stats) {
          if (err) {
          } else {
            fs.unlink(fileName, function (err) {
              if (err) {
                console.log(err)
               }
            });
          }
        });
        if(error.output){
          res.send(error.output.toString());
        }
        else
        {
          console.log(error)
          res.send(201,error.toString());
        }
      }
    });
  } catch (error) {
    fs.stat(fileName, function (err, stats) {
      if (err) {
      } else {
        fs.unlink(fileName, function (err) {
          if (err) {
            console.log(err)
           }
        });
      }
    });
    if(result && result.output){
      res.send(result.output.toString());
    } else {
      res.send(result.toString());
    }
  }
});

module.exports = router;
