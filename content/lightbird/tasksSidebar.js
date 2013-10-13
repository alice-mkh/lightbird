/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://calendar/modules/calUtils.jsm");

var gCurrentMode = 'tasks';

var TasksSidebar = {
    onLoad: function onLoad() {
        updateCalendarToDoUnifinder();
        calendarUpdateNewItemsCommand();
        calendarController.updateCommands();
        calendarController2.updateCommands();
    },

    onUnload: function onUnload() {
    }
};

window.addEventListener("load", TasksSidebar.onLoad, false);
window.addEventListener("unload", TasksSidebar.onUnload, false);

function currentView(){
    var view = new Object();
    view.selectedDay = cal.now();
    return view;
}


function ensureCalendarVisible(aCalendar) {}
