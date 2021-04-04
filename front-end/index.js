// Denotes total number of rows
var rowIdx = 0;

// get the default list/ saved list 
async function getlist() {
    const response = await axios.get("http://localhost:3000/list/");
    for (let items of response.data.shoppingList) {
        const item = generateHTML(items);
        $('#result').append(item);
    };


}

$("#shoppingfrm").submit((e) => {
    e.preventDefault();
    const $name = $('#item').val();
    const $price = $('#price').val();
    post($name, $price);

    $("#shoppingfrm").trigger("reset");

})

async function post(name, price) {
    const response = await axios.post("http://localhost:3000/list/", { name, price });
    console.log(response);
    const items = generateHTML(response.data.added);
    $('#result').append(items);
}

function generateHTML(item) {
    return `<tr id="R${++rowIdx}"><td>${item.name}</td>
        <td>${item.price}</td>
        <td><small><button class="btn btn-danger"><i class="bi bi-x-octagon"></i></button><td></tr>`}


$("#result").on("click", '.btn', function () {
    // Getting all the rows next to the row
    // containing the clicked button
    var child = $(this).closest('tr').nextAll();
    let ss = $(this).closest('tr').children('td');
    deleteItem(ss[0].innerText);
    // Iterating across all the rows 
    // obtained to change the index
    child.each(function () {

        // Getting <tr> id.
        var id = $(this).attr('id');

        // Getting the <p> inside the .row-index class.
        var idx = $(this).children('.row-index').children('p');

        // Gets the row number from <tr> id.
        var dig = parseInt(id.substring(1));

        // Modifying row index.
        idx.html(`Row ${dig - 1}`);

        // Modifying row id.
        $(this).attr('id', `R${dig - 1}`);
    });

    // Removing the current row.
    $(this).closest('tr').remove();

    // Decreasing total number of rows by 1.
    rowIdx--;
});

async function deleteItem(item) {
    const resp = await axios.delete(`http://localhost:3000/list/${item}`);
    console.log(resp);
}

getlist();