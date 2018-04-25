### About Hensomerce

A home screen replacement for Google Chrome. Add your bookmark folders to newtab.

* Masonry layout
* Light/Dark theme
* 🐔🐔🐔
* No extra config, just choose from your existing folders

Check it out in the Chrome store [over here](https://chrome.google.com/webstore/detail/hensomerce/dbpikcbcjmflnbajhdogklogpjineaek).

---

### Development
This software is not in active development but it might get the occasional updates. There are no blocking bugs in the build but feel free to report any in the issues section.

Some things that could be improved:

* [ ] Drag and drop support to rearrange items. Drag and drop support is already implemented (draggabilly / commented out) but it needs state saving and restoring.
* [ ] The chrome listeners for bookmark changes should be moved to a separate script that is run permanently in the background instead of just on the new tab page.
* [ ] Fix order of items in a list and add listener for items reordered in the Chrome UI. Right now the order is given by how the data is stored by Chrome.
* [x] Add support to change color of list header
* [x] Fix svg scale issue on transition

### Build
`npm run watch` - development build

`npm run build` - production build

If you like extension this and want to improve it, go ahead. Pull requests welcome.

### Credits

Made with [Vue](https://github.com/vuejs/vue), [Keen-Ui](https://github.com/JosephusPaye/Keen-UI), [Material Icons](https://material.io/icons/).

Hen icon by [Iconic](https://thenounproject.com/iconproducer/) from the [Noun Project](https://thenounproject.com/) (CC BY 3.0).
