let result = ''
function randomString() {
  //var result = '';
  let j = 0;
  chars = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h'
  ,'i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  for (var i = 4; i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  j++;
  return result + String(j);
}

result = randomString();

module.exports = result
