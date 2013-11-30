/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function openOptionsDialog(aPaneID, aTabID, aOtherArgs)
{
  let win = Services.wm.getMostRecentWindow("Mail:Preferences");
  if (win) {
    // the dialog is already open
    win.focus();
    if (aPaneID) {
      let prefWindow = win.document.getElementById("MailPreferences");
      win.selectPaneAndTab(prefWindow, aPaneID, aTabID);
    }
  } else {
    // the dialog must be created
    let instantApply = Services.prefs
                               .getBoolPref("browser.preferences.instantApply");
    let features = "chrome,titlebar,toolbar,centerscreen" +
                   (instantApply ? ",dialog=no" : ",modal");

    openDialog("chrome://messenger/content/preferences/preferences.xul",
               "Preferences", features, aPaneID, aTabID, aOtherArgs);
  }
}

function CalendarToolboxCustomizeInit(aToolboxChanged) {
    
}

function CalendarCustomizeToolbar() {
  // Disable the toolbar context menu items
  var menubar = document.getElementById("main-menubar");
  for (var i = 0; i < menubar.childNodes.length; ++i) {
    menubar.childNodes[i].setAttribute("disabled", true);
  }

  var cmd = document.getElementById("cmd_CustomizeToolbars");
  cmd.setAttribute("disabled", "true");

  window.openDialog("chrome://global/content/customizeToolbar.xul", "CustomizeToolbar",
                    "chrome,all,dependent", document.getElementById("calendar-toolbox"));
}

function CalendarToolboxCustomizeDone(aToolboxChanged) {
  // Re-enable parts of the UI we disabled during the dialog
  var menubar = document.getElementById("main-menubar");
  for (var i = 0; i < menubar.childNodes.length; ++i) {
    menubar.childNodes[i].setAttribute("disabled", false);
  }
  var cmd = document.getElementById("cmd_CustomizeToolbars");
  cmd.removeAttribute("disabled");

  // XXX Shouldn't have to do this, but I do
  window.focus();
}
