// Makes all elements readily available as constants.
function getElements() {
    const handler = {
        get: function (_, prop) {
            return document.getElementById(prop)
        }
    }
    return new Proxy({}, handler)
}
// All of the IDs in index.html converted into constants.
const { navToggle, navToggled, home, quiz, question, button1, button2, button3, button4, button5, quizBack, results, screenshot, match, flag, quote, resultsBack, lSwitch, rSwitch, create, createScreenshot, createMatch, createFlag, createQuote, matchesTip, matches, about, tree, tree1, tree2 } = getElements()
// Lists the site's sections in an array.
const sections = ["home", "quiz", "results", "create", "about", "tree"]
// Lists the quiz's buttons in an array.
const buttons = [button1, button2, button3, button4, button5]
// Lists default button colors in an array.
const defaultColors = ["hsl(120,70%,45%)", "hsl(0,70%,45%)", "hsl(0,0%,25%)", "hsl(0,0%,25%)", "hsl(0,0%,25%)"]
// Lists default button shadow colors in an array.
const defaultShadowColors = ["hsl(120,70%,30%)", "hsl(0,70%,30%)", "hsl(0,0%,17.5%)", "hsl(0,0%,17.5%)", "hsl(0,0%,17.5%)"]
// Lists default button icons in an array.
const defaultIcons = ["yes", "no", "none", "none", "none"]
// Global scope bullshit.
let ideologies, list
selectedIdeology = ""
// Tree arrow paths.
const straightArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467"><path d="M67.733332,0 33.866666,59.266668h25.4v76.200002h16.933333l0,-76.200002H101.6Z"/></svg>'
const diagonalArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467"><path d="M135.46666 0L69.611254 17.960661L87.571915 35.920804L0 123.49324L0 135.46666L11.973429 135.46666L99.545861 47.89475L117.506 65.855411L135.46666 0z"/></svg>'
// That one function that creates the tree arrows.
function generateArrow(input) {
    // Gets the arrow parameters.
    const [text, direction, color] = input.split('|')
    // If it's yes or no, put the corresponding color. Otherwise, take the specified color, and if none, put gray.
    let arrowColor = color || (text == "Yes" ? defaultColors[0] : text == "No" ? defaultColors[1] : defaultColors[2])
    // If the arrow's text is smaller than the width (Approximately), make it bigger.
    if (text.length < 6) {
        fontSize = 160
    } else {
        fontSize = 90
    }
    // The possible arrow directions.
    const directions = {
        t: { degrees: 0, path: straightArrow },
        r: { degrees: 90, path: straightArrow },
        b: { degrees: 180, path: straightArrow },
        l: { degrees: 270, path: straightArrow },
        tr: { degrees: 0, path: diagonalArrow },
        br: { degrees: 90, path: diagonalArrow },
        bl: { degrees: 180, path: diagonalArrow },
        tl: { degrees: 270, path: diagonalArrow }
    }
    // If it doesn't work, warn.
    if (!directions[direction]) {
        console.error("Invalid direction.")
        return
    }
    // Gets the corresponding direction instructions.
    const { degrees, path } = directions[direction]
    // Creates an adjusted version of the template paths.
    const adjustedPath = path.replace('<path', `<path fill="${arrowColor}" transform="rotate(${degrees} 67.734 67.734)"`)
    // Gives the cell's content.
    return `<img src="data:image/svg+xml;base64,${btoa(adjustedPath)}"/><div style="position: absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:${fontSize}%;">${text}</div>`
}
// That one big asynchronous function that handles a bunch of stuff.
document.addEventListener("DOMContentLoaded", async function () {
    (async function () {
        try {
            // Gets the trees and the ideologies from the related files.
            const [tree1Response, tree2Response, ideologiesResponse] = await Promise.all([
                fetch("./tree1.html"),
                fetch("./tree2.html"),
                fetch("./ideologies.json")
            ])
            // Injects the HTML from the tree files into the tree section's tree holders.
            tree1.innerHTML = await tree1Response.text()
            tree2.innerHTML = await tree2Response.text()
            // Puts the ideologies in a readily available constant.
            ideologies = await ideologiesResponse.json()
            // Builds the dropdown menu from the ideologies list.
            for (x in ideologies) {
                const option = document.createElement("option")
                option.innerHTML = x
                matches.appendChild(option)
            }
            list = Object.keys(ideologies)
            matches.addEventListener("change", function () {
                if (matches.selectedIndex > 0) {
                    r("tree", matches.options[matches.selectedIndex].text)
                }
            })
            matchesTip.innerText = "All " + list.length + " possible results, alphabetically"
            // Builds the trees.
            document.querySelectorAll("cell").forEach(cell => {
                // Checks what the cell's content is.
                const textWbr = cell.textContent
                const text = textWbr.replace("|", "")
                // Edits the cell depending on what's inside it.
                if (textWbr[0] == "|") { // For if it's an arrow.
                    cell.innerHTML = generateArrow(text)
                    cell.classList.add("arrowCell")
                } else if (list.includes(text)) { // For if it's a flag.
                    cell.style.backgroundImage = `url("./assets/flags/${text}.svg")`
                    cell.classList.add("resultCell")
                    cell.onclick = () => r("tree", text)
                    cell.innerHTML = `<span class="resultCellText">${textWbr.replace("|", "<wbr>")}</span>`
                } else if (text) { // For if it's a question.
                    cell.classList.add("questionCell")
                }
            })
        } catch (error) { // In case it goes wrong.
            console.error("Error fetching resources:", error)
        }
    })()
})
// Function to swap between sections.
function show(section = "home") {
    // By default, scrolls all the way to the top.
    document.documentElement.scrollTop = 0
    for (x of sections) {
        const element = eval(x)
        // If it's the selected one, display it as a block, otherwise, don't display it.
        if (element) element.style.display = x == section ? "block" : "none"
        if (x == section && section == "create") { // Resets the custom results tool if the create section is viewed.
            createMatch.innerText = "Click to change name"
            createFlag.src = "./assets/flags/Drop.svg"
            createQuote.innerText = "Click to change quote"
            createAuthor.innerText = "Click to change author"
            createScreenshot.scrollIntoView({ behavior: "instant" })
        }
    }
}
// Shows the home section to begin with.
show("home")
// Opens or closes the navigation bar.
function navigate() {
    if (navToggled.style.display == "none") { // If it's closed, open it.
        navToggle.src = "./assets/buttons/no.svg"
        navToggled.style.display = "block"
    } else { // If it's opened, close it.
        navToggle.src = "./assets/buttons/navigation.svg"
        navToggled.style.display = "none"
    }
}
// Lets you edit the custom result's text by clicking on it.
function editText(element, type) {
    const newText = prompt("Enter new " + type + ":")
    if (newText != null && newText != "") {
        element.innerText = newText
    }
}
// Handles selecting/dragging files for the custom flag zone.
function customFlag(event = null, isDrop = false) {
    event?.preventDefault()
    // Checks if the file is valid and processes it if so.
    const processFile = file => {
        if (file && file.type.startsWith("image")) {
            const reader = new FileReader()
            reader.onload = x => createFlag.src = x.target.result
            reader.readAsDataURL(file)
        } else { // For morons.
            alert("Please select an image file (SVG, PNG, JPG, etc.).")
        }
    }
    // Handles files dragged over the custom results zone.
    if (isDrop) {
        const imageFile = Array.from(event.dataTransfer.files).find(file => file.type.startsWith("image"))
        return processFile(imageFile)
    }
    // Handles files selected by clicking the custom results zone.
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.addEventListener("change", () => {
        const selectedFile = fileInput.files[0]
        processFile(selectedFile)
        document.body.removeChild(fileInput)
    })
    fileInput.click()
    document.body.appendChild(fileInput)
}
// Makes the custom tool's elements interactive.
createFlag.addEventListener("click", () => customFlag())
createFlag.addEventListener("dragover", event => event.preventDefault())
createFlag.addEventListener("drop", event => customFlag(event, true))
// The q function is used to display quiz questions. Syntax: q(Previous event, Question text, First button text, First button event, Second button text, Second button event, Third button text, Third button event, Fourth button text, Fourth button event, Fifth button text, Fifth button event, Array of button colors, Array of button shadows, Array of button icons)
function q(p = "", q = "Error loading question", b1 = "", n1 = "", b2 = "", n2 = "", b3 = "", n3 = "", b4 = "", n4 = "", b5 = "", n5 = "", c = "", s = "", i = "") {
    // Empties buttons.
    for (x in buttons) {
        buttons[x].style.backgroundColor = defaultColors[x]
        buttons[x].style.boxShadow = `0 .5vmax ${defaultShadowColors[x]}`
        buttons[x].innerHTML = ""
        buttons[x].onclick = ""
    }
    // Lists the order for the text/event pairs.
    bs = [b1, b2, b3, b4, b5]
    ns = [n1, n2, n3, n4, n5]
    // If there is no p (Previous event) to go back to, makes the back button bring you to the home section. Otherwise, makes it bring you to the previous event.
    quizBack.onclick = p
    // Puts the question text in the question spot.
    question.innerText = q
    // Checks whether the buttons are the default Yes/No or something custom, and applies the appropriate color, shadow, icon, text and event to each button.
    if (c != "" && s != "" && i != "") {
        for (x in buttons) {
            if (bs[x] != "") {
                buttons[x].style.backgroundColor = c[x]
                buttons[x].style.boxShadow = `0 .5vmax ${s[x]}`
                buttons[x].innerHTML = `<img src="./assets/buttons/${i[x]}.svg">${bs[x]}`
                buttons[x].onclick = ns[x]
            }
        }
    } else {
        for (x in buttons) {
            if (bs[x] != "") {
                buttons[x].style.backgroundColor = defaultColors[x]
                buttons[x].style.boxShadow = `0 .5vmax ${defaultShadowColors[x]}`
                buttons[x].innerHTML = `<img src="./assets/buttons/${defaultIcons[x]}.svg">${bs[x]}`
                buttons[x].onclick = ns[x]
            }
        }
    }
    // Displays buttons if they contain something and keeps them hidden if empty.
    for (x of buttons) {
        x.style.display = x.innerText ? "flex" : "none"
    }
    // Displays the quiz section.
    show("quiz")
    // Makes sure the whole thing is visible.
    document.documentElement.scrollTop = 0
}
// The s function is used to switch to the previous or next result in the results viewer tool.
function s(ideology) {
    selected = list.indexOf(ideology)
    // Shows the switch buttons.
    lSwitch.style.display = "flex"
    rSwitch.style.display = "flex"
    // Makes the back button bring you back to the tree viewer tool.
    resultsBack.onclick = () => show("tree")
    if (selected > 0) { // If you want to go to the previous result and aren't at the start, go to the previous one.
        lSwitch.onclick = () => r("tree", list[selected - 1])
    } else { // Otherwise, go to the last result of the list.
        lSwitch.onclick = () => r("tree", list[list.length - 1])
    }
    if (selected < list.length - 1) { // If you want to go to the next result and aren't at the end, go to the next one.
        rSwitch.onclick = () => r("tree", list[selected + 1])
    } else { // Otherwise, go to the first result of the list.
        rSwitch.onclick = () => r("tree", list[0])
    }
}
// The r function is used to display a result. Syntax: r(Previous event, Ideology to display)
function r(p, ideology) {
    selectedIdeology = ideology
    // Displays the title.
    match.innerText = ideology
    // Displays the flag
    flag.src = `./assets/flags/${ideology}.svg`
    // Displays the quote, or "No quote" if there isn't any.
    quote.innerText = ideologies[ideology][0] || "No quote"
    // Displays the author, or "No author" if there isn't any.
    author.innerText = ideologies[ideology][1] || "No author"
    if (p === "tree") { // If the result display comes from the tree, turn on the switch buttons.
        s(ideology)
    } else { // Otherwise, don't.
        lSwitch.style.display = rSwitch.style.display = "none"
        resultsBack.onclick = p || (() => show("home"))
    }
    // Shows the results section.
    show("results")
    // Scrolls the page to view the result screenshot zone.
    screenshot.scrollIntoView({ behavior: "instant" })
}
// Allows for site navigation through keyboard inputs.
document.addEventListener("keydown", event => {
    const key = event.key
    // Checks which section is currently being displayed.
    const isVisible = section => section.style.display === "block"
    // If you're in the create, about or tree section and press backspace or zero, you get brought back to the home section.
    if ((isVisible(create) || isVisible(about) || isVisible(tree)) && (key === "Backspace" || key === "0")) {
        show("home")
    } else if (isVisible(home)) { // Otherwise, if the home section is displayed:
        switch (key) {
            // Enter and one brings you to the quiz section.
            case "Enter":
            case "1":
                show("quiz")
                q_privateProperty()
                break
            // Two brings you to the create section.
            case "2":
                show("create")
                break
            // Three brings you to the about section.
            case "3":
                show("about")
                break
            // Four brings you to the tree section.
            case "4":
                show("tree")
                break
        }
    } else if (isVisible(quiz)) { // Otherwise, if the quiz section is displayed:
        if (key === "0" || key === "Backspace") { // Backspace or zero triggers the previous event.
            quizBack.click()
        } else { // Otherwise, numbers one to five triggers their corresponding button's event.
            const buttonMap = { "1": button1, "2": button2, "3": button3, "4": button4, "5": button5 }
            if (buttonMap[key] && buttonMap[key].style.display === "flex") {
                buttonMap[key].click()
            }
        }
    } else if (isVisible(results)) { // Otherwise, if the results section is displayed:
        if (key === "0" || key === "Backspace") { // Zero or backspace triggers the previous event.
            resultsBack.click()
        } else if (lSwitch.style.display === "flex" || rSwitch.style.display === "flex") { // Otherwise, if seen through the results viewer tool, left and right arrow keys switch between previous and next results in the list.
            const selected = list.indexOf(selectedIdeology)
            if (key === "ArrowLeft") {
                r("tree", list[selected > 0 ? selected - 1 : list.length - 1])
            } else if (key === "ArrowRight") {
                r("tree", list[selected < list.length - 1 ? selected + 1 : 0])
            }
        }
    } else if (isVisible(tree) && key === "Enter") {  // Otherwise, if the tree section is displayed, enter shows the first result of the list.
        if (matches.selectedIndex === 0) matches.selectedIndex = 1
        r("tree", matches.options[matches.selectedIndex].text)
    }
})
// Terrible code really.