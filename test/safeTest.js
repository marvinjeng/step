require('./helper');

console.log("Executing safeTest")

var exception = new Error('Catch me!');

function something_flaky(callback) {
  setTimeout(function () {
    console.log("flaky_timeout")
    callback(exception);
  });
}

function something_stable(callback, val) {
  setTimeout(function() {
    callback(null, val + ' stabilized ');
  })
}

Step.safe(
  function is_admin() {
    console.log('one')
    this()
  },
  function is_owner() {
    console.log('two')
    return 'three'
  },
  function has_access(n) {
    something_stable(this, n)  
  },
  function has_session(m) {
    console.log(m)
    this.result(m + ' four')
  },
  function result() {
  
  }
).result(function(result) {
  console.log('result: ' + result)
}).error(function(err, index) {
  console.log('error at function ' + index + ':')
  console.dir(err)
})