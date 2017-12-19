// Wrapper for packery with drag and drop support from draggabilly
// Based on code from github.com/t-k-f/vue-packery-plugin
// Assumes draggabilly package exists

import Vue from 'vue'
import Packery from 'packery'
import Draggabilly from 'draggabilly'

const ADD = 'itemAdded'
const CHANGE = 'itemChange'
const REMOVE = 'itemRemoved'

const packeryEvents = new Vue({})
const packeryPlugin = () => {}

export default packeryPlugin

packeryPlugin.install = function (Vue, options)
{
    Vue.directive('packery', {
        bind (el, binding)
        {
            el.packery = new Packery(el, binding.value)

            const packeryDraw = node =>
            {
                if (!el.packery || !el.isSameNode(node))
                {
                    return
                }
                Vue.nextTick(() =>
                {
                    el.packery.reloadItems()
                    el.packery.layout()
                })
            }

            packeryEvents.$on(ADD, node =>
            {
                // Add to packery
                let parent = node.parentNode
                packeryDraw(parent)

                // Register drag event
                // let draggie = new Draggabilly( node )
                // el.packery.bindDraggabillyEvents( draggie )
            })

            packeryEvents.$on(CHANGE, node =>
            {
                packeryDraw(node)
            })

            packeryEvents.$on(REMOVE, node =>
            {
                packeryDraw(node)
            })
        },
        unbind (el)
        {
            el.packery.destroy()
            el.packery = null
        }
    })

    Vue.directive('packeryItem', {
        inserted (el)
        {
            packeryEvents.$emit(ADD, el)
        },
        componentUpdated (el)
        {
            packeryEvents.$emit(CHANGE, el.packeryNode)
        },
        unbind (el, binding, vnode)
        {
            packeryEvents.$emit(REMOVE, el.packeryNode)
        }
    })
}