/*
  global: POKEDEX
  global: TYPES
  global: EXP_TABLE
  global: ROUTES
  global: EVOLUTIONS
*/
'use strict'

const pokeById = (id) => POKEDEX[id - 1]
const pokeByName = (name) => POKEDEX.filter((el) => el.pokemon[0].Pokemon === name)[0]

const EXP_TABLE = {}
EXP_TABLE["Slow"] = [1, 2, 10, 33, 80, 156, 270, 428, 640, 911, 1250, 1663, 2160, 2746, 3430, 4218, 5120, 6141, 7290, 8573, 10000, 11576, 13310, 15208, 17280, 19531, 21970, 24603, 27440, 30486, 33750, 37238, 40960, 44921, 49130, 53593, 58320, 63316, 68590, 74148, 80000, 86151, 92610, 99383, 106480, 113906, 121670, 129778, 138240, 147061, 156250, 165813, 175760, 186096, 196830, 207968, 219520, 231491, 243890, 256723, 270000, 283726, 297910, 312558, 327680, 343281, 359370, 375953, 393040, 410636, 428750, 447388, 466560, 486271, 506530, 527343, 548720, 570666, 593190, 616298, 640000, 664301, 689210, 714733, 740880, 767656, 795070, 823128, 851840, 881211, 911250, 941963, 973360, 1005446, 1038230, 1071718, 1105920, 1140841, 1176490, 1212873, 999999999999999999]
EXP_TABLE["Medium Slow"] = [1, 2, 9, 57, 96, 135, 179, 236, 314, 419, 560, 742, 973, 1261, 1612, 2035, 2535, 3120, 3798, 4575, 5460, 6458, 7577, 8825, 10208, 11735, 13411, 15244, 17242, 19411, 21760, 24294, 27021, 29949, 33084, 36435, 40007, 43808, 47846, 52127, 56660, 61450, 66505, 71833, 77440, 83335, 89523, 96012, 102810, 109923, 117360, 125126, 133229, 141677, 150476, 159635, 169159, 179056, 189334, 199999, 211060, 222522, 234393, 246681, 259392, 272535, 286115, 300140, 314618, 329555, 344960, 360838, 377197, 394045, 411388, 429235, 447591, 466464, 485862, 505791, 526260, 547274, 568841, 590969, 613664, 636935, 660787, 685228, 710266, 735907, 762160, 789030, 816525, 844653, 873420, 902835, 932903, 963632, 995030, 1027103, 999999999999999999]
EXP_TABLE["Medium Fast"] = [1, 2, 8, 27, 64, 125, 216, 343, 512, 729, 1000, 1331, 1728, 2197, 2744, 3375, 4096, 4913, 5832, 6859, 8000, 9261, 10648, 12167, 13824, 15625, 17576, 19683, 21952, 24389, 27000, 29791, 32768, 35937, 39304, 42875, 46656, 50653, 54872, 59319, 64000, 68921, 74088, 79507, 85184, 91125, 97336, 103823, 110592, 117649, 125000, 132651, 140608, 148877, 157464, 166375, 175616, 185193, 195112, 205379, 216000, 226981, 238328, 250047, 262144, 274625, 287496, 300763, 314432, 328509, 343000, 357911, 373248, 389017, 405224, 421875, 438976, 456533, 474552, 493039, 512000, 531441, 551368, 571787, 592704, 614125, 636056, 658503, 681472, 704969, 729000, 753571, 778688, 804357, 830584, 857375, 884736, 912673, 941192, 970299, 999999999999999999]
EXP_TABLE["Fast"] = [1, 2, 6, 21, 51, 100, 172, 274, 409, 583, 800, 1064, 1382, 1757, 2195, 2700, 3276, 3930, 4665, 5487, 6400, 7408, 8518, 9733, 11059, 12500, 14060, 15746, 17561, 19511, 21600, 23832, 26214, 28749, 31443, 34300, 37324, 40522, 43897, 47455, 51200, 55136, 59270, 63605, 68147, 72900, 77868, 83058, 88473, 94119, 100000, 106120, 112486, 119101, 125971, 133100, 140492, 148154, 156089, 164303, 172800, 181584, 190662, 200037, 209715, 219700, 229996, 240610, 251545, 262807, 274400, 286328, 298598, 311213, 324179, 337500, 351180, 365226, 379641, 394431, 409600, 425152, 441094, 457429, 474163, 491300, 508844, 526802, 545177, 563975, 583200, 602856, 622950, 643485, 664467, 685900, 707788, 730138, 752953, 776239, 999999999999999999]

var currentRegionId = 'Kanto'
var currentRouteId = 'starter'
var dexView = 'All'

const RNG = (func, chance) => {
  const rnd = Math.random() * 100
  if (rnd < chance) {
    func()
    return true
  }
  return false
}

