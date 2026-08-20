// Makes all elements readily available as constants.
function getElements() {
    const handler = {
        get: function (_, prop) {
            return document.getElementById(prop)
        }
    }
    return new Proxy({}, handler)
}
// Lists the site's sections in an array.
const sections = ["home", "quiz", "results", "create", "about", "tree"]
// Lists the quiz's buttons in an array.
const buttons = [button1, button2, button3, button4, button5]
// Lists default button colors in an array.
const defaultColors = ["hsl(120,70%,45%)", "hsl(0,70%,45%)", "hsl(0,0%,25%)", "hsl(0,0%,25%)", "hsl(0,0%,25%)"]
// Lists default button shadow colors in an array.
const defaultShadowColors = ["hsl(120,70%,30%)", "hsl(0,70%,30%)", "hsl(0,0%,17.5%)", "hsl(0,0%,17.5%)", "hsl(0,0%,17.5%)"]
// Lists default button icons in an array.
const defaultIcons = ["yes", "no", "missing", "missing", "missing"]
// Global scope bullshit.
let ideologies, list
selectedIdeology = ""
// Tree arrow paths.
const straightArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467"><path d="M67.733332,0 33.866666,59.266668h25.4v76.200002h16.933333l0,-76.200002H101.6Z"/></svg>'
const diagonalArrow = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.467 135.467"><path d="M135.46666 0L69.611254 17.960661L87.571915 35.920804L0 123.49324L0 135.46666L11.973429 135.46666L99.545861 47.89475L117.506 65.855411L135.46666 0z"/></svg>'
// That one big asynchronous function that handles a bunch of stuff.
document.addEventListener("DOMContentLoaded", async function () {
    (async function () {
        try {
            // Gets the trees and the ideologies from the related files.
            const [ideologiesResponse, colorsResponse, tree1Response, tree2Response] = await Promise.all([
                fetch("./ideologies.json"),
                fetch("./colors.json"),
                fetch("./tree1.txt"),
                fetch("./tree2.txt")
            ])
            // Puts the ideologies in a readily available constant.
            ideologies = await ideologiesResponse.json()
            // Orders the ideologies alphabetically.
            ideologies = Object.fromEntries(Object.entries(ideologies).sort((a, b) => a[0].localeCompare(b[0])))
            // Puts the colors in a readily available constant.
            colors = await colorsResponse.json()
            // Builds the flag explanations and the dropdown menu from the ideologies list.
            letters = []
            groupLetters = []
            for (x in ideologies) {
                // Fixes the ideology data if whoever made the file is incompetent.
                while (ideologies[x].length < 4) {
                    ideologies[x].push("")
                }
                // Creates the list elements.
                const flagExplanation = document.createElement("div")
                const letterAnchor = document.createElement("div")
                // Flag explanation index.
                letter = x.charAt(0)
                groupLetter = ideologies[x][3].charAt(0)
                // Ideology letters.
                if (!letters.includes(letter)) {
                    letters.push(letter)
                    letterAnchor.classList.add("anchor")
                    letterAnchor.id = letter
                    const letterDiv = document.createElement("a")
                    letterDiv.setAttribute("href", "#" + letter)
                    letterDiv.classList.add("letter")
                    letterDiv.innerHTML = letter
                    flagLetters.append(letterDiv)
                    flagExplanation.appendChild(letterAnchor)
                }
                // Group letters.
                if (!groupLetters.includes(groupLetter)) {
                    groupLetters.push(groupLetter)
                    const letterDiv = document.createElement("a")
                    letterDiv.setAttribute("href", "#group" + groupLetter)
                    letterDiv.classList.add("letter")
                    letterDiv.innerHTML = groupLetter
                    flagGroupLetters.append(letterDiv)
                }
                // Alphabetical sorting of group letters.
                const groupLetterElements = Array.from(flagGroupLetters.children)
                groupLetterElements.sort((a, b) => a.textContent.localeCompare(b.textContent))
                groupLetterElements.forEach(groupLetterElement => flagGroupLetters.appendChild(groupLetterElement))
                flagExplanation.classList.add("flagExplanation")
                // Building the explanation's flag.
                const flagExplanationImage = document.createElement("img")
                flagExplanationImage.src = `./assets/flags/${x}.svg`
                flagExplanationImage.onerror = function () {
                    this.src = `./assets/flags/Missing.svg`
                    this.onerror = null
                }
                flagExplanationImage.onclick = (function (ideology) {
                    return () => r("about", ideology)
                }(x))
                const imageDiv = document.createElement("div")
                imageDiv.classList.add("imageDiv")
                imageDiv.appendChild(flagExplanationImage)
                // Building the explanation's text.
                const textDiv = document.createElement("div")
                textDiv.classList.add("textDiv")
                const [, , description, subtitle] = ideologies[x]
                textDiv.innerHTML = `<p class="explanationTitle">${x}${subtitle ? ` (${subtitle})` : ''}</p><p>${description || 'No flag explanation.'}</p>`
                // Building the explanation.
                flagExplanation.append(imageDiv, textDiv)
                flagExplanationsList.appendChild(flagExplanation)
                // Dropdown menu.
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
            amount.innerText = list.length
            // Builds the trees.
            const tree1Width = 11
            const tree1Height = 14
            const tree2Width = 9
            const tree2Height = 12
            const getWidthRatio = cols => cols * 1.725 + (cols - 1) * 0.75
            const getHeightRatio = rows => rows * 1.15 + (rows - 1) * 0.75
            tree1.style.gridTemplateColumns = `repeat(${tree1Width - 1}, 1.725fr .75fr) 1.725fr`
            tree1.style.gridTemplateRows = `repeat(${tree1Height - 1}, 1.15fr .75fr) 1.15fr`
            tree1.style.aspectRatio = `${getWidthRatio(tree1Width)} / ${getHeightRatio(tree1Height)}`
            tree2.style.gridTemplateColumns = `repeat(${tree2Width - 1}, 1.725fr .75fr) 1.725fr`
            tree2.style.gridTemplateRows = `repeat(${tree2Height - 1}, 1.15fr .75fr) 1.15fr`
            tree2.style.aspectRatio = `${getWidthRatio(tree2Width)} / ${getHeightRatio(tree2Height)}`
            function getArrowData(functionName) {
                const source = window[functionName].toString()
                const arrayMatch = source.match(/q\([^,]+,\s*"[^"]*",\s*(\[[\s\S]*?\]),\s*"[^"]*"/)
                let colors = defaultColors
                if (arrayMatch && arrayMatch[1] != "[]") {
                    colors = [...arrayMatch[1].matchAll(/"([^"]+)"/g)].map(match => match[1])
                }
                const labels = [...source.matchAll(/"([^"]+)"\s*,\s*(?:\(\)\s*=>|q_)/g)].map(match => match[1])
                if (arrayMatch?.[1] == "[]" || !arrayMatch) {
                    if (labels.length > 0) {
                        labels[0] = "Yes"
                    }
                    if (labels.length > 1) {
                        labels[1] = "No"
                    }
                }
                return { labels, colors }
            }
            function generateArrow(input) {
                const [text, direction, color] = input.split("|")
                let arrowColor = color || (text == "Yes" ? defaultColors[0] : text == "No" ? defaultColors[1] : defaultColors[2])
                if (text.length < 4) {
                    fontSize = 175
                } else if (text.length < 6) {
                    fontSize = 150
                } else if (text.length < 10) {
                    fontSize = 90
                } else {
                    fontSize = 65
                }
                const directions = { t: { degrees: 0, path: straightArrow }, r: { degrees: 90, path: straightArrow }, b: { degrees: 180, path: straightArrow }, l: { degrees: 270, path: straightArrow }, tr: { degrees: 0, path: diagonalArrow }, br: { degrees: 90, path: diagonalArrow }, bl: { degrees: 180, path: diagonalArrow }, tl: { degrees: 270, path: diagonalArrow } }
                const { degrees, path } = directions[direction]
                const adjustedPath = path.replace("<path", `<path fill="${arrowColor}" transform="rotate(${degrees} 67.734 67.734)"`)
                return `<img src="data:image/svg+xml;base64,${btoa(adjustedPath)}"/><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:${fontSize}%;">${text}</div>`
            }
            function addArrow(layer, row, column, direction, text, color) {
                const arrowCell = document.createElement("div")
                arrowCell.classList.add("arrowCell")
                arrowCell.style.gridRow = row
                arrowCell.style.gridColumn = column
                arrowCell.innerHTML = generateArrow(`${text}|${direction}|${color}`)
                layer.appendChild(arrowCell)
            }
            const buildTree = async (element, response) => {
                const rows = (await response.text()).trimEnd().split("\n").map(row => row.replace(/\r$/, "").split(";"))
                element.innerHTML = ""
                const arrowLayer = document.createElement("div")
                arrowLayer.classList.add("arrowLayer")
                arrowLayer.style.position = "absolute"
                arrowLayer.style.inset = "0"
                arrowLayer.style.display = "grid"
                arrowLayer.style.gridTemplateColumns = getComputedStyle(element).gridTemplateColumns
                arrowLayer.style.gridTemplateRows = getComputedStyle(element).gridTemplateRows
                arrowLayer.style.pointerEvents = "none"
                element.style.position = "relative"
                const cells = []
                for (let row = 0; row < rows.length; row++) {
                    cells[row] = []
                    for (let column = 0; column < rows[row].length; column++) {
                        let value = rows[row][column]
                        const cell = document.createElement("div")
                        cell.style.gridRow = row * 2 + 1
                        cell.style.gridColumn = column * 2 + 1
                        if (value[0] == "*") {
                            value = value.slice(1)
                            cell.classList.add("startCell")
                        }
                        value = value.replace(/\r$/, "")
                        if (value.startsWith("q_")) {
                            const [functionName, arrowDirections = ""] = value.split("|")
                            const questionFunction = window[functionName]
                            const match = questionFunction.toString().match(/q\([^,]+,\s*"((?:[^"\\]|\\.)*)"/)
                            const questionText = match ? match[1].replace(/\\"/g, '"') : null
                            cell.classList.add("questionCell")
                            cell.innerHTML = questionText
                            cell.onclick = () => questionFunction()
                            cell.title = functionName
                            cells[row][column] = { cell, functionName, arrowDirections }
                        } else if (list.includes(value)) {
                            cell.style.backgroundImage = `url("./assets/flags/${value}.svg")`
                            cell.classList.add("resultCell")
                            cell.onclick = () => r("tree", value)
                            cell.title = ideologies[value]?.[3] ?? "No category"
                            cell.innerHTML = `<span class="resultCellText">${value.slice(0, ideologies[value][4])}<wbr>${value.slice(ideologies[value][4])}</span>`
                            cells[row][column] = { cell, functionName: null, arrowDirections: "" }
                        } else {
                            cells[row][column] = null
                            continue
                        }
                        cell.classList.add("cell")
                        element.appendChild(cell)
                    }
                }
                const arrowPositions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
                const directionNames = ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                for (let row = 0; row < cells.length; row++) {
                    for (let column = 0; column < cells[row].length; column++) {
                        const node = cells[row][column]
                        if (!node?.arrowDirections) { continue }
                        const { labels, colors } = getArrowData(node.functionName)
                        for (let i = 0; i < node.arrowDirections.length; i++) {
                            const directionNumber = Number(node.arrowDirections[i])
                            const direction = directionNames[directionNumber]
                            const [rowOffset, columnOffset] = arrowPositions[directionNumber]
                            const arrowRow = row * 2 + 1 + rowOffset
                            const arrowColumn = column * 2 + 1 + columnOffset
                            addArrow(arrowLayer, arrowRow, arrowColumn, direction, labels[i], colors[i])
                        }
                    }
                }
                element.appendChild(arrowLayer)
            }
            await Promise.all([
                buildTree(tree1, tree1Response),
                buildTree(tree2, tree2Response)
            ])
            // Builds the color palette.
            for (x in colors) {
                const paletteCell = document.createElement("div")
                paletteCell.classList.add("paletteCell")
                paletteCell.innerHTML = `<div>${x}</div><div>${colors[x]}</div>`
                paletteCell.style.backgroundColor = "#" + colors[x]
                flagColors.append(paletteCell)
            }
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
// Function to swap between sections of the About section.
function showAbout(section = 1) {
    if (section == 1) {
        aboutSection1.style.display = "block"
        aboutSection2.style.display = "none"
        aboutSection3.style.display = "none"
    } else if (section == 2) {
        aboutSection1.style.display = "none"
        aboutSection2.style.display = "block"
        aboutSection3.style.display = "none"
    } else if (section == 3) {
        aboutSection1.style.display = "none"
        aboutSection2.style.display = "none"
        aboutSection3.style.display = "block"
    }
}
// Shows the "What is ideosorter?" section to begin with.
showAbout(1)
// Makes the word "neocameralism" show the corresponding ideology.
neocameralismFakeLink.addEventListener("click", function (event) {
    event.preventDefault()
    r("about", "Neocameralism")
})
// Opens or closes the navigation bar.
function navigate() {
    if (navToggled.style.display == "none") { // If it's closed, open it.
        navToggle.src = "./assets/buttons/no.svg"
        navToggle.title = "Hide navigation tools"
        navToggled.style.display = "block"
    } else { // If it's opened, close it.
        navToggle.src = "./assets/buttons/navigation.svg"
        navToggle.title = "Show navigation tools"
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
        if (selectedFile) {
            processFile(selectedFile)
        }
    })
    fileInput.click()
}
// Makes the custom tool's elements interactive.
createFlag.addEventListener("click", () => customFlag())
createFlag.addEventListener("dragover", event => event.preventDefault())
createFlag.addEventListener("drop", event => customFlag(event, true))
// The q function is used to display quiz questions. Syntax: q(Previous event, Question text, [[Colors], [Shadows], [Icons]], Button 1 text, Button 1 event, Button 2 text, Button 2 event, Button 3 text, Button 3 event, Button 4 text, Button 4 event, Button 5 text, Button 5 event).
function q(p = "", q = "Error loading question", options = [], b1 = "", n1 = "", b2 = "", n2 = "", b3 = "", n3 = "", b4 = "", n4 = "", b5 = "", n5 = "") {
    // Empties buttons.
    for (let x in buttons) {
        buttons[x].style.backgroundColor = defaultColors[x]
        buttons[x].style.boxShadow = `0 .5vmax ${defaultShadowColors[x]}`
        buttons[x].innerHTML = ""
        buttons[x].onclick = ""
    }
    // Lists the order for the text/event pairs.
    let bs = [b1, b2, b3, b4, b5]
    let ns = [n1, n2, n3, n4, n5]
    // Parses styling options if provided.
    let colors = options[0] || []
    let shadows = options[1] || []
    let icons = options[2] || []
    let hasCustomOptions = options.length > 0
    // If there is no p (Previous event) to go back to, makes the back button bring you to the home section. Otherwise, makes it bring you to the previous event.
    quizBack.onclick = p
    // Puts the question text in the question spot.
    question.innerText = q
    // Checks whether custom options are provided, and applies the appropriate color, shadow, icon, text and event to each button.
    for (let x in buttons) {
        if (bs[x] !== "") {
            buttons[x].style.backgroundColor = (hasCustomOptions && colors[x]) || defaultColors[x]
            buttons[x].style.boxShadow = `0 .5vmax ${(hasCustomOptions && shadows[x]) || defaultShadowColors[x]}`
            buttons[x].innerHTML = `<img src="./assets/buttons/${(hasCustomOptions && icons[x]) || defaultIcons[x]}.svg" onerror="this.onerror=null;this.src='./assets/buttons/missing.svg'">${bs[x]}`
            buttons[x].onclick = ns[x]
        }
    }
    // Displays buttons if they contain something and keeps them hidden if empty.
    for (let x of buttons) {
        x.style.display = x.innerText ? "flex" : "none"
    }
    // Displays the quiz section.
    show("quiz")
    // Makes sure the whole thing is visible.
    document.documentElement.scrollTop = 0
}
// The s function is used to switch to the previous or next result in the results viewer tool.
function s(p, ideology) {
    selected = list.indexOf(ideology)
    // Shows the switch buttons.
    lSwitch.style.display = "flex"
    rSwitch.style.display = "flex"
    if (selected > 0) { // If you want to go to the previous result and aren't at the start, go to the previous one.
        lSwitch.onclick = () => r(p, list[selected - 1])
    } else { // Otherwise, go to the last result of the list.
        lSwitch.onclick = () => r(p, list[list.length - 1])
    }
    if (selected < list.length - 1) { // If you want to go to the next result and aren't at the end, go to the next one.
        rSwitch.onclick = () => r(p, list[selected + 1])
    } else { // Otherwise, go to the first result of the list.
        rSwitch.onclick = () => r(p, list[0])
    }
}
// The r function is used to display a result. Syntax: r(Previous event, Ideology to display).
function r(p, ideology) {
    selectedIdeology = ideology
    // Displays the title.
    match.innerText = ideology
    // Displays the flag.
    flag.src = `./assets/flags/${ideology}.svg`
    flag.onerror = function () {
        this.src = `./assets/flags/Missing.svg`
        this.onerror = null
    }
    // Displays the quote, or "No quote" if there isn't any.
    quote.innerText = ideologies[ideology][0] || "No quote"
    // Displays the author, or "No author" if there isn't any.
    author.innerText = ideologies[ideology][1] || "No author"
    if (p === "about" || p === "tree") { // If the result display comes from the about or the tree, turn on the switch buttons.
        s(p, ideology)
        // Makes the back button bring you back to the section you came from.
        resultsBack.onclick = () => show(p)
    } else { // Otherwise, don't.
        lSwitch.style.display = rSwitch.style.display = "none"
        resultsBack.onclick = p || (() => show("home"))
    }
    // Shows the results section.
    show("results")
    // Scrolls the page to view the result screenshot zone.
    screenshot.scrollIntoView({ behavior: "instant" })
}
// Handles displaying and hiding the flag explanations.
function toggleView(elementId, button) {
    const element = document.getElementById(elementId)
    const buttonText = button.textContent
    if (buttonText === "Show") {
        button.innerHTML = `<img src="./assets/buttons/hide.svg">Hide`
        element.style.display = "flex"
    } else if (buttonText === "Hide") {
        button.innerHTML = `<img src="./assets/buttons/show.svg">Show`
        element.style.display = "none"
    }
}
// Handles toggling the sort type of the flag explanations.
function toggleExplanationSort(button) {
    const buttonText = button.textContent
    if (buttonText === "Sort by ideology") {
        button.innerHTML = `<img src="./assets/buttons/group.svg">Sort by group`
        flagLetters.style.display = "flex"
        flagGroupLetters.style.display = "none"
        const items = Array.from(flagExplanationsList.querySelectorAll('.flagExplanation'))
        items.sort((a, b) => {
            const titleA = a.querySelector('.explanationTitle')?.textContent || ''
            const titleB = b.querySelector('.explanationTitle')?.textContent || ''
            const firstPartA = titleA.split('(')[0].trim()
            const firstPartB = titleB.split('(')[0].trim()
            return firstPartA.localeCompare(firstPartB)
        })
        items.forEach(item => flagExplanationsList.appendChild(item))
    } else if (buttonText === "Sort by group") {
        button.innerHTML = `<img src="./assets/buttons/ideology.svg">Sort by ideology`
        flagLetters.style.display = "none"
        flagGroupLetters.style.display = "flex"
        const items = Array.from(flagExplanationsList.querySelectorAll('.flagExplanation'))
        items.sort((a, b) => {
            const titleA = a.querySelector('.explanationTitle')?.textContent || ''
            const titleB = b.querySelector('.explanationTitle')?.textContent || ''
            const parenthesisMatchA = titleA.match(/\(([^)]+)\)/)
            const parenthesisMatchB = titleB.match(/\(([^)]+)\)/)
            const secondPartA = parenthesisMatchA ? parenthesisMatchA[1].trim() : ''
            const secondPartB = parenthesisMatchB ? parenthesisMatchB[1].trim() : ''
            return secondPartA.localeCompare(secondPartB)
        })
        items.forEach(item => flagExplanationsList.appendChild(item))
        // Removes old group anchors.
        document.querySelectorAll(".groupAnchor").forEach(anchor => anchor.remove())
        const usedGroupLetters = []
        items.forEach(item => {
            const title = item.querySelector('.explanationTitle')?.textContent || ''
            const match = title.match(/\(([^)]+)\)/)
            if (!match) return
            const groupLetter = match[1].trim().charAt(0)
            if (!usedGroupLetters.includes(groupLetter)) {
                usedGroupLetters.push(groupLetter)
                const anchor = document.createElement("div")
                anchor.classList.add("anchor", "groupAnchor")
                anchor.id = "group" + groupLetter
                item.prepend(anchor)
            }
        })
    }
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
    } else if (isVisible(about) && key === "Enter") {  // Otherwise, if the about section is displayed, enter shows the flag explanations.
        toggleView('flagExplanations', flagExplanationsButton)
    } else if (isVisible(tree) && key === "Enter") {  // Otherwise, if the tree section is displayed, enter shows the first result of the list.
        if (matches.selectedIndex === 0) matches.selectedIndex = 1
        r("tree", matches.options[matches.selectedIndex].text)
    }
})
// Terrible code really.