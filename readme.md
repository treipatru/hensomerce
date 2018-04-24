### Hensomerce

A home screen replacement for Google Chrome. Add your bookmark folders to newtab.

* Masonry layout
* Light/Dark theme
* 🐔🐔🐔
* No extra config, just choose from your existing folders

Check it out in the Chrome store [over here](https://chrome.google.com/webstore/detail/hensomerce/dbpikcbcjmflnbajhdogklogpjineaek).

---

### About
I started developing this extension when I couldn't find a simple new tab replacement that would fit my needs. There are loads of them out there but I couldn't find one that got it right. I was mostly driven by these things:

* The extensions I've tried at the time needed a lot of extra configuration of the new tab content, often requiring the user to duplicate their bookmarks into the config of the extension. Hensomerce uses bookmark folders from Chrome.
* Others made it difficult to use on multiple computers at the same time. They sync settings and content across computers even though users might not want that. Hensomerce does not need to sync any data. Bookmarks are already synced by Chrome and the few settings available can be setup manually in a few seconds.
* The design can be bloated, containing all sorts of additional widgets as well as displaying items within _pretty_ designs that sometimes make it less functional. Hensomerce uses simple lists (with minimal styling).


### What's Next
This software was never intended to achieve a polished product state but rather to be decently functional. Additionally it was a way to further explore Vue and to have a look at the Chrome extension API. The extension is fully functional albeit missing some (non-critical) features. It is currently not in active development but it might be updated if time allows. Some of the possible improvements that could be done:

* [ ] Drag and drop support to rearrange items. Drag and drop support is already implemented (draggabilly / commented out) but it needs state saving and restoring.
* [ ] The chrome listeners for bookmark changes should be moved to a separate script that is run permanently in the background instead of just on the new tab page.
* [ ] Fix order of items in a list and add listener for items reordered in the Chrome UI. Right now the order is given by how the data is stored by Chrome.
* [ ] Add support to change color of list header
* [ ] Fix svg scale issue on transition

### Build
`npm run watch` - development build

`npm run build` - production build

If you like extension this and want to improve it, go ahead. Pull requests welcome.

### Credits

Made with [Vue](https://github.com/vuejs/vue), [Keen-Ui](https://github.com/JosephusPaye/Keen-UI), [Material Icons](https://material.io/icons/).

Hen icon by [Iconic](https://thenounproject.com/iconproducer/) from the [Noun Project](https://thenounproject.com/) (CC BY 3.0).
