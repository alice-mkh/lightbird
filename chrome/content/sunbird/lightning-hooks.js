/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var gCurrentMode = 'calendar';
var agendaListbox = {
    today: {
        start: ""
    }
};

function isSunbird() {
    return true;
}

function ltnSwitchCalendarView(aType, aShow) {
    sbSwitchToView(aType);
}

function switchCalendarView(aType, aShow) {
    sbSwitchToView(aType);
}

/*
calendarController.isCalendarInForeground = function lightbird_isCalendarInForeground() {
    return true;
}

calendarController.isInMode = function lightbird_isInMode(mode) {
    return mode == "calendar";
}
*/
function injectCalendarCommandController() {
    // On Sunbird, we also need to set up our hacky command controller.
    top.controllers.insertControllerAt(0, calendarController2);

    // This needs to be done for all applications
    top.controllers.insertControllerAt(0, calendarController);
    document.commandDispatcher.updateCommands("calendar_commands");
}

function minimonthPick(aNewDate) {
  let cdt = cal.jsDateToDateTime(aNewDate, currentView().timezone);
  cdt.isDate = true;
  currentView().goToDay(cdt);

  // update date filter for task tree
  let tree = document.getElementById("unifinder-todo-tree");
  tree.updateFilter();
}

function changeContextMenuForTask (aEvent) {
    handleTaskContextMenuStateChange(aEvent);

    let idnode = document.popupNode.id;
    let items = getSelectedTasks(aEvent);
    document.getElementById("task-context-menu-new").hidden = false;
    document.getElementById("task-context-menu-modify").hidden = false;
    document.getElementById("task-context-menu-new-todaypane").hidden = true;
    document.getElementById("task-context-menu-modify-todaypane").hidden = true;
    document.getElementById("task-context-menu-filter-todaypane").hidden = true;
    document.getElementById("task-context-menu-separator-filter").hidden = true;

    let tasksSelected = (items.length > 0);
    applyAttributeToMenuChildren(aEvent.target, "disabled", (!tasksSelected));
    if (calendarController.isCommandEnabled("calendar_new_todo_command") &&
        calendarController.isCommandEnabled("calendar_new_todo_todaypane_command")) {
        document.getElementById("calendar_new_todo_command").removeAttribute("disabled");
        document.getElementById("calendar_new_todo_todaypane_command").removeAttribute("disabled");
    } else {
        document.getElementById("calendar_new_todo_command").setAttribute("disabled", "true");
        document.getElementById("calendar_new_todo_todaypane_command").setAttribute("disabled", "true");
    }

    // make sure the paste menu item is enabled
    goUpdateCommand("cmd_paste");
    goUpdateCommand("cmd_cut");
    
    // make sure the filter menu is enabled
    document.getElementById("task-context-menu-filter-todaypane").removeAttribute("disabled");
    applyAttributeToMenuChildren(document.getElementById("task-context-menu-filter-todaypane-popup"),
                                 "disabled", false);

    changeMenuForTask(aEvent);

    let menu = document.getElementById("task-context-menu-attendance-menu");
    setupAttendanceMenu(menu, items);
}

function prepareCalendarToDoUnifinder() {
    document.getElementById("todo-label").removeAttribute("collapsed");

    // add listener to update the date filters
    getViewDeck().addEventListener("dayselect", updateCalendarToDoUnifinder, false);

    updateCalendarToDoUnifinder();
}
