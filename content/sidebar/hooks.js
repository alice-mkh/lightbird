/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var currentViewObj = {
    selectedDay: null,
    getSelectedItems: function() {
        let tree = unifinderTreeView.treeElement;
        if (!tree.view.selection || tree.view.selection.getRangeCount() == 0) {
            return;
        }

        let selectedItems = [];
        gCalendarEventTreeClicked = true;

        // Get the selected events from the tree
        let start = {};
        let end = {};
        let numRanges = tree.view.selection.getRangeCount();

        for (let t = 0; t < numRanges; t++) {
            tree.view.selection.getRangeAt(t, start, end);

            for (let v = start.value; v <= end.value; v++) {
                try {
                    selectedItems.push(unifinderTreeView.getItemAt(v));
                } catch (e) {
                    WARN("Error getting Event from row: " + e + "\n");
                }
            }
        }

        return selectedItems;
    },
    setSelectedItems: function() {}
};

function currentView() {
    currentViewObj.selectedDay = now();
    return currentViewObj;
}

function ensureCalendarVisible(aCalendar) {
}

function loadCalendarManager() {
    let compositeCalendar = getCompositeCalendar();

    // Initialize our composite observer
    compositeCalendar.addObserver(compositeObserver);

    // Create the home calendar if no calendar exists.
    let calendars = cal.getCalendarManager().getCalendars({});
    if (!calendars.length) {
        initHomeCalendar();
    }
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
    goUpdateCommand("calendar_paste");
    goUpdateCommand("calendar_cut");

    // make sure the filter menu is enabled
    document.getElementById("task-context-menu-filter-todaypane").removeAttribute("disabled");
    applyAttributeToMenuChildren(document.getElementById("task-context-menu-filter-todaypane-popup"),
                                 "disabled", false);

    changeMenuForTask(aEvent);

    let menu = document.getElementById("task-context-menu-attendance-menu");
    setupAttendanceMenu(menu, items);
}