const cloneJsonObject = (object) => JSON.parse(JSON.stringify(object))
const randomArrayElement = (array) => array[Math.floor(Math.random() * array.length)]

const makeDomHandler = () => {
  const domQuery = (cssQuery) => document.querySelector(cssQuery)
  const $ = domQuery
  const setValue = (domElement, newValue, append) => {
    if (append === undefined) { append = false }
    if (append) {
      domElement.innerHTML += newValue
    }
    if (!append) {
      if (domElement.innerHTML !== newValue) {
        domElement.innerHTML = newValue
      }
    }
  }
  const getValue = (domElement) => {
    return domElement.innerHTML
  }
  const setProp = (domElement, attribute, newValue) => {
      if (domElement[attribute] !== newValue) {
        domElement[attribute] = newValue
      }
  }
  const renderPokeOnContainer = (id, poke, face) => {
    face = face || 'front'
    const pokeStatusAsText = (poke) => {
      var output = ''
      output += 'Attack Speed: ' + poke.attackSpeed()/1000 + '<br>'
      output += '\nAttack: ' + (poke.allCombat().attack() + poke.allCombat().spAttack())/2 + '<br>'
      output += '\nDefense: ' + (poke.allCombat().defense() + + poke.allCombat().spDefense())/2 + '<br>'
      return output
    }
    const containerCssQuery = '.container.poke' + '#' + id
    const container = $(containerCssQuery)
    const domElements  = {
      name: container.querySelector('.name')
    , img: container.querySelector('.img')
    , hp: container.querySelector('.hp')
    , hpBar: container.querySelector('.hpBar')
    , expBar: container.querySelector('.expBar')
    , status: container.querySelector('.status')
    }
    setValue(domElements.name, poke.pokeName() + ' (' + poke.level() + ')')
    setProp(domElements.img, 'src', poke.image()[face])
    setValue(domElements.hp, poke.lifeAsText())
    setProp(domElements.hpBar, 'value', poke.life.current())
    setProp(domElements.hpBar, 'max', poke.life.max())
    setProp(domElements.expBar, 'value', Math.floor(poke.currentExp() - poke.thisLevelExp()))
    setProp(domElements.expBar, 'max', poke.nextLevelExp() - poke.thisLevelExp())
    setValue(domElements.status, pokeStatusAsText(poke))
  }
  const renderPokeDex = (id, dexData) => {
    const listCssQuery = '.container.list' + '#' + id
    const listContainer = $(listCssQuery)
    const listElement = listContainer.querySelector('#playerPokeDex ul')
    var listValue = '';
    function findFlag(obj){ return (this == obj.name) }
    for(var y = 0; y < POKEDEX.length; y++) {
      var dexEntry = dexData.find(findFlag, POKEDEX[y].pokemon[0].Pokemon)
      if (typeof dexEntry == 'undefined')
        dexEntry = {name: '', flag: 0}
      if (dexView == 'All' || (dexView == 'Missing' && (dexEntry.flag <= 1 || dexEntry.flag == 3 || dexEntry.flag == 8)) || (dexView == 'Shiny' && (dexEntry.flag >= 7)))
        listValue += '<li class="pokeDex' + dexEntry.flag + '">' + (y + 1) + ' ' + POKEDEX[y].pokemon[0].Pokemon + '</li>';
    }
    setValue(listElement, listValue, false)
  }
  const healElement = $('#heal')
  const renderHeal = (canHeal) => {
    if (canHeal === true) {
      setProp(healElement, 'disabled', false)
      setValue(healElement, 'Heal!')
        player.healAllPokemons()
        combatLoop.refresh()
        renderView(dom, enemy, player)
    }
    if (typeof canHeal === 'number') {
      setProp(healElement, 'disabled', true)
      setValue(healElement, 'Heal: ' + Math.floor(((canHeal/30000)*100)) + '%')
    }
  }
  const pokeColor = (poke) => {
    if (poke.alive()) {
      if (poke === player.activePoke()) {
        if (poke.shiny()) {
          return 'rgb(255, 230, 10)'
        } else {
          return 'rgb(80, 157, 2)'
        }
      } else {
        if (poke.shiny()) {
          return 'rgb(255, 255, 76)'
        } else {
          return 'rgb(66, 116, 10)'
        }
      }
    } else {
      return 'red'
    }
  }
  const renderPokeList = (id, list, player, deleteEnabledId) => {
    const listCssQuery = '.container.list' + '#' + id
    const listContainer = $(listCssQuery)
    const listElement = listContainer.querySelector('#playerPokesList')
    const deleteEnabled = deleteEnabledId && $(deleteEnabledId).checked
    listElement.className = 'list' + (checkConfirmed('#enablePokedex') ? ' hidden' : '') + (deleteEnabled ? ' manageTeamEnabled' : '')
    var listElementsToAdd = ''
    list.forEach((poke, index) => {
      const listItemElement = listElement.querySelector('#listPoke' + index);
      if (listItemElement) {
        const listItemNameElement = listItemElement.querySelector('.pokeListName')
        listItemNameElement.innerHTML = `${poke.pokeName()} (${poke.level()})`
        listItemNameElement.style.color = pokeColor(poke)
        listItemNameElement.className = 'pokeListName'
          + (poke === player.activePoke() ? ' activePoke' : '')
          + (poke.canEvolve() ? ' canEvolve' : '')
      } else {
        const deleteButton = `<a href="#"
            onclick="userInteractions.deletePokemon(${index})"
            style="
              color: red;
              text-decoration: none;
              position: relative;
              left: -3px;
            "
            class="pokeDeleteButton"
          >
            X
          </a>`

        const upButton = `<button href="#"
            onclick="userInteractions.pokemonToUp('${index}')"
            class="pokeUpButton"
          >
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </button>`

        const downButton = `<button href="#"
            onclick="userInteractions.pokemonToDown('${index}')"
            class="pokeDownButton"
          >
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          </button>`

        const evolveButton = `<button href="#"
            onclick="userInteractions.evolvePokemon('${index}')"
            class="pokeEvolveButton"
          >
            Evolve
          </button>`

        listElementsToAdd += `<li id="listPoke${index}">` +
          deleteButton +
          `<a
              href="#"
              onclick="userInteractions.changePokemon(${index})"
              style="color: ${pokeColor(poke)}"
              class="pokeListName"
            >
              ${poke.pokeName()} (${poke.level()})
            </a>
            <br>` +
          upButton +
          downButton +
          evolveButton +
          `</li>`
      }
    })
    if (listElementsToAdd.length > 0) {
      setValue(listElement, listElementsToAdd, true)
    }
    var i = list.length
    var listItemToRemove
    while (listItemToRemove = listElement.querySelector('#listPoke' + i)) {
      listElement.removeChild(listItemToRemove)
      i++
    }
  }
  const renderRouteList = (id, routes) => {
    const listCssQuery = '.container.list' + '#' + id
    const listContainer = $(listCssQuery)
    const listElement = listContainer.querySelector('.list')
    setValue(listElement, '')
    Object.keys(routes).forEach((routeId) => {
      const route = routes[routeId]
      setValue(
        listElement
      , `<li>
          <a
          href="#"
          onclick="${route.unlocked
                    && 'userInteractions.changeRoute(\'' + routeId + '\')'
                    || ''
                  }"
          "
            style="
            color: ${route.unlocked
                      && (routeId === currentRouteId
                        && 'rgb(51, 111, 22)'
                        || 'rgb(53, 50, 103)' )
                      || 'rgb(167, 167, 167)'
                    };
            font-weight: ${routeId === currentRouteId
                          && 'bold'
                          || 'normal'
                          };
           "
           >
             ${route.name + ' (' + route.minLevel + '~' + route.maxLevel + ')'}
           </a>
        <li>`
      , true
      )
    })
  }
  const checkConfirmed = (id) => {
    return $(id).checked
  }
  const attackAnimation = (id, direction) => {
    const toAnimate = $('#' + id)
    toAnimate.classList = 'img attacked-' + direction
    window.setTimeout(() => toAnimate.classList = 'img', 80)
  }
  const gameConsoleLog = (text, color) => {
    const logElement = $('#console .console-text')
    if ($('#enableConsole').checked) {
      if (color) {
        logElement.innerHTML = '<span style="color:' + color + ';">' + text + '</span>' + '<br>' + logElement.innerHTML
      } else {
        logElement.innerHTML = text + '<br>' + logElement.innerHTML
      }
    }
    const logAsArray = logElement.innerHTML.split('<br>')
    if (logAsArray.length >= 100) {
      logAsArray.splice(logAsArray.length - 1, 1)
      logElement.innerHTML = logAsArray.join('<br>')
    }
  }
  const gameConsoleClear = () => {
    $('#console .console-text').innerHTML = ''
  }
  const renderBalls = (ballsAmmount) => {
    Object.keys(ballsAmmount).forEach(ballType => {
      $('.ball-ammount.' + ballType).innerHTML = ballsAmmount[ballType]
    })
  }
  const bindEvents = () => {
    $('#heal').addEventListener( 'click'
    , () => { userInteractions.healAllPlayerPokemons() }
    )

    $('#enableDelete').addEventListener( 'click'
    , () => { userInteractions.enablePokeListDelete() }
    )

    $('#enablePokedex').addEventListener( 'click'
      , () => { userInteractions.enableViewPokedex() }
    )

    $('#dexView').addEventListener( 'change'
        , () => { userInteractions.changeDexView() }
    )

    $(`#enableCatch`).addEventListener( 'click'
    , () => { userInteractions.changeCatchOption($(`#enableCatch`).checked) }
    )

    $(`#saveDialogContainer`).addEventListener( 'click'
    , (event) => { event.target === $(`#saveDialogContainer`) && ($(`#saveDialogContainer`).style.display = 'none') }
    )
  }
  bindEvents()
  return {
    renderPokeOnContainer: renderPokeOnContainer
  , renderPokeDex: renderPokeDex
  , renderPokeList: renderPokeList
  , renderRouteList: renderRouteList
  , renderHeal: renderHeal
  , attackAnimation: attackAnimation
  , checkConfirmed: checkConfirmed
  , gameConsoleLog: gameConsoleLog
  , gameConsoleClear: gameConsoleClear
  , renderBalls: renderBalls
  }
}

