const table = document.querySelector("table");
let rows = table.getElementsByTagName("tr");
const addButton = document.getElementById("new-round");

edit();

addButton.addEventListener("click", function() {
    // Clone the last row to create a new row
    const lastRow = table.querySelector("tr:last-child");
    const newRow = lastRow.cloneNode(true);

    // Increment the ID of the new row
    const lastRowId = lastRow.getAttribute("id");
    const newRowId = "r-" + rows.length;
    newRow.setAttribute("id", newRowId);

    // Clear the content of the new row's editable cell
    const editableCell = newRow.querySelector(".editable");
    editableCell.textContent = "0-0";
    
    const neditableCell = newRow.querySelector(".non-editable");
    neditableCell.textContent = "Round " + rows.length;
    // Append the new row to the table
    table.appendChild(newRow);
    rows = table.getElementsByTagName("tr");
    edit();
});

function edit()
{
    for (let i = 0; i < rows.length; i++) {

        const row = rows[i];
    
        const editableCells = row.querySelectorAll('.editable');
        
        editableCells.forEach(function(cell) {
          cell.setAttribute("contenteditable", "true");
    
          cell.addEventListener("input", function() {
            // Handle the content change here for the editable cells
            console.log("Cell content changed:", cell.textContent);
            console.log("Row ID:", row.id);
          });
        });
    }
}
