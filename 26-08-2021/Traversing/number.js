var string = "7770077007777";

function telephone(str) {
  var data = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "nmo",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
    0: " ",
  };
  var output = "";
  var inArray = [];
  for (var i = 0; i < str.length; i++) {
    if ((str[i] == inArray[inArray.length - 1]) | (inArray.length == 0)) {
      if (inArray.length > 3) {
        var dataString = data[[inArray[0]]];
        output += dataString[inArray.length - 1];
        inArray = [];
      }
      inArray.push(str[i]);
    } else {
      var dataString = data[[inArray[0]]];
      output += dataString[inArray.length - 1];
      inArray = [];
      //for 0
      if (string[i] == 0) {
        continue;
      }

      inArray.push(str[i]);
    }
  }
  var dataString = data[[inArray[0]]];
  output += dataString[inArray.length - 1];
  return output;
}
console.log(telephone(string));

