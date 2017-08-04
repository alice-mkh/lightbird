/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Called from calendar.xul window onload.
 */

var gBrandBundle;

function calendarInit() {
    document.getElementById("tabmail").currentTabInfo = {
      mode: {
        type: "calendarTask"
      }
    };

    // Take care of common initialization
    commonInitCalendar();

    var toolbox = document.getElementById("calendar-toolbox");
    toolbox.customizeInit = CalendarToolboxCustomizeInit;
    toolbox.customizeDone = CalendarToolboxCustomizeDone;

    // Setup the offline manager
    calendarOfflineManager.init();

    // Handle commandline args
    if (window.arguments) {
        for (var i = 0; i < window.arguments.length; i++) {
            try {
                var cl = window.arguments[i].QueryInterface(Components.interfaces.nsICommandLine);
            } catch (ex) {
                dump("unknown argument passed to main window\n");
                continue;
            }
            handleCommandLine(cl);
        }
    }

    gBrandBundle = document.getElementById("bundle_brand");

    // Opening or focusing calendar window should reset alarm notification
    // on taskbar or toolbar button
    window.addEventListener("focus", () => {
      Components.classes["@lightbird/alarm-service;1"].getService()
          .wrappedJSObject.calendarWindowFocused();
    });
}

function handleCommandLine(aComLine) {
    var comLine = aComLine;
    var calurl = [];

    var validFlags = ["showdate", "subscribe", "url"];
    var flagsToProcess = [];

    for (var flag of validFlags) {
        if (comLine.findFlag(flag, false) >= 0) {
            flagsToProcess.push(flag);
        }
    }

    for (var flag of flagsToProcess) {
        var param = comLine.handleFlagWithParam(flag, false);

        switch (flag) {
            case "showdate":
                currentView().goToDay(cal.jsDateToDateTime(new Date(param)));
                break;
            case "subscribe":
            case "url":
                // Double-clicking an .ics file on the Mac causes
                // LaunchServices to launch Sunbird with the -url command line
                // switch like so:
                // sunbird-bin -url file://localhost/Users/foo/mycal.ics -foreground
                calurl.push(param);
                break;
           default:
                // no-op
                break;
        }
    }

    // Look for arguments without a flag.
    // This is needed to handle double-click on Windows and Linux.
    if (comLine.length >= 1) {
        for (var i = 0; i < comLine.length; i++) {
            if (!comLine.getArgument(i).match(/^-/) &&
                !comLine.getArgument(i).match(/^\s/)) {
                calurl.push( comLine.getArgument(i) );
            } else {
                comLine.removeArguments(i, i);
            }
        }
    }

    //subscribe to all files in the calurl array
    for (var i = 0; i < calurl.length; i++) {
        var uri = comLine.resolveURI(calurl[i]);
        var calendar = getCalendarManager().createCalendar("ics", uri);

        // Strip ".ics" from filename for use as calendar name
        var fullPathRegEx = new RegExp("([^/:]+)[.]ics$");
        var path = uri.path;
        var prettyName = path.match(fullPathRegEx);

        var name;
        if (prettyName && prettyName.length >= 1) {
            name = decodeURIComponent(prettyName[1]);
        } else {
            name = calGetString("calendar", "untitledCalendarName");
        }
        calendar.name = name;

        getCalendarManager().registerCalendar(calendar);
    }
}

/* Called at midnight to tell us to update the views and other ui bits */
function refreshUIBits() {
    try {
        currentView().goToDay(now());
        refreshEventTree();
    } catch (exc) {
        ASSERT(false, exc);
    }

    // and schedule again...
    scheduleMidnightUpdate(refreshUIBits);
}

/**
 * Steps to be taken when the sunbird calendar window is unloaded.
 */
function calendarFinish() {
    // Workaround to make the selected tab persist. See bug 249552.
    var tabbox = document.getElementById("tablist");
    tabbox.setAttribute("selectedIndex", tabbox.selectedIndex);

    // Finish the offline manager
    calendarOfflineManager.uninit();

    // Common finish steps
    commonFinishCalendar();
}

function closeCalendar() {
    self.close();
}


function CalendarToolboxCustomizeInit(aToolboxChanged) {
  toolboxCustomizeInit("main-menubar");
}

function CalendarToolboxCustomizeDone(aToolboxChanged) {
  // Re-enable parts of the UI we disabled during the dialog
  toolboxCustomizeDone("main-menubar", document.getElementById("calendar-toolbox"), aToolboxChanged);

  // XXX Shouldn't have to do this, but I do
  window.focus();
}

function changeNumberOfWeeks(menuitem) {
  currentView().weeksInView = menuitem.value;
}

function pickAndGoToDate() {
  var initialDate = currentView().selectedDay.getInTimezone(floating()).jsDate;
  var callback = function receiveAndGoToDate(pickedDate) {
    currentView().goToDay(cal.jsDateToDateTime(pickedDate));
    getMinimonth().value = pickedDate;
  };
  openDialog("chrome://lightbird/content/sunbird/calendar-gotodate-dialog.xul",
             "CalendarGoToDateDialog",
             "chrome,modal,resizable=no,centerscreen",
             {callback: callback, date: initialDate});
}

function sbSwitchToView(newView) {
  var mwWeeksCommand = document.getElementById("menu-numberofweeks-inview");
  if (newView == "multiweek") {
      mwWeeksCommand.removeAttribute("disabled");
  } else {
      mwWeeksCommand.setAttribute("disabled", true);
  }

  // Call the common view switching code in calendar-views.js
  switchToView(newView);
}
