/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://calendar/modules/calUtils.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

var calendarSidebarController = {
    commands: {
        "calendar_cut": true,
        "calendar_copy": true,
        "calendar_paste": true,
    },
    updateCommands: function () {
        for (var command in this.commands) {
            goUpdateCommand(command);
        }
    },

    supportsCommand: function (aCommand) {
        if (aCommand in this.commands) {
            return true;
        }
        return false;
    },
    onEvent: function (aEvent) {
    },
    isCommandEnabled: function (aCommand) {
        switch (aCommand) {
            // Thunderbird Commands
            case "calendar_cut":
                return calendarController.selected_items_writable;
            case "calendar_copy":
                return calendarController.item_selected;
            case "calendar_paste":
                return canPaste();
            default:
                return true;
        }
    },
    doCommand: function (aCommand) {
        switch (aCommand) {
            case "calendar_cut":
                cutToClipboard();
                break;
            case "calendar_copy":
                copyToClipboard();
                break;
            case "calendar_paste":
                pasteFromClipboard();
                break;
        }
    }
};

function injectCalendarCommandController2() {
    // On Sunbird, we also need to set up our hacky command controller.
    while (top.controllers.getControllerCount() > 0)
      top.controllers.removeControllerAt(0);

    top.controllers.insertControllerAt(0, calendarSidebarController);

    // This needs to be done for all applications
    top.controllers.insertControllerAt(0, calendarController);
    document.commandDispatcher.updateCommands("calendar_commands");
}

function startup() {
    loadCalendarManager();
    prepare();
    injectCalendarCommandController2();
    calendarUpdateNewItemsCommand();
}
function shutdown() {
    unloadCalendarManager();
    finish();
    removeCalendarCommandController();
}

function updateClipboardCommands() {
    let commands = ["calendar_cut",
                    "calendar_copy",
                    "calendar_paste"];
    for each (let command in commands) {
        goUpdateCommand(command);
    }
}

window.addEventListener("load", startup, false);
window.addEventListener("unload", shutdown, false);
