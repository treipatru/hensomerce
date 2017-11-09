// Folder coordinates
const source = 'PRJ'
const destination = '#box1'


function processData (folder, node) {
  chrome.bookmarks.search(folder, function (res) {
    if (res.length === 1) {
      chrome.bookmarks.getChildren(res[0].id, function(res) {
        if (res.length === 0) {
          toggleSection('no-data')
        } else {
          flattenBookmarks(res, node)
          toggleSection('content')
        }
      })
    } else if (res.length > 1 ) {
      toggleSection('duplicates')
    } else {
      toggleSection('no-data')
    }
  })
}

function drawCard(data, node) {
  $(node).append('<a href="'+ data.url + '" class="card" id="' + data.id + '"></a>')
  $('#' + data.id).append('<img src="#">')
}

function flattenBookmarks (arr,node) {
  for (elem of arr) {
    if (!elem.url) {
      chrome.bookmarks.getChildren(elem.id, function (res) {
        flattenBookmarks(res, node)
      })
    } else {
      drawCard(elem, node)
    }
  }
}

function toggleSection (id) {
  $('#' + id).toggleClass('hidden')
}


$(document).ready(function () {
  $('.source-name').text(source)
  processData(source, destination)
})