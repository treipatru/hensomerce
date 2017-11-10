// Folder coordinates
const source = 'prj'
const destination = '#box1'
const parseUrl = /(http:|https:\/\/)((www\.)?(\w|\d)+.+?\/)/
const parseReverseDomain = /\/(\w|\d)+.(\w|\d)+/

const imageFiles = [ 'favicon.ico' ]


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
    toggleSection('content')
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
  let url = data.url.match(parseUrl)
  let domain = getDomain(url[0])
  let origin = url[1] + domain
  
  $(node).hide().append('<a href="'+ url[0] + '" class="card" id="' + data.id + '"></a>')


  $('#' + data.id).append('<img src="' + origin +'favicon.ico">')

  // $('#' + data.id).append('<img src="' + domain[0]+'favicon.ico">')
}

function toggleSection (id) {
  $('#' + id).toggleClass('hidden')
}

function getDomain (s) {
    let rev = s.split("").reverse().join("")
    let match = rev.match(parseReverseDomain)
    let domain = match[0].split("").reverse().join("")
    return domain
}


$(document).ready(function () {
  $('.source-name').text(source)
  processData(source, destination)
})