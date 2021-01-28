// global variables
var currentDay = moment().format("dddd, MMMM Do")
document.getElementById("currentDay").innerText = currentDay
var currentHour = moment().hour()
var savedText = {}
var fadeClear = {}
if (localStorage.savedText) {
    savedText = JSON.parse(localStorage.savedText)
}

buildColumns("am")
buildColumns("pm")


function buildColumns(dayPart) {
    // check for am or pm
    if (dayPart == "am") {
        var i = 9
        var loopLimit = 13
        morning = true

    } else {
        var i = 1
        var loopLimit = 6
        morning = false
    }

    // build the rows, uses slightly different logic for morning or afternoon
    for (i; i < loopLimit; i++) {

        if (morning == true) {
            var rowHour = i
        } else {
            var rowHour = i + 12
        }

        row = document.createElement("div")
        row.setAttribute("class", "row")
        document.querySelector(".container").appendChild(row)

        // build column to display times
        timeColumn = document.createElement("div")
        timeColumn.setAttribute("class", "col col-2 d-flex justify-content-center")
        row.appendChild(timeColumn)
        
        // build the text for the time column
        time = document.createElement("p")
        time.innerHTML = `${i} ` + dayPart
        timeColumn.appendChild(time)

        // build column for user text input
        var formColumn = document.createElement("div")
        formColumn.setAttribute("class", "col col-9")
        row.appendChild(formColumn)

        // build user text input
        var input = document.createElement("textarea")
        input.setAttribute("class", "form-control")
        input.id = `${rowHour}`
        if (savedText[rowHour]) {
            input.value = savedText[rowHour]
        }
        formColumn.appendChild(input)

        //build save button column for the row
        var saveColumn = document.createElement("div")
        saveColumn.setAttribute("class", "col col-1 d-flex justify-content-center")
        row.appendChild(saveColumn)

        // build the save button for the save column
        var saveButton = document.createElement("button")
        saveButton.setAttribute("class", "btn")
        saveButton.setAttribute("onClick", `saveRow(${rowHour})`)
        saveButton.id = `save-${rowHour}`
        saveButton.innerHTML = '<i class="fas fa-save fa-2x"></i>'
        saveColumn.appendChild(saveButton)

        // change colors of rows and text areas based on time of day
        if (currentHour > rowHour) {
            row.setAttribute("style", "background-color: lightgray;")
            input.setAttribute("style", "background-color: lightgray;")
        }
        else if (currentHour == rowHour) {
            row.setAttribute("style", "background-color: yellow;")
            input.setAttribute("style", "background-color: yellow;")
        } else {
            row.setAttribute("style", "background-color: lightgreen;")
            input.setAttribute("style", "background-color: lightgreen;")
        }
    }
}

function saveRow(id) {
    // add text that confirms the contents have been saved. Restart animation if a previous iteration has not cleared.
    if (!document.getElementById(`message-${id}`)){
        document.getElementById(`save-${id}`).innerHTML += `<p class='fade-out' id=message-${id} >Saved!</p>`
       
    } else {
        clearTimeout(fadeClear[id])
        document.getElementById(`message-${id}`).remove()
        document.getElementById(`save-${id}`).innerHTML += `<p class='fade-out' id=message-${id} >Saved!</p>`
    }
    fadeClear[id] = setTimeout(function () { document.getElementById(`message-${id}`).remove() }, 2000)

    // update the saved contents in local storage
    savedText[id] = document.getElementById(id).value
    localStorage.savedText = JSON.stringify(savedText)
}