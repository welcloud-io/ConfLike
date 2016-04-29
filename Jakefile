desc('This is the default task.');
task('run_test_env', function (params) {
  var cmds = [
    'node index.js 2>&1 &',
    'mocha',
    'filewatcher "*.html **/*.js" "mocha"'
  ];
  jake.exec(cmds, {printStdout: true}, function () {
    console.log('Server started');
    complete();
  });
});
