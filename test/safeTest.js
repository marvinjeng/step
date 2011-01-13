require('./helper');

console.log("Executing safeTest")

var exception = new Error('Catch me!');

function something_flaky(callback) {
  setTimeout(function () {
    console.log("flaky_timeout")
    callback(exception);
  });
}

Step.safe(
  function () {
    console.log('one');
    this()
  },
  function (err) {
    something_flaky(this);
    console.log('two');
  },
  function (err) {
    console.log('three');
  },
  function (err) {
    console.log('four');
  }
).handle(function(err) {
  console.log("handle():");
  console.dir({err:err});
  //throw err;
})