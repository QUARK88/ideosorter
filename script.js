function DomProxy() {
    const handler = {
        get: function (_, prop) {
            return document.getElementById(prop)
        }
    }
    return new Proxy({}, handler)
}
const { home,
    quiz,
    question,
    button1,
    button2,
    button3,
    button4,
    button5,
    quizBack,
    results,
    match,
    flag,
    quote,
    resultsBack,
    custom,
    customMatch,
    customFlag,
    customQuote,
    tree } = DomProxy()
const sections = [home, quiz, results, custom, tree]
const buttons = [button1, button2, button3, button4, button5]
const defaultColors = ["#20c020", "#c02020", "#404040", "#404040", "#404040"]
const defaultBackgroundColors = ["#008000", "#800000", "#303030", "#303030", "#303030"]
const defaultIcons = ["yes", "no", "none", "none", "none"]
async function fetchData() {
    try {
        const response = await fetch("./ideologies.json")
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}
let ideologies
(async () => {
    ideologies = await fetchData()
})()
function show(section = home) {
    document.documentElement.scrollTop = 0
    for (i of sections) {
        if (i == section) {
            i.style.display = "block"
            if (section == custom) {
                customMatch.innerText = "Click to change ideology"
                customFlag.src = "./assets/flags/Drop.svg"
                customQuote.innerText = "Click to change quote"
                customAuthor.innerText = "Click to change author"
                customMatch.scrollIntoView({ behavior: "auto" })
            }
        } else {
            i.style.display = "none"
        }
    }
}
show(home)
function editText(element) {
    const newText = prompt("Enter new text:")
    if (newText != "") {
        element.innerText = newText
    }
}
function selectFile() {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.addEventListener("change", function () {
        const selectedFile = this.files[0]
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = function (e) {
                const imageUrl = e.target.result
                customFlag.src = imageUrl
            };
            reader.readAsDataURL(selectedFile)
        } else {
            alert("Please select an image file (SVG, PNG, JPG, etc.).")
        }
        document.body.removeChild(fileInput)
    })
    fileInput.click()
    document.body.appendChild(fileInput)
}
function dragOverHandler(event) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
}
function dropHandler(event) {
    event.preventDefault()
    const files = event.dataTransfer.files
    const imageFile = Array.from(files).find(file => file.type.startsWith("image"))
    if (imageFile) {
        const reader = new FileReader()
        reader.onload = function (e) {
            const imageUrl = e.target.result;
            document.getElementById("customFlag").src = imageUrl
        }
        reader.readAsDataURL(imageFile)
    } else {
        alert("Please drop an image file (SVG, PNG, JPG, etc.).")
    }
}
function q(p = "", q = "Loading...", b1 = "", n1 = "", b2 = "", n2 = "", b3 = "", n3 = "", b4 = "", n4 = "", b5 = "", n5 = "", c = "", s = "", i = "") {
    quiz.style.display = "block"
    results.style.display = "none"
    for (x of buttons) {
        x.innerText = ""
    }
    if (i == "") {
        for (let x in buttons) {
            buttons[x].innerHTML = `<span><img src="./assets/buttons/${defaultIcons[x]}.svg"></span>`
        }
    } else {
        for (let x in i) {
            buttons[x].innerHTML = `<span><img src="./assets/buttons/${i[x]}.svg"></span>`
        }
    }
    question.innerText = q
    button1.innerHTML += b1
    button1.onclick = n1
    button2.innerHTML += b2
    button2.onclick = n2
    button3.innerHTML += b3
    button3.onclick = n3
    button4.innerHTML += b4
    button4.onclick = n4
    button5.innerHTML += b5
    button5.onclick = n5
    if (p == "") {
        quizBack.onclick = () => show(home)
    } else {
        quizBack.onclick = p
    }
    if (c === "") {
        for (let x in buttons) {
            buttons[x].style.backgroundColor = defaultColors[x]
        }
    } else {
        for (let x in c) {
            buttons[x].style.backgroundColor = c[x]
        }
    }
    if (s === "") {
        for (let x in buttons) {
            buttons[x].style.boxShadow = `0 0.5vmax ${defaultBackgroundColors[x]}`
        }
    } else {
        for (let x in s) {
            buttons[x].style.boxShadow = `0 0.5vmax ${s[x]}`
        }
    }
    for (let x of buttons) {
        x.style.display = x.innerText ? "flex" : "none"
    }
    document.documentElement.scrollTop = 0
}
async function r(p, ideology) {
    if (ideology != "") {
        match.innerText = ideology
        flag.src = "./assets/flags/" + ideology + ".svg"
    } else {
        match.innerText = "No ideology"
        flag.src = "./assets/flags/null.svg"
    }
    if (ideologies[ideology][0] != "") {
        quote.innerText = ideologies[ideology][0]
    } else {
        quote.innerText = "No quote"
    }
    if (ideologies[ideology][1] != "") {
        author.innerText = ideologies[ideology][1]
    } else {
        author.innerText = "No author"
    }
    if (p) {
        resultsBack.onclick = p
    } else {
        resultsBack.onclick = () => show(home)
    }
    show(results)
    match.scrollIntoView({ behavior: "auto" })
}
function q_privateProperty() {
    q("", "Should private property exist?", "Yes", q_constitution, "No", q_markets)
}
function q_constitution() {
    q(q_privateProperty, "Should a constitution limit the government's scope?", "Yes", q_minarchy, "No", q_stateFunctions, "The state should not exist", q_counterEcon, "", "", "", "", ["#20c020", "#c02020", "#802080"], ["#008000", "#800000", "#600060"], ["yes", "no", "nostate"])
}
function q_minarchy() {
    q(q_constitution, "Should the role of the state be limited to law enforcement and defense?", "Yes", () => r(q_minarchy, "Minarchism"), "No", q_distBert)
}
function q_distBert() {
    q(q_minarchy, "Should private property be made as widely owned as possible?", "Yes", () => r(q_distBert, "Libertarian distributism"), "No", q_singleTax)
}
function q_singleTax() {
    q(q_distBert, "Should the only tax be a levy on public resource usage?", "Yes", () => r(q_singleTax, "Geolibertarianism"), "No", q_disadvantaged)
}
function q_disadvantaged() {
    q(q_singleTax, "Should the disadvantaged be helped?", "Yes", q_bertWelfare, "No", q_bertWar)
}
function q_bertWelfare() {
    q(q_disadvantaged, "Should there be welfare programs in place?", "Yes", () => r(q_bertWelfare, "Social libertarianism"), "No", () => r(q_bertWelfare, "Bleeding-heart libertarianism"))
}
function q_bertWar() {
    q(q_disadvantaged, "Should liberty be spread around the globe by force?", "Yes", () => r(q_bertWar, "Neo-libertarianism"), "No", q_bertTrad)
}
function q_bertTrad() {
    q(q_bertWar, "Will a smaller government cause a return to traditional values?", "Yes", () => r(q_bertTrad, "Paleolibertarianism"), "No", () => r(q_bertTrad, "Right-libertarianism"))
}
function q_counterEcon() {
    q(q_constitution, "Should black markets be used to push change?", "Yes", q_redMarket, "No", q_anDist)
}
function q_redMarket() {
    q(q_counterEcon, "Should coercive markets be allowed?", "Yes", () => r(q_redMarket, "Avaritionism"), "No", () => r(q_redMarket, "Agorism"))
}
function q_anDist() {
    q(q_counterEcon, "Should private property be made as widely owned as possible?", "Yes", () => r(q_anDist, "Anarcho-distributism"), "No", q_landRent)
}
function q_landRent() {
    q(q_anDist, "Is earning rent from the land a form of theft?", "Yes", () => r(q_landRent, "Geo-anarchism"), "No", q_coop)
}
function q_coop() {
    q(q_landRent, "Will cooperatives dominate the free market?", "Yes", () => r(q_coop, "Left-rothbardianism"), "No", q_covenant)
}
function q_covenant() {
    q(q_coop, "Will covenant communities revive traditional norms?", "Yes", () => r(q_covenant, "Hoppeanism"), "No", () => r(q_covenant, "Anarcho-capitalism"))
}
function q_stateFunctions() {
    q(q_constitution, "Who should assume state functions?", "Elected Officials", q_dist, "Strongman", q_total, "Sovereign", q_sovereignType, "", "", "", "", ["#2060e0", "#c02040", "#c0a020"], ["#2040a0", "#802020", "#806020"], ["elected officials", "strongman", "sovereign"])
}
function q_dist() {
    q(q_stateFunctions, "Should private property be made as widely owned as possible?", "Yes", q_distNeeds, "No", q_lvt)
}
function q_distNeeds() {
    q(q_dist, "Should people's needs be met unconditionally?", "Yes", () => r(q_distNeeds, "Social distributism"), "No", () => r(q_distNeeds, "Distributism"))
}
function q_lvt() {
    q(q_dist, "Should land rents be repaid to society?", "Yes", q_geoWelf, "No", q_trad)
}
function q_geoWelf() {
    q(q_lvt, "Should the revenue from the land rents be spent on welfare?", "Yes", () => r(q_geoWelf, "Social georgism"), "No", () => r(q_geoWelf, "Georgism"))
}
function q_trad() {
    q(q_lvt, "Should traditional values be promoted?", "Yes", q_safetyNet, "No", q_needs)
}
function q_safetyNet() {
    q(q_trad, "Should a social safety net protect the poor?", "Yes", () => r(q_safetyNet, "Paternalistic conservatism"), "No", q_conIntervention)
}
function q_conIntervention() {
    q(q_safetyNet, "Should the government intervene in wars overseas?", "Yes", () => r(q_conIntervention, "Mesoconservatism"), "No", () => r(q_conIntervention, "Paleoconservatism"))
}
function q_needs() {
    q(q_trad, "Should people's needs be met unconditionally?", "Yes", () => r(q_needs, "Social democracy"), "No", q_regulation)
}
function q_regulation() {
    q(q_needs, "Should the economy be tightly regulated?", "Yes", q_bigBusiness, "No", q_hegemony)
}
function q_bigBusiness() {
    q(q_regulation, "Should big businesses have more social responsibilites?", "Yes", () => r(q_bigBusiness, "Ordoliberalism"), "No", () => r(q_bigBusiness, "Social liberalism"))
}
function q_hegemony() {
    q(q_regulation, "Which gives the most power globally?", "Trade", () => r(q_hegemony, "Neoliberalism"), "Military", () => r(q_hegemony, "Neoconservatism"), "", "", "", "", "", "", ["#c00020", "#0020a0"], ["#800000", "#000080"], ["trade", "military"])
}
function q_total() {
    q(q_stateFunctions, "Should the state have a role in all aspects of society?", "Yes", q_racism, "No", q_corpo)
}
function q_racism() {
    q(q_total, "Should we be devoted to a race superior to all others?", "Yes", q_raceLarp, "No", q_palingenesis)
}
function q_raceLarp() {
    q(q_racism, "What gives that race such superiority?", "Biology", () => r(q_raceLarp, "National socialism"), "Spirits", () => r(q_raceLarp, "Esoteric fascism"), "", "", "", "", "", "", ["#20a0a0", "#a02080"], ["#006060", "#800060"], ["biology", "spirits"])
}
function q_palingenesis() {
    q(q_racism, "Should we secure the nation through a rebirth or revival?", "Yes", q_fashClergy, "No", q_castes)
}
function q_fashClergy() {
    q(q_palingenesis, "Should the clergy be part of the government?", "Yes", () => r(q_fashClergy, "Clerical fascism"), "No", () => r(q_fashClergy, "Fascism"))
}
function q_castes() {
    q(q_palingenesis, "Should a system of castes be in place?", "Yes", q_control, "No", () => r(q_castes, "Jacobinism"))
}
function q_control() {
    q(q_castes, "How should control over society be ensured?", "Apathy", () => r(q_control, "Fordism"), "Terror", () => r(q_control, "Orwellianism"), "", "", "", "", "", "", ["#e060c0", "#c00000"], ["#c040a0", "#800000"], ["apathy", "terror"])
}
function q_corpo() {
    q(q_total, "Should profession groups partake in policy making?", "Yes", () => r(q_corpo, "State corporatism"), "No", q_soe)
}
function q_soe() {
    q(q_corpo, "Should the state get involved in the allocation of capital?", "Yes", () => r(q_soe, "State capitalism"), "No", () => r(q_soe, "Autocratic capitalism"))
}
function q_sovereignType() {
    q(q_stateFunctions, "Where should the sovereign's legitimacy come from?", "Inheritance", () => r(q_sovereignType, "Absolute monarchy"), "Wisdom", () => r(q_sovereignType, "Noocracy"), "God", () => r(q_sovereignType, "Theocracy"), "Enterprise", () => r(q_sovereignType, "Neocameralism"), "Strength", q_weak, ["#4060c0", "#a0c020", "#8000a0", "#ffc000", "#c00000"], ["#0040a0", "#608000", "#600080", "#e08000", "#800000"], ["inheritance", "wisdom", "god", "enterprise", "strength"])
}
function q_weak() {
    q(q_sovereignType, "Should the weak be subjugated?", "Yes", () => r(q_weak, "Kraterocracy"), "No", () => r(q_weak, "Combatocracy"))
}
function q_markets() {
    q(q_privateProperty, "Should markets allocate resources?", "Yes", q_titoism, "No", q_communism)
}
function q_titoism() {
    q(q_markets, "Should an authoritarian state protect the workers?", "Yes", () => r(q_titoism, "Titoism"), "No", q_guilds, "The state should not exist", q_mutual, "", "", "", "", ["#20c020", "#c02020", "#802080"], ["#008000", "#800000", "#600060"], ["yes", "no", "nostate"])
}
function q_guilds() {
    q(q_titoism, "Should public services be competitive?", "Yes", () => r(q_guilds, "Market socialism"), "No", () => r(q_guilds, "Guild socialism"))
}
function q_mutual() {
    q(q_titoism, "Should the economy be based on mutual credit?", "Yes", q_ethnic, "No", () => r(q_mutual, "Market anarchism"))
}
function q_ethnic() {
    q(q_mutual, "Should communities be ethnically homogenous?", "Yes", () => r(q_ethnic, "National anarchism"), "No", () => r(q_ethnic, "Mutualism"))
}
function q_communism() {
    q(q_markets, "Should we reach a classless, stateless, moneyless society?", "Yes", q_commieState, "No", q_experts)
}
function q_commieState() {
    q(q_communism, "Is a transitory state required for this?", "Yes", q_demCent, "No", q_communization)
}
function q_demCent() {
    q(q_commieState, "Should proletarian organization be based on democratic centralism?", "Yes", q_oneCountrySoc, "No", q_party)
}
function q_oneCountrySoc() {
    q(q_demCent, "Is socialism possible in a single country?", "Yes", q_socCommodity, "No", () => r(q_oneCountrySoc, "Trotskyism"))
}
function q_socCommodity() {
    q(q_oneCountrySoc, "Should commodity production occur under socialism?", "Yes", q_peopleWar, "No", () => r(q_socCommodity, "Bukharinism"))
}
function q_peopleWar() {
    q(q_socCommodity, "Should the old society be overthrown through protracted guerrilla warfare?", "Yes", q_universalPPW, "No", q_natCom)
}
function q_universalPPW() {
    q(q_peopleWar, "Are these tactics applicable across all countries?", "Yes", () => r(q_universalPPW, "Marxism-leninism-maoism"), "No", q_laborAristocracy)
}
function q_laborAristocracy() {
    q(q_universalPPW, "Is the first world working class an anti-revolutionary one?", "Yes", () => r(q_laborAristocracy, "Maoism-third-worldism"), "No", () => r(q_laborAristocracy, "Maoism"))
}
function q_natCom() {
    q(q_peopleWar, "Should the main priority of communists be the liberation of the nation?", "Yes", () => r(q_natCom, "National communism"), "No", () => r(q_natCom, "Marxism-leninism"))
}
function q_party() {
    q(q_demCent, "Should there be a vanguard party to lead the working class?", "Yes", q_parliament, "No", q_commodity)
}
function q_parliament() {
    q(q_party, "Should communists participate strategically in parliamentary politics?", "Yes", q_reform, "No", q_partyDict)
}
function q_reform() {
    q(q_parliament, "Should we reform capitalism on the short term?", "Yes", () => r(q_reform, "Classical social democracy"), "No", () => r(q_reform, "De leonism"))
}
function q_partyDict() {
    q(q_reform, "Will the dictatorship of the proletariat be the dictatorship of the party?", "Yes", q_natLib, "No", () => r(q_partyDict, "Council communism"))
}
function q_natLib() {
    q(q_partyDict, "Should communists support national liberation?", "Yes", () => r(q_natLib, "Damenism"), "No", q_nature)
}
function q_nature() {
    q(q_natLib, "Is an exit back into nature our only option to escape capitalism?", "Yes", () => r(q_nature, "Camattism"), "No", () => r(q_nature, "Bordigism"))
}
function q_commodity() {
    q(q_party, "Should proletarian revolution be that of everyday life?", "Yes", () => r(q_commodity, "Situationism"), "No", () => r(q_commodity, "Libertarian marxism"))
}
function q_communization() {
    q(q_commieState, "Should capitalist relations be socialized through armed insurrection?", "Yes", () => r(q_communization, "Communization"), "No", q_vouchers)
}
function q_vouchers() {
    q(q_communization, "Should labor vouchers be given in exchange for work?", "Yes", () => r(q_vouchers, "Anarcho-collectivism"), "No", q_agriculture)
}
function q_agriculture() {
    q(q_vouchers, "Should agriculture be practiced?", "Yes", q_anarchoUnions, "No", () => r(q_agriculture, "Anarcho-primitivism"))
}
function q_anarchoUnions() {
    q(q_agriculture, "Should society be organized through unions?", "Yes", q_myth, "No", q_bookchin)
}
function q_myth() {
    q(q_anarchoUnions, "Should we adopt the myth of our victory as our movement's unifier?", "Yes", () => r(q_myth, "Sorelianism"), "No", () => r(q_myth, "Anarcho-syndicalism"))
}
function q_bookchin() {
    q(q_anarchoUnions, "Should the state be opposed through local direct democracy?", "Yes", () => r(q_bookchin, "Libertarian municipalism"), "No", () => r(q_bookchin, "Anarcho-communism"))
}
function q_experts() {
    q(q_communism, "Should an expert committee optimize distribution to eliminate scarcity?", "Yes", () => r(q_experts, "Technocracy"), "No", q_transition)
}
function q_transition() {
    q(q_experts, "Which way should be used to bring about change?", "Election", () => r(q_transition, "Democratic socialism"), "Revolution", q_authSoc, "", "", "", "", "", "", ["#e04080", "#c04000"], ["#a00040", "#800000"], ["election", "revolution"])
}
function q_authSoc() {
    q(q_transition, "Should socialism be built and maintained through centralized authority?", "Yes", q_dugin, "No", q_agrSoc)
}
function q_dugin() {
    q(q_authSoc, "Should we create multipolarity between civilizations?", "Yes", () => r(q_dugin, "Fourth theory"), "No", q_natSocAuth)
}
function q_natSocAuth() {
    q(q_dugin, "Should the nation come before all else?", "Yes", q_natSynd, "No", () => r(q_natSocAuth, "State socialism"))
}
function q_natSynd() {
    q(q_natSocAuth, "Should state-coordinated unions organize society?", "Yes", () => r(q_natSynd, "National syndicalism"), "No", q_daJoos)
}
function q_daJoos() {
    q(q_natSynd, "Are jews the cause for harsh worker conditions?", "Yes", () => r(q_daJoos, "Strasserism"), "No", () => r(q_daJoos, "National bolshevism"))
}
function q_agrSoc() {
    q(q_authSoc, "Should the economy be centered on agriculture?", "Yes", () => r(q_agrSoc, "Agrarian socialism"), "No", q_unions)
}
function q_unions() {
    q(q_agrSoc, "Should society be organized through unions?", "Yes", () => r(q_unions, "Syndicalism"), "No", () => r(q_unions, "Libertarian socialism"))
}