const makePoke = (pokeModel, initialLevel, initialExp, shiny) => {
  var poke = cloneJsonObject(pokeModel)
  const expTable = EXP_TABLE[poke.stats[0]["growth rate"]]
  var exp = initialLevel
              && expTable[initialLevel - 1]
              || initialExp
  const isShiny = (shiny == true);
  const currentLevel = () => {
      return expTable
        .filter((xp_requirement) => xp_requirement <= exp)
        .length

    }
  const statValue = (raw) => {
    return Math.floor((((raw + 50) * currentLevel()) / (150)))
  }
  const hp = (rawHp) => {
    return Math.floor(((rawHp * currentLevel()) / 40))
  }
  const tryEvolve = () => {
    const pokemonHasEvolution =
      EVOLUTIONS[poke.pokemon[0].Pokemon] !== undefined
    if (pokemonHasEvolution) {
      const evolution = EVOLUTIONS[poke.pokemon[0].Pokemon].to
      const levelToEvolve = Number(EVOLUTIONS[poke.pokemon[0].Pokemon].level)
      if (currentLevel() >= levelToEvolve) {
        poke = cloneJsonObject(pokeByName(evolution))
        player.addPokedex(poke.pokeName(), (poke.shiny() ? 7 : 2))
      }
    }
  }

  const canEvolve = () => {
    const pokemonHasEvolution =
      EVOLUTIONS[poke.pokemon[0].Pokemon] !== undefined
    if (pokemonHasEvolution) {
      const evolution = EVOLUTIONS[poke.pokemon[0].Pokemon].to
      const levelToEvolve = Number(EVOLUTIONS[poke.pokemon[0].Pokemon].level)
      if (currentLevel() >= levelToEvolve) {
          return true
      }
    }
      return false
  }
  const combat = {
    mutable: {
      hp: hp(poke.stats[0].hp) * 3
    }
  , maxHp: () => hp(poke.stats[0].hp) * 3
  , attack: () => statValue(poke.stats[0].attack)
  , defense: () => statValue(poke.stats[0].defense)
  , spAttack: () => statValue(poke.stats[0]['sp atk'])
  , spDefense: () => statValue(poke.stats[0]['sp def'])
  , speed: () => statValue(poke.stats[0].speed)
  }
  const poke_interface = {
    pokeName: () => poke.pokemon[0].Pokemon
  , image: () => {
    const imageType = (isShiny ? 'shiny' : 'normal')
    return {
      front: poke.images[imageType].front
    , back: poke.images[imageType].back
    }
  }
  , shiny: () => isShiny
  , type: () => poke.stats[0].types[0]
  , catchRate: () => Number(poke.stats[0]['catch rate'])
  , lifeAsText: () => '' + (combat.mutable.hp < 0 ? 0 : combat.mutable.hp) + ' / ' + combat.maxHp()
  , life: {
      current: () => combat.mutable.hp
    , max: () => combat.maxHp()
    }
  , alive: () => combat.mutable.hp > 0
  , giveExp: (ammount) => {
    exp += ammount
  }
  , canEvolve: canEvolve
  , evolve: tryEvolve
  , currentExp: () => exp
  , nextLevelExp: () => expTable[currentLevel()]
  , thisLevelExp: () => expTable[currentLevel() - 1] || 10
  , level: () => currentLevel()
  , attackSpeed: () => {
    const speed = Math.floor(1000 / (500 + combat.speed()) * 800)
    if (speed <= 300) {
      return 300
    } else {
      return speed
    }
  }
  , attack: () => combat.attack()
  , takeDamage: (enemyAttack) => {
      const damageToTake = (enemyAttack - combat.defense() / 10) > 0
                              && Math.ceil((enemyAttack - combat.defense()/10) * ((Math.random() + 0.1) * 2) / 100)
                              || 0
      combat.mutable.hp -= damageToTake
      return damageToTake
    }
  , baseExp: () => Number(poke.exp[0]['base exp'])
  , heal: () => combat.mutable.hp = combat.maxHp()
  , allCombat: () => combat
  , save: () => [poke.pokemon[0].Pokemon, exp, isShiny]
  }
  return poke_interface
}
const makeRandomPoke = (level) => makePoke(randomArrayElement(POKEDEX), level)

