require('./helper');

console.log("Executing blockTest")

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

Step.block({
  steps: [
    function a() {
      console.log('one')
      this()
    },
    function b() {
      console.log('two')
      this(null, 'three')
    },
    function c(n) {
      something_stable(this, n)  
    },
    function d(m) {
      console.log(m)
      return (m + ' four')
    },
    function e() {
      console.log("Should never get here")
    }
  ],
  success: function(val) {
    console.log('returned: ' + val)
  },
  error: function(err) {
    console.warn(err.stack || err)
  }
})