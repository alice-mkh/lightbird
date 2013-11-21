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