const makePlayer = () => {
  var pokemons = []
  var pokedexData = []
  var activePoke = 0
  var lastHeal = Date.now()

  const ballsRngs = {
    pokeball: 1,
    greatball: 1.5,
    ultraball: 2
  }
  var selectedBall = "pokeball"
  var ballsAmmount = {
    pokeball: 20,
    greatball: 0,
    ultraball: 0
  }

  const canHeal = () => {
    if ((Date.now() - lastHeal) > 30000) {
      return true
    }
    else {
      return Date.now() - lastHeal
    }
  }
  const checksum = (s) =>
  {
    var chk = 0x12345678;
    var len = s.length;
    for (var i = 0; i < len; i++) {
        chk += (s.charCodeAt(i) * (i + 1));
    }

    return (chk & 0xffffffff).toString(16);
  }
  const player_interface = {
    addPoke: (poke) => {
      // const playerEqualPokes = pokemons.filter((playerPoke) => (playerPoke.pokeName() === poke.pokeName()))
      // if (playerEqualPokes.length === 0) {
      //   pokemons.push(poke)
      // }
      // if (playerEqualPokes.length !== 0) {
      //   if (poke.level() > playerEqualPokes[0].level()) {
      //     pokemons.splice(pokemons.indexOf(playerEqualPokes[0]), 1)
      //     pokemons.push(poke)
      //   }
      // }
      pokemons.push(poke)
    }
  , addPokedex: (pokeName, flag) => {
      /* 1: seen, 2: owned, 3: released (not currently owned), 4: seen shiney
      *  5: have, seen shiney, 6: released, seen shiney, 7: own shiney, 8: released shiney */
      function findFlag(obj){ return (this == obj.name) }
      const dexEntry = pokedexData.find(findFlag, pokeName)
      if (typeof dexEntry == 'object') {
        if (dexEntry.flag < flag) {
          if (flag == 4 && dexEntry.flag == 3) {
            flag = 6
          } else if (flag == 4 && dexEntry.flag == 2) {
            flag = 5
          }
          pokedexData[pokedexData.indexOf(dexEntry)].flag = flag
        }
      } else {
        pokedexData.push({name: pokeName, flag: flag})
      }
    }
  , setActive: (index) => {
      activePoke = index
    }
  , activePoke: () => pokemons[activePoke]
  , pokemons: () => pokemons
  , pokedexData: () => pokedexData
  , canHeal: canHeal
  , reorderPokes: (newList) => {
      pokemons = newList
  }
  , healAllPokemons: () => {
    if (canHeal() === true) {
      pokemons.forEach((poke) => poke.heal())
      lastHeal = Date.now()
      return "healed"
    }
    return canHeal()
    }
  , hasPokemon: (pokemonName) => {
      return typeof pokemons.find(function(obj){ return (this == obj.pokeName()); }, pokemonName) != 'undefined'
    }
  , deletePoke: (index) => {
      if (index !== activePoke) {
        pokemons.splice(index, 1)
        if (index < activePoke) {
          activePoke -= 1
        }
      }
    }
  , savePokes: () => {
      localStorage.setItem(`totalPokes`, pokemons.length)
      pokemons.forEach((poke, index) => {
        localStorage.setItem(`poke${index}`, JSON.stringify(poke.save()))
      })
      localStorage.setItem(`ballsAmmount`, JSON.stringify(ballsAmmount))
      localStorage.setItem(`pokedexData`, JSON.stringify(pokedexData))
    }
  , saveToString: () => {
      const saveData = JSON.stringify({
        pokes: pokemons.map((poke) => poke.save()),
        pokedexData: pokedexData,
        ballsAmmount: ballsAmmount
      })
      return btoa(checksum(saveData) + '|' + saveData)
    }
  , loadPokes: () => {
      Array(Number(localStorage.getItem(`totalPokes`))).fill(0).forEach((el, index) => {
        const loadedPoke = JSON.parse(localStorage.getItem('poke'+index))
        const pokeName = loadedPoke[0]
        const exp = loadedPoke[1]
        const shiny = (loadedPoke[2] == true)
        pokemons.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny))
      })
      if (JSON.parse(localStorage.getItem('ballsAmmount'))) {
        ballsAmmount = JSON.parse(localStorage.getItem('ballsAmmount'))
      }
      if (JSON.parse(localStorage.getItem('pokedexData'))) {
        pokedexData = JSON.parse(localStorage.getItem('pokedexData'))
      }
      if (Object.keys(pokedexData).length === 0 && pokedexData.constructor === Object) {
        player.reloadDexData()
      }
    }
  , reloadDexData: () => {
    // this should only ever be run once
    for (var i in pokemons) {
      player.addPokedex (pokemons[i].pokeName(), (pokemons[i].shiny() ? 7 : 2))
    }
  }
  , loadFromString: (saveData) => {
      saveData = atob(saveData)
      saveData = saveData.split('|')
      if (checksum(saveData[1]) === saveData[0]) {
        try {
          saveData = JSON.parse(saveData[1])
        } catch (err) {
          alert('Failed to parse save data, loading canceled!')
          return;
        }
        pokemons = []
        saveData.pokes.forEach((loadedPoke) => {
          const pokeName = loadedPoke[0]
          const exp = loadedPoke[1]
          const shiny = (loadedPoke[2] == true)
          pokemons.push(makePoke(pokeByName(pokeName), false, Number(exp), shiny))
        })
        ballsAmmount = saveData.ballsAmmount
        pokedexData = saveData.pokedexData ? saveData.pokedexData : []
        player.reloadDexData()
      } else {
        alert('Invalid save data, loading canceled!')
      }
    }
  , ballRNG: (ballName) => {
      return ballsRngs[ballName]
    }
  , changeSelectedBall: (newBall) => {
      selectedBall = newBall
    }
  , consumeBall: (ballName) => {
     if (ballsAmmount[ballName] > 0) {
       ballsAmmount[ballName] -= 1
       return true
     }
     return false
    }
  , selectedBall: () => selectedBall
  , bestAvailableBall: () => {
      const ballsFromBestToWorst = ['ultraball', 'greatball', 'pokeball']
      for (var i = 0; i < ballsFromBestToWorst.length; i++) {
        if (ballsAmmount[ballsFromBestToWorst[i]] > 0) {
          return ballsFromBestToWorst[i];
        }
      }
    }
  , ballsAmmount: () => ballsAmmount
  , addBalls: (ballName, ammount) => {
      ballsAmmount[ballName] += ammount
    }
  }
  return player_interface
}

