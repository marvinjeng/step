require('./helper');

console.log("Executing safeTest")

var exception = new Error('Catch me!');

function something_flaky(callback) {
  setTimeout(function () {
    console.log("flaky_timeout")
    callback(exception);
  });
}

function something_stable(callback) {
  setTimeout(function() {
    callback(null, "awesome");
  })
}

Step.safe(
  function () {
    console.log('one');
    this();
  },
  function () {
    something_stable(this);
    console.log('two');
  },
  function (data) {
    console.log("data is: " + data);
    something_flaky(this);
    console.log('three');
  },
  function () {
    console.log('four');
    return "ok";
  }
).handle(function(err, index) {
  console.log("Error on function " + index + "!");
  console.dir({err:err});
  //throw err;
})