let result = ''
function randomString() {
  //var result = '';
  chars = ['1','2','3','4','5','a','b','c','d','e'];
  for (var i = 4; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
result = randomString();

module.exports = result
