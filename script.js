var currentDay = moment().format("dddd, MMMM Do")
document.getElementById("currentDay").innerText = currentDay

buildColumns("am")
buildColumns("pm")

function buildColumns(dayPart) {
    if (dayPart == "am") {
        var i = 9
        var loopLimit = 13
    } else {
        var i = 1
        var loopLimit = 6
    }

    for (i; i < loopLimit; i++) {
        row = document.createElement("div")
        row.setAttribute("class", "row")
        document.querySelector(".container").appendChild(row)

        //build column to display times
        timeColumn = document.createElement("div")
        timeColumn.setAttribute("class", "col col-2 d-flex justify-content-center")
        row.appendChild(timeColumn)

        time = document.createElement("p")
        time.innerHTML = `${i}` + dayPart
        timeColumn.appendChild(time)

        // build column for user text input
        var formColumn = document.createElement("div")
        formColumn.setAttribute("class", "col col-9")
        row.appendChild(formColumn)

        // build user text input
        var input = document.createElement("textarea")
        input.setAttribute("class", "form-control")
        inputId = `${i}` + dayPart
        input.id = inputId
        formColumn.appendChild(input)

        //build save button for row
        var saveColumn = document.createElement("div")
        saveColumn.setAttribute("class", "col col-1 d-flex justify-content-center")
        row.appendChild(saveColumn)

        var saveButton = document.createElement("button")
        saveButton.setAttribute("class", "btn")
        saveButton.setAttribute("onClick", "saveRow('" + `${inputId}` + "')")
        saveButton.innerHTML = '<i class="fas fa-save"></i>'
        saveColumn.appendChild(saveButton)
    }
}
function saveRow(id) {
    console.log(id)
}