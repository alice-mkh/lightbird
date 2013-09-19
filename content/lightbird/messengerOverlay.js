/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

Components.utils.import("resource://gre/modules/Services.jsm");
var prefs = Services.prefs.getBranch("extensions.lightbird.");
var cssService = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

const prefObserver = {
    observe: function(subject, topic, data) {
        if (topic != "nsPref:changed" || data != "disableLightningUI"){
            return;
        }
        let b = Services.prefs.getBoolPref("extensions.lightbird."+data);

        let uri = Services.io.newURI("chrome://lightbird/content/" + cssName + ".css", null, null);
        let b2 = cssService.sheetRegistered(uri, cssService.USER_SHEET);
        if (b == b2){
            return;
        }
        if (b){
            cssService.loadAndRegisterSheet(uri, cssService.USER_SHEET);
        }else{
            cssService.unregisterSheet(uri, cssService.USER_SHEET);
        }
    },
};

function lightbirdOnLoad() {
    prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
    prefs.addObserver("", prefObserver, false);
    prefObserver.observe("", "nsPref:changed", "disableLightningUI");

    addEventListener("unload", lightbirdOnUnload, false);
}

function lightbirdOnUnload() {
    prefs.removeObserver("", prefObserver);
}

addEventListener("load", lightbirdOnLoad, false);