const makeEnemy = (starter) => {
  var active = starter

  const generateNew = (recipe) => {
    const poke = pokeByName(randomArrayElement(recipe.pokes))
    return makePoke(
      poke,
      recipe.minLevel + Math.round((Math.random() * (recipe.maxLevel - recipe.minLevel))),
      false,
      Math.random() < (1 / (1 << 5 << 8))
    )
  }

  return {
    activePoke: () => active,
    generateNew: (recipe) => active = generateNew(recipe)
  }
}

const makeUserInteractions = (player, enemy, dom, combatLoop) => {
  const changeRoute = (newRouteId) => {
    currentRouteId = newRouteId
    enemy.generateNew(ROUTES[currentRegionId][newRouteId])
    player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 4 : 1))
    combatLoop.changeEnemyPoke(enemy.activePoke())
    renderView(dom, enemy, player)
    player.savePokes()
    dom.renderRouteList('areasList', ROUTES[currentRegionId])
    dom.renderPokeDex('playerPokes', player.pokedexData())
  };

  return {
    changePokemon: (newActiveIndex) => {
      player.setActive(newActiveIndex)
      combatLoop.changePlayerPoke(player.activePoke())
      renderView(dom, enemy, player)
    },
    deletePokemon: (index) => {
      const pokemon = player.pokemons()[index];
      player.deletePoke(index)
      if (!player.hasPokemon(pokemon.pokeName()))
        player.addPokedex(pokemon.pokeName(), (pokemon.shiny() ? 8 : 3))
      combatLoop.changePlayerPoke(player.activePoke())
      renderView(dom, enemy, player)
      player.savePokes()
    },
    healAllPlayerPokemons: () => {
      if (player.healAllPokemons() === "healed") {
        dom.gameConsoleLog('Full heal!', 'white')
        combatLoop.refresh()
        renderView(dom, enemy, player)
      }
    },
    changeRoute: changeRoute,
    changeRegion: () => {
      const regionSelect = document.getElementById('regionSelect')
      currentRegionId = regionSelect.options[regionSelect.selectedIndex].value
      changeRoute(Object.keys(ROUTES[currentRegionId])[0])
    },
    enablePokeListDelete: () => {
      dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
    },
    enableViewPokedex: () => {
      if (dom.checkConfirmed('#enablePokedex')) {
        document.querySelector('#playerPokesList').classList.add('hidden')
        document.querySelector('#playerPokeDex').classList.remove('hidden')
      } else {
        document.querySelector('#playerPokesList').classList.remove('hidden')
        document.querySelector('#playerPokeDex').classList.add('hidden')
      }
    },
    changeDexView: () => {
      const regionSelect = document.getElementById('dexView')
      dexView = regionSelect.options[regionSelect.selectedIndex].value
      dom.renderPokeDex('playerPokes', player.pokedexData())
    },
    changeCatchOption: (newCatchOption) => {
      combatLoop.changeCatch(newCatchOption)
    },
    clearGameData: () => {
      if (dom.checkConfirmed('#confirmClearData')) {
        localStorage.clear()
        window.location.reload(true)
      }
    },
    clearConsole: () => {
      dom.gameConsoleClear()
    },
    changeSelectedBall: (newBall) => {
      player.changeSelectedBall(newBall)
    },
      pokemonToDown: (pokemonIndex) => {
		  const moveToDown = index => arr => [
			  ...arr.slice(0,parseInt(index)),
			  arr[parseInt(index)+1],
			  arr[parseInt(index)],
			  ...arr.slice(parseInt(index)+2)
		  ]

		  const newPokemonList = moveToDown(pokemonIndex)(player.pokemons())
		  player.reorderPokes(newPokemonList)
		  player.savePokes()
		  combatLoop.changePlayerPoke(player.activePoke())
		  renderView(dom, enemy, player)
      },
	  pokemonToUp: (pokemonIndex) => {
		  const moveToUp = index => arr => [
			  ...arr.slice(0,parseInt(index)-1),
			  arr[parseInt(index)],
			  arr[parseInt(index)-1],
			  ...arr.slice(parseInt(index)+1)
		  ]

		  const newPokemonList = moveToUp(pokemonIndex)(player.pokemons())
		  player.reorderPokes(newPokemonList)
		  player.savePokes()
		  combatLoop.changePlayerPoke(player.activePoke())
		  renderView(dom, enemy, player)
	  },
	  evolvePokemon: (pokemonIndex) => {
		  player.pokemons()[pokemonIndex].evolve()
		  renderView(dom, enemy, player)
	  },
	  exportSaveDialog: () => {
		  document.getElementById('saveDialogTitle').innerHTML = 'Export your save'
		  if (document.queryCommandSupported('copy')) {
			  document.getElementById('copySaveText').style.display = 'initial'
		  }
		  document.getElementById('saveText').value = player.saveToString()
		  document.getElementById('loadButtonContainer').style.display = 'none'
		  document.getElementById('saveDialogContainer').style.display = 'block'
	  },
	  importSaveDialog: () => {
		  document.getElementById('saveDialogTitle').innerHTML = 'Import a save'
		  document.getElementById('copySaveText').style.display = 'none'
		  document.getElementById('saveText').value = ''
		  document.getElementById('loadButtonContainer').style.display = 'block'
		  document.getElementById('saveDialogContainer').style.display = 'block'
	  },
	  importSave: () => {
		  if (window.confirm('Loading a save will overwrite your current progress, are you sure you wish to continue?')) {
			  player.loadFromString(document.getElementById('saveText').value.trim())
			  document.getElementById('saveDialogContainer').style.display = 'none'
			  renderView(dom, enemy, player)
		  }
	  },
	  copySaveText: () => {
		  document.getElementById('saveText').select()
		  document.execCommand('copy')
		  window.getSelection().removeAllRanges()
	  }
  }
}

