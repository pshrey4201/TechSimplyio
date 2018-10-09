var a = [];
var b = [];
for( i = 0; i < 10; i++ ){
  a[i] = Math.random();
  b[i] = Math.random();
}
// console.log(a);
// console.log(b);

function distance(a, b){
      var d = [];
      for ( i = 0; i < 9; i++ ){
        var e = Math.pow((a[i] - b[i]), 2);
        var f = 0;
        f += e
        }
      d = Math.sqrt(f);
      return d;
}
var dis = distance(a, b);
console.log(dis)
