var grid = [
  [1, 1, 1, 0, 0, 0],
  [1, 0, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0]
];
var oldPosX;
var oldPosY;
var newPosX;
var newPosY;
var startPosX = 0;
var startPosY = 0;
var endPosX = 5;
var endPosY = 4;
function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}
createTable(grid);

for ( i = 1; i < 6; i++ ){
  if( grid[0][i] === 1 ) {
    newPosX = i;
    newPosY = 0;
  } else {
    
  }
}
