function q_privateProperty() {
    q(() => show("home"), "Should private property exist?", "Yes", q_constitution, "No", q_markets)
}
function q_constitution() {
    q(q_privateProperty, "Should the state be strictly limited in its scope?", "Yes", q_minarchy, "No", q_stateFunctions, "The state should not exist", q_counterEcon, "", "", "", "", ["hsl(120,70%,45%)", "hsl(0,70%,45%)", "hsl(280,60%,35%)"], ["hsl(120,70%,30%)", "hsl(0,70%,30%)", "hsl(280,60%,20%)"], ["yes", "no", "nostate"])
}
function q_minarchy() {
    q(q_constitution, "Should the state only enforce courts, property and defense?", "Yes", () => r(q_minarchy, "Minarchism"), "No", q_distBert)
}
function q_distBert() {
    q(q_minarchy, "Should property be made as widely owned as possible?", "Yes", () => r(q_distBert, "Libertarian distributism"), "No", q_singleTax)
}
function q_singleTax() {
    q(q_distBert, "Should the only tax be a levy on public resource usage?", "Yes", () => r(q_singleTax, "Geolibertarianism"), "No", q_ubi)
}
function q_ubi() {
    q(q_singleTax, "Should there be a universal basic income?", "Yes", () => r(q_ubi, "Social libertarianism"), "No", q_bertWar)
}
function q_bertWar() {
    q(q_ubi, "Should freedom be spread around the globe by force?", "Yes", () => r(q_bertWar, "Neolibertarianism"), "No", q_bertTrad)
}
function q_bertTrad() {
    q(q_bertWar, "Should local communities ensure law and order?", "Yes", () => r(q_bertTrad, "Paleolibertarianism"), "No", () => r(q_bertTrad, "Right-libertarianism"))
}
function q_counterEcon() {
    q(q_constitution, "Which method should be used to bring down the state?", "Illegal trade", q_redMarket, "Insurrection", q_anDist, "", "", "", "", "", "", ["hsl(0,0%,50%)", "hsl(40,80%,50%)"], ["hsl(0,0%,35%)", "hsl(40,80%,35%)"], ["illegal trade", "insurrection"])
}
function q_redMarket() {
    q(q_counterEcon, "Should coercive markets be tolerated?", "Yes", () => r(q_redMarket, "Avaritionism"), "No", () => r(q_redMarket, "Agorism"))
}
function q_anDist() {
    q(q_counterEcon, "Should property be made as widely owned as possible?", "Yes", () => r(q_anDist, "Anarcho-distributism"), "No", q_landRent)
}
function q_landRent() {
    q(q_anDist, "Is earning rent from the land a form of theft?", "Yes", () => r(q_landRent, "Geoanarchism"), "No", q_coop)
}
function q_coop() {
    q(q_landRent, "Are cooperatives preferable to hierarchical business models?", "Yes", () => r(q_coop, "Left-rothbardianism"), "No", q_covenant)
}
function q_covenant() {
    q(q_coop, "Should covenant communities expel unwelcome individuals?", "Yes", q_separation, "No", () => r(q_covenant, "Anarcho-capitalism"))
}
function q_separation() {
    q(q_covenant, "How should separation of covenants occur?", "Peacefully", () => r(q_separation, "Hoppeanism"), "Aggressively", () => r(q_separation, "Nilssonianism"), "", "", "", "", "", "", ["hsl(40,100%,60%)", "hsl(25,70%,45%)"], ["hsl(40,100%,40%)", "hsl(25,70%,30%)"], ["peacefully", "aggressively"])
}
function q_stateFunctions() {
    q(q_constitution, "Who should assume state functions?", "Elected officials", q_dist, "Strongman", q_racism, "Sovereign", q_integral, "", "", "", "", ["hsl(220,65%,45%)", "hsl(350,70%,45%)", "hsl(45,80%,50%)"], ["hsl(220,65%,30%)", "hsl(350,70%,30%)", "hsl(45,80%,30%)"], ["elected officials", "strongman", "sovereign"])
}
function q_dist() {
    q(q_stateFunctions, "Should property be made as widely owned as possible?", "Yes", q_distNeeds, "No", q_lvt)
}
function q_distNeeds() {
    q(q_dist, "Should people's needs be met unconditionally?", "Yes", () => r(q_distNeeds, "Social distributism"), "No", () => r(q_distNeeds, "Distributism"))
}
function q_lvt() {
    q(q_dist, "Should land rents be given back to society?", "Yes", q_geoWelf, "No", q_trad)
}
function q_geoWelf() {
    q(q_lvt, "Should the revenue from land rents be spent on welfare?", "Yes", () => r(q_geoWelf, "Social georgism"), "No", () => r(q_geoWelf, "Georgism"))
}
function q_trad() {
    q(q_lvt, "Should the state and society prioritize order and stability?", "Yes", q_safetyNet, "No", q_needs)
}
function q_safetyNet() {
    q(q_trad, "Should a social safety net protect the poor?", "Yes", q_deuxCentQuaranteSixFromages, "No", q_conIntervention)
}
function q_deuxCentQuaranteSixFromages() {
    q(q_safetyNet, "Should businesses that align with state goals be promoted?", "Yes", () => r(q_deuxCentQuaranteSixFromages, "Dirigisme"), "No", () => r(q_deuxCentQuaranteSixFromages, "Paternalistic conservatism"))
}
function q_conIntervention() {
    q(q_safetyNet, "Should the government intervene in wars overseas?", "Yes", () => r(q_conIntervention, "Mesoconservatism"), "No", () => r(q_conIntervention, "Paleoconservatism"))
}
function q_needs() {
    q(q_trad, "Should people's needs be met unconditionally?", "Yes", q_socCorp, "No", q_regulation)
}
function q_socCorp() {
    q(q_needs, "Should the state enforce collective bargaining?", "Yes", () => r(q_socCorp, "Social corporatism"), "No", () => r(q_socCorp, "Social democracy"))
}
function q_regulation() {
    q(q_needs, "Should the economy be tightly regulated?", "Yes", q_bigBusiness, "No", q_mobility)
}
function q_bigBusiness() {
    q(q_regulation, "Should big businesses have more social responsibilities?", "Yes", () => r(q_bigBusiness, "Ordoliberalism"), "No", () => r(q_bigBusiness, "Social liberalism"))
}
function q_mobility() {
    q(q_regulation, "Should the state spend to promote social mobility?", "Yes", () => r(q_mobility, "Third way"), "No", q_hegemony)
}
function q_hegemony() {
    q(q_mobility, "Which gives the most power globally?", "Trade", () => r(q_hegemony, "Neoliberalism"), "Military", () => r(q_hegemony, "Neoconservatism"), "", "", "", "", "", "", ["hsl(350,70%,45%)", "hsl(230,70%,45%)"], ["hsl(350,70%,30%)", "hsl(230,70%,30%"], ["trade", "military"])
}
function q_racism() {
    q(q_stateFunctions, "Should the state be devoted to a race superior to all others?", "Yes", q_raceLarp, "No", q_total)
}
function q_raceLarp() {
    q(q_racism, "What gives that race such superiority?", "Biology", () => r(q_raceLarp, "National socialism"), "Spirits", () => r(q_raceLarp, "Esoteric nazism"), "", "", "", "", "", "", ["hsl(180,70%,40%)", "hsl(320,70%,40%)"], ["hsl(180,70%,25%)", "hsl(320,70%,25%)"], ["biology", "spirits"])
}
function q_total() {
    q(q_racism, "Should the state have a role in all aspects of society?", "Yes", q_palingenesis, "No", q_corpo)
}
function q_palingenesis() {
    q(q_total, "Should we secure the nation through a rebirth or revival?", "Yes", q_fashClergy, "No", q_castes)
}
function q_fashClergy() {
    q(q_palingenesis, "Should the clergy be part of the government?", "Yes", () => r(q_fashClergy, "Clerical fascism"), "No", () => r(q_fashClergy, "Fascism"))
}
function q_castes() {
    q(q_palingenesis, "Should a system of castes be in place?", "Yes", q_control, "No", () => r(q_castes, "Jacobinism"))
}
function q_control() {
    q(q_castes, "How should control over society be ensured?", "Apathy", () => r(q_control, "Fordism"), "Terror", () => r(q_control, "English socialism"), "", "", "", "", "", "", ["hsl(320,50%,65%)", "hsl(0,70%,40%)"], ["hsl(320,50%,55%)", "hsl(0,70%,25%)"], ["apathy", "terror"])
}
function q_corpo() {
    q(q_total, "Should profession groups partake in policy making?", "Yes", q_corpoFocus, "No", q_natDist)
}
function q_corpoFocus() {
    q(q_corpo, "Whose interests should hold primacy during bargaining?", "State", () => r(q_corpoFocus, "State corporatism"), "Labor", () => r(q_corpoFocus, "Yellow socialism"), "Business", () => r(q_corpoFocus, "Developmentalism"), "", "", "", "", ["hsl(200,65%,45%)", "hsl(350,65%,45%)", "hsl(45,70%,45%)"], ["hsl(200,65%,30%)", "hsl(350,65%,30%)", "hsl(45,70%,30%)"], ["state", "labor", "business"])
}
function q_natDist() {
    q(q_corpo, "Should property be made as widely owned as possible?", "Yes", () => r(q_natDist, "National distributism"), "No", q_authWelf)
}
function q_authWelf() {
    q(q_natDist, "Should compliant citizens receive extensive welfare?", "Yes", () => r(q_authWelf, "Social autocracy"), "No", q_soe)
}
function q_soe() {
    q(q_authWelf, "Should the state get involved in the allocation of capital?", "Yes", q_zeBugz, "No", q_klepto)
}
function q_zeBugz() {
    q(q_soe, "Should all actors in supply chains be of equal concern?", "Yes", () => r(q_zeBugz, "Stakeholder capitalism"), "No", () => r(q_zeBugz, "State capitalism"))
}
function q_klepto() {
    q(q_soe, "Should state regulations favor large conglomerates?", "Yes", () => r(q_klepto, "Corporatocracy"), "No", () => r(q_klepto, "Autocratic capitalism"))
}
function q_integral() {
    q(q_stateFunctions, "Should spiritual, economic and political groups be merged?", "Yes", () => r(q_integral, "Integralism"), "No", q_sovereignType)
}
function q_sovereignType() {
    q(q_integral, "Where should the sovereign's legitimacy come from?", "Inheritance", q_sovereignRole, "Wisdom", () => r(q_sovereignType, "Noocracy"), "God", q_guelph, "Selection", q_electMon, "Strength", q_weak, ["hsl(230,70%,60%)", "hsl(70,70%,45%)", "hsl(290,70%,45%)", "hsl(35,80%,55%)", "hsl(350,70%,45%)"], ["hsl(230,60%,50%)", "hsl(70,70%,30%)", "hsl(290,70%,30%)", "hsl(35,80%,40%)", "hsl(350,70%,30%)"], ["inheritance", "wisdom", "god", "selection", "strength"])
}
function q_sovereignRole() {
    q(q_sovereignType, "What should be the sovereign's primary role?", "Judgment", () => r(q_sovereignRole, "Feudal monarchy"), "Commandment", () => r(q_sovereignRole, "Absolute monarchy"), "Management", () => r(q_sovereignRole, "Cameralism"), "", "", "", "", ["hsl(20,45%,50%)", "hsl(270,50%,50%)", "hsl(135,45%,40%)"], ["hsl(20,45%,35%)", "hsl(270,50%,35%)", "hsl(135,45%,25%)"], ["judgment", "commandment", "management"])
}
function q_guelph() {
    q(q_sovereignType, "Should the government engage in secular legislation?", "Yes", () => r(q_guelph, "Divine monarchy"), "No", () => r(q_guelph, "Theocracy"))
}
function q_electMon() {
    q(q_sovereignType, "What should grant power to select the sovereign?", "Birthright", () => r(q_electMon, "Aristocracy"), "Land ownership", () => r(q_electMon, "Timocracy"), "Share holding", () => r(q_electMon, "Neocameralism"), "", "", "", "", ["hsl(230,40%,55%)", "hsl(100,50%,55%)", "hsl(25,75%,55%)"], ["hsl(230,40%,40%)", "hsl(100,50%,40%)", "hsl(25,75%,40%)"], ["birthright", "land ownership", "share holding"])
}
function q_weak() {
    q(q_sovereignType, "Should the weak be subjugated?", "Yes", () => r(q_weak, "Kraterocracy"), "No", () => r(q_weak, "Combatocracy"))
}
function q_markets() {
    q(q_privateProperty, "Should goods be distributed through markets?", "Yes", q_authMarkSoc, "No", q_communism)
}
function q_authMarkSoc() {
    q(q_markets, "Should the state be governed by a single, central party?", "Yes", q_lange, "No", q_guilds, "The state should not exist", q_mutual, "", "", "", "", ["hsl(120,70%,45%)", "hsl(0,70%,45%)", "hsl(280,60%,35%)"], ["hsl(120,70%,30%)", "hsl(0,70%,30%)", "hsl(280,60%,20%)"], ["yes", "no", "nostate"])
}
function q_lange() {
    q(q_authMarkSoc, "Should central planners allocate resources and industry?", "Yes", () => r(q_lange, "Langean socialism"), "No", () => r(q_lange, "Titoism"))
}
function q_guilds() {
    q(q_authMarkSoc, "Should public services be competitive?", "Yes", () => r(q_guilds, "Market socialism"), "No", () => r(q_guilds, "Guild socialism"))
}
function q_mutual() {
    q(q_authMarkSoc, "Should the economy be based on mutual credit?", "Yes", q_ethnic, "No", () => r(q_mutual, "Market anarchism"))
}
function q_ethnic() {
    q(q_mutual, "Should communities be ethnically homogenous?", "Yes", () => r(q_ethnic, "National anarchism"), "No", () => r(q_ethnic, "Mutualism"))
}
function q_communism() {
    q(q_markets, "Should we reach a classless, stateless, moneyless society?", "Yes", q_commieState, "No", q_weed)
}
function q_commieState() {
    q(q_communism, "Should there be a temporary state apparatus?", "Yes", q_demCent, "No", q_communization)
}
function q_demCent() {
    q(q_commieState, "Should democratic centralism lead proletarian organization?", "Yes", q_oneCountrySoc, "No", q_party)
}
function q_oneCountrySoc() {
    q(q_demCent, "Is socialism possible in a single country?", "Yes", q_socCommodity, "No", q_natLib)
}
function q_socCommodity() {
    q(q_oneCountrySoc, "Should commodity production occur under socialism?", "Yes", q_peopleWar, "No", () => r(q_socCommodity, "Bukharinism"))
}
function q_peopleWar() {
    q(q_socCommodity, "Should protracted guerrilla warfare be used to remove the old society?", "Yes", q_universalPPW, "No", q_natCom)
}
function q_universalPPW() {
    q(q_peopleWar, "Are these tactics applicable across all countries?", "Yes", () => r(q_universalPPW, "Marxism-leninism-maoism"), "No", q_laborAristocracy)
}
function q_laborAristocracy() {
    q(q_universalPPW, "Is the first world working class an anti-revolutionary one?", "Yes", () => r(q_laborAristocracy, "Maoism-third-worldism"), "No", q_chingChong)
}
function q_chingChong() {
    q(q_laborAristocracy, "Should civilians be allowed to run independent enterprises?", "Yes", () => r(q_chingChong, "Dengism"), "No", () => r(q_chingChong, "Maoism"))
}
function q_natCom() {
    q(q_peopleWar, "Should the revolution's main priority be the nation's liberation?", "Yes", q_songun, "No", () => r(q_natCom, "Marxism-leninism"))
}
function q_songun() {
    q(q_natCom, "Is giving resource precedence to the military necessary?", "Yes", () => r(q_songun, "Juche"), "No", () => r(q_songun, "National communism"))
}
function q_natLib() {
    q(q_oneCountrySoc, "Should communists support national liberation?", "Yes", () => r(q_natLib, "Trotskyism"), "No", () => r(q_natLib, "Damenism"))
}
function q_party() {
    q(q_demCent, "Should there be a vanguard party to lead the working class?", "Yes", q_parliament, "No", q_commodity)
}
function q_parliament() {
    q(q_party, "Should communists participate in parliamentary politics?", "Yes", q_reform, "No", q_partyDict)
}
function q_reform() {
    q(q_parliament, "Should we reform capitalism on the short term?", "Yes", () => r(q_reform, "Classical social democracy"), "No", () => r(q_reform, "De leonism"))
}
function q_partyDict() {
    q(q_parliament, "Will the dictatorship of the proletariat be a party dictatorship?", "Yes", q_nature, "No", () => r(q_partyDict, "Dutch-german left communism"))
}
function q_nature() {
    q(q_partyDict, "Is an exit back in nature the only way to escape capitalism?", "Yes", () => r(q_nature, "Camattism"), "No", () => r(q_nature, "Bordigism"))
}
function q_commodity() {
    q(q_party, "Should proletarian revolution be that of everyday life?", "Yes", () => r(q_commodity, "Situationism"), "No", q_dotp)
}
function q_dotp() {
    q(q_commodity, "Should there be a dictatorship of the proletariat?", "Yes", () => r(q_dotp, "Council communism"), "No", () => r(q_dotp, "Autonomism"))
}
function q_communization() {
    q(q_commieState, "Should capitalist relations be socialized through insurrection?", "Yes", () => r(q_communization, "Communization"), "No", q_vouchers)
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
    q(q_anarchoUnions, "Should we use the myth of victory to unify our movement?", "Yes", () => r(q_myth, "Sorelianism"), "No", () => r(q_myth, "Anarcho-syndicalism"))
}
function q_bookchin() {
    q(q_anarchoUnions, "Should the state be opposed through local direct democracy?", "Yes", () => r(q_bookchin, "Libertarian municipalism"), "No", q_platform)
}
function q_platform() {
    q(q_bookchin, "Should the working class be organized by a group of tacticians?", "Yes", () => r(q_platform, "Platformism"), "No", () => r(q_platform, "Anarcho-communism"))
}
function q_weed() {
    q(q_communism, "Should all conflict be avoided when attempting change?", "Yes", q_experts, "No", q_transition)
}
function q_experts() {
    q(q_weed, "Should an expert committee optimize distribution to eliminate scarcity?", "Yes", () => r(q_experts, "Technocracy"), "No", () => r(q_experts, "Utopian socialism"))
}
function q_transition() {
    q(q_weed, "Which way should be used to abolish capitalism?", "Election", () => r(q_transition, "Democratic socialism"), "Revolution", q_authSoc, "", "", "", "", "", "", ["hsl(335,70%,45%)", "hsl(10,70%,35%)"], ["hsl(335,70%,30%)", "hsl(10,70%,20%)"], ["election", "revolution"])
}
function q_authSoc() {
    q(q_transition, "Should centralized authority build and maintain socialism?", "Yes", q_dugin, "No", q_agrSoc)
}
function q_dugin() {
    q(q_authSoc, "Should we create multipolarity between civilizations?", "Yes", () => r(q_dugin, "Duginism"), "No", q_natSocAuth)
}
function q_natSocAuth() {
    q(q_dugin, "Should the nation come before all else?", "Yes", q_natSynd, "No", q_benefactor)
}
function q_natSynd() {
    q(q_natSocAuth, "Should state-coordinated unions organize society?", "Yes", () => r(q_natSynd, "National syndicalism"), "No", q_daJoos)
}
function q_daJoos() {
    q(q_natSynd, "Are race and class closely and inseparately related?", "Yes", q_agrNazi, "No", q_nazbol)
}
function q_agrNazi() {
    q(q_daJoos, "Should agriculture be the main focus of the economy?", "Yes", () => r(q_agrNazi, "Strasserism"), "No", () => r(q_agrNazi, "Niekischism"))
}
function q_nazbol() {
    q(q_daJoos, "How should the will of the people be executed?", "Vanguard", () => r(q_nazbol, "National bolshevism"), "Parliament", () => r(q_nazbol, "Limonovism"), "Direct democracy", () => r(q_nazbol, "Third international theory"), "", "", "", "", ["hsl(0,70%,45%)", "hsl(340,70%,45%)", "hsl(15,70%,45%)"], ["hsl(0,70%,30%)", "hsl(340,70%,30%)", "hsl(15,70%,30%)"], ["vanguard", "parliament", "direct democracy"])
}
function q_benefactor() {
    q(q_natSocAuth, "Should all aspects of life be subjected to state planning?", "Yes", () => r(q_benefactor, "Benefactorism"), "No", () => r(q_benefactor, "State socialism"))
}
function q_agrSoc() {
    q(q_authSoc, "Should the economy be centered on agriculture?", "Yes", () => r(q_agrSoc, "Agrarian socialism"), "No", q_unions)
}
function q_unions() {
    q(q_agrSoc, "Should society be organized through unions?", "Yes", () => r(q_unions, "Syndicalism"), "No", () => r(q_unions, "Libertarian socialism"))
}