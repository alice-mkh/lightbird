/* -*- Mode: javascript; tab-width: 20; indent-tabs-mode: nil; c-basic-offset: 4 -*-
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");

const nsIWindowMediator = Components.interfaces.nsIWindowMediator;

function goToggleToolbar(id, elementID)
{
    var toolbar = document.getElementById(id);
    var element = document.getElementById(elementID);
    if (toolbar) {
        var isHidden = toolbar.hidden;
        toolbar.hidden = !isHidden;
        document.persist(id, 'hidden');
        if (element) {
            element.setAttribute("checked", isHidden ? "true" : "false");
            document.persist(elementID, 'checked');
        }
    }
}

/**
 * We recreate the View > Toolbars menu each time it is opened to include any
 * user-created toolbars.
 */
function sbOnViewToolbarsPopupShowing(aEvent)
{
    var popup = aEvent.target;
    var i;

    // Empty the menu
    for (i = popup.childNodes.length-1; i >= 0; i--) {
        var deadItem = popup.childNodes[i];
        if (deadItem.hasAttribute("toolbarindex")) {
            deadItem.removeEventListener("command", sbOnViewToolbarCommand, false);
            popup.removeChild(deadItem);
        }
    }

    var firstMenuItem = popup.firstChild;

    var toolbox = document.getElementById("calendar-toolbox");
    for (i = 0; i < toolbox.childNodes.length; i++) {
        var toolbar = toolbox.childNodes[i];
        var toolbarName = toolbar.getAttribute("toolbarname");
        var type = toolbar.getAttribute("type");
        if (toolbarName && type != "menubar") {
            var menuItem = document.createElement("menuitem");
            menuItem.setAttribute("toolbarindex", i);
            menuItem.setAttribute("type", "checkbox");
            menuItem.setAttribute("label", toolbarName);
            menuItem.setAttribute("accesskey", toolbar.getAttribute("accesskey"));
            menuItem.setAttribute("checked", toolbar.getAttribute("hidden") != "true");
            popup.insertBefore(menuItem, firstMenuItem);

            menuItem.addEventListener("command", sbOnViewToolbarCommand, false);
        }
    }
}

/**
 * Toggles the visibility of the associated toolbar when fired.
 */
function sbOnViewToolbarCommand(aEvent)
{
    var toolbox = document.getElementById("calendar-toolbox");
    var index = aEvent.originalTarget.getAttribute("toolbarindex");
    var toolbar = toolbox.childNodes[index];

    toolbar.hidden = (aEvent.originalTarget.getAttribute("checked") != "true");
    document.persist(toolbar.id, "hidden");
}
