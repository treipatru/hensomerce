// Folder coordinates
const source = 'asdcawe'
const destination = '#box1'
const parseDomain = /(http(|s):\/\/)(.[^\/]+)/
const parseOrigin = /\w+.\w+$/

let sourceInput = document.getElementById('source-input')



// Draw bookmarks from folder to node #id
function processData (folder, node) {
  chrome.bookmarks.search(folder, function (res) {
    if (res.length === 0) {
      toggleSection('no-data')
    }
    else if (res.length >= 1) {
      findFolder(res, renderBlock)
    }
  })
}

// Checks that there's only one folder with source name
// If true returns else displays duplicates
function findFolder (arr, callback) {
  let results = []

  for (elem of arr) {
    if (elem.title.toLowerCase() === source.toLowerCase()) {
      results.push(elem)
    }
  }

  if (results.length === 0) {
    toggleSection('no-data')
  }
  else if (results.length === 1) {
    chrome.bookmarks.getChildren(results[0].id, function (res) {
      if (res.length === 0) {
        toggleSection('no-bookmarks')
      }
      else {
        // All good, draw the block
        callback(results[0].id)
      }
    })
  }
  else if (results.length > 1){
    toggleSection('duplicates')
  }
}

// Draw a set of bookmarks from a folder
function renderBlock (id) {
  chrome.bookmarks.getChildren(id, function (res) {
    makeCards(res, destination)
    toggleSection('content', animate)
  })
}

// Flatten array, draw elements
function makeCards (arr, node) {
  for (elem of arr) {
    if (!elem.url) {
      chrome.bookmarks.getChildren(elem.id, function (res) {
        makeCards(res, node)
      })
    } else {
      drawCard(elem, node)
    }
  }
}

// Draw an element
function drawCard(data, node) {
  let domain = getDomain(data.url)
  $(node).append('<a href="'+ data.url + '" class="card el" id="' + data.id + '"></a>')
  $('#' + data.id).append('<img class="image el" src="' + domain +'/favicon.ico" onerror=emoji();>')
}

function getDomain (s) {
  let domain = s.match(parseDomain)[0]
  let origin = 'http://' + domain.match(parseOrigin)[0]
  return origin
}

function toggleSection (id, callback) {
  $('#' + id).toggleClass('hidden')
  if (typeof callback === "function") {
    callback()
  }
}

function animate () {
    var cardAnim = anime({
    targets: destination + ' .card.el',
    scale: [0.8, 1],
    elasticity: 800,
    duration: function() {
      return 700 + (Math.floor((Math.random() * 800) + 1));
    } 
  })

  var iconAnim = anime({
    targets: destination + ' .image.el',
    opacity: [0, 1],
    delay: 300,
    duration: function() {
      return 700 + (Math.floor((Math.random() * 200) + 1));
    }
  })
}

$(document).ready(function () {
  $('.source-name').text(source)
  processData(source, destination)
})