const makeCombatLoop = (enemy, player, dom) => {
  var playerActivePoke = player.activePoke()
  var enemyActivePoke = enemy.activePoke()
  var playerTimerId = null
  var enemyTimerId = null
  var catchEnabled = false
  const playerTimer = () => {
    playerTimerId = window.setTimeout(
      () => dealDamage(playerActivePoke, enemyActivePoke, 'player')
    , playerActivePoke.attackSpeed()
    )
  }
  const enemyTimer = () => {
    enemyTimerId = window.setTimeout(
      () => dealDamage(enemyActivePoke, playerActivePoke, 'enemy')
    , enemyActivePoke.attackSpeed()
    )
  }
  const dealDamage = (attacker, defender, who) => {
    if (attacker.alive() && defender.alive()) {
      // both alive
      const damageMultiplier = TYPES[attacker.type()][defender.type()]
      const damage = defender.takeDamage(attacker.attack() * damageMultiplier)
      if (who === 'player') {
        dom.attackAnimation('playerImg', 'right')
        dom.gameConsoleLog(attacker.pokeName() + ' Attacked for ' + damage, 'green')
        playerTimer()
      }
      if (who === 'enemy') {
        dom.attackAnimation('enemyImg', 'left')
        dom.gameConsoleLog(attacker.pokeName() + ' Attacked for ' + damage, 'rgb(207, 103, 59)')
        enemyTimer()
      }

      dom.renderPokeOnContainer('enemy', enemy.activePoke())
      dom.renderPokeOnContainer('player', player.activePoke(), 'back')
    }
    if (!attacker.alive() || !defender.alive()) {
      // one is dead
      window.clearTimeout(playerTimerId)
      window.clearTimeout(enemyTimerId)

      if ((who === 'enemy') && !attacker.alive()
      || (who === 'player') && !defender.alive())
      {
        //enemyActivePoke is dead

        if (catchEnabled || enemy.activePoke().shiny()) {
          dom.gameConsoleLog('Trying to catch ' + enemy.activePoke().pokeName() + '...', 'purple')
          const selectedBall = (enemy.activePoke().shiny() ? player.bestAvailableBall() : player.selectedBall())
          if (player.consumeBall(selectedBall)) {
            dom.renderBalls(player.ballsAmmount())
            const rngHappened =
              RNG(
                player.addPoke.bind(null, enemy.activePoke())
              , (enemy.activePoke().catchRate() * player.ballRNG(selectedBall)) / 3
              )
            if (rngHappened) {
              dom.gameConsoleLog('You caught ' + enemy.activePoke().pokeName() + '!!', 'purple')
              player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 7 : 2))
              renderView(dom, enemy, player)
            } else {
              dom.gameConsoleLog(enemy.activePoke().pokeName() + ' escaped!!', 'purple')
            }
          }
        }

        const ballsAmmount = Math.floor(Math.random() * 10) + 1
        const ballName = randomArrayElement(['pokeball', 'pokeball', 'pokeball', 'pokeball', 'pokeball', 'pokeball', 'greatball', 'greatball', 'ultraball'])
        const rngHappened2 =
          RNG(
            player.addBalls.bind(
              null,
              ballName,
              ballsAmmount
            )
          , 10
          )
        if (rngHappened2) {
          dom.gameConsoleLog('You found ' + ballsAmmount + ' ' + ballName + 's!!', 'purple')
          dom.renderBalls(player.ballsAmmount())
        }

        const beforeExp = player.pokemons().map((poke) => poke.level())
        const expToGive = (enemyActivePoke.baseExp() / 16) + (enemyActivePoke.level() * 3)
        playerActivePoke.giveExp(expToGive)
        dom.gameConsoleLog(playerActivePoke.pokeName() + ' won ' + Math.floor(expToGive) + 'xp', 'rgb(153, 166, 11)')
        player.pokemons().forEach((poke) => poke.giveExp((enemyActivePoke.baseExp() / 100) + (enemyActivePoke.level() / 10)))
        const afterExp = player.pokemons().map((poke) => poke.level())

        if (beforeExp.join('') !== afterExp.join('')) {
          dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
        }

        player.savePokes()
        enemy.generateNew(ROUTES[currentRegionId][currentRouteId])
        enemyActivePoke = enemy.activePoke()
        player.addPokedex(enemy.activePoke().pokeName(), (enemy.activePoke().shiny() ? 4 : 1))
        enemyTimer()
        playerTimer()
        dom.renderPokeOnContainer('player', player.activePoke(), 'back')
        dom.renderPokeDex('playerPokes', player.pokedexData())
      } else {
        dom.gameConsoleLog(playerActivePoke.pokeName() + ' Fainted! ')
        const playerLivePokesIndexes = player.pokemons().filter((poke, index) => {
          if (poke.alive()) {
            return true
          }
        })
        if (playerLivePokesIndexes.length > 0) {
          player.setActive(player.pokemons().indexOf(playerLivePokesIndexes[0]))
          playerActivePoke = player.activePoke()
          dom.gameConsoleLog('Go ' + playerActivePoke.pokeName() + '!')
          refresh()
        }
        dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
      }
      dom.renderPokeOnContainer('enemy', enemy.activePoke())
    }
  }
  const init = () => {
    playerTimer()
    enemyTimer()
  }
  const stop = () => {
    window.clearTimeout(playerTimerId)
    window.clearTimeout(enemyTimerId)
  }
  const refresh = () => {
    stop()
    init()
  }
  return {
    init: init
  , stop: stop
  , changePlayerPoke: (newPoke) => {
      playerActivePoke = newPoke
      refresh()
    }
  , changeEnemyPoke: (newPoke) => {
      enemyActivePoke = newPoke
      refresh()
    }
  , refresh: refresh
  , changeCatch: (shouldCatch) => catchEnabled = shouldCatch
  }
}

const renderView = (dom, enemy, player) => {
  dom.renderPokeOnContainer('enemy', enemy.activePoke())
  dom.renderPokeOnContainer('player', player.activePoke(), 'back')
  dom.renderPokeList('playerPokes', player.pokemons(), player, '#enableDelete')
  dom.renderPokeDex('playerPokes', player.pokedexData())
}


// main

const enemy = makeEnemy()
enemy.generateNew(ROUTES[currentRegionId][currentRouteId])

const player = makePlayer()
if (localStorage.getItem(`totalPokes`) !== null) {
  player.loadPokes()
} else {
  var starterPoke = makePoke(pokeById(randomArrayElement([1, 4, 7])), 5)
  player.addPoke(starterPoke)
  player.addPokedex(starterPoke.pokeName(), 2)
}

const dom = makeDomHandler()
dom.renderRouteList('areasList', ROUTES[currentRegionId])
dom.renderBalls(player.ballsAmmount())
const combatLoop = makeCombatLoop(enemy, player, dom)
const userInteractions = makeUserInteractions(player, enemy, dom, combatLoop)

renderView(dom, enemy, player)

combatLoop.init()

requestAnimationFrame(function renderTime() {
  dom.renderHeal(player.canHeal())
  requestAnimationFrame(renderTime)
})
