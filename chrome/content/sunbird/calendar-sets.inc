# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

<broadcasterset id="calendar_broadcasters">
    <broadcaster id="Communicator:WorkMode"/>
    <broadcaster id="cmd_CustomizeToolbars"/>
</broadcasterset>

<commandset id="calendar_commands">
  <!-- These commands already exist in thunderbird -->
  <command id="cmd_close" oncommand="closeCalendar()"/>
  <command id="cmd_undo" oncommand="goDoCommand('cmd_undo')"/>
  <command id="cmd_redo" oncommand="goDoCommand('cmd_redo')"/>
  <command id="cmd_cut" oncommand="goDoCommand('cmd_cut')"/>
  <command id="cmd_copy" oncommand="goDoCommand('cmd_copy')"/>
  <command id="cmd_paste" oncommand="goDoCommand('cmd_paste')"/>
  <command id="cmd_find" oncommand="focusSearch();"/>
  <command id="cmd_selectAll" oncommand="goDoCommand('cmd_selectAll')"/>
  <command id="cmd_pageSetup" oncommand="goDoCommand('cmd_pageSetup')"/>
  <command id="cmd_print" oncommand="goDoCommand('cmd_print')"/>
  <command id="cmd_fullZoomReduce" oncommand="goDoCommand('cmd_fullZoomReduce')"/>
  <command id="cmd_fullZoomEnlarge" oncommand="goDoCommand('cmd_fullZoomEnlarge')"/>
  <command id="cmd_fullZoomReset" oncommand="goDoCommand('cmd_fullZoomReset')"/>

  <command id="cmd_showStatusBar" oncommand="goToggleToolbar('status-bar', 'menu_showStatusBar');"/>
  <command id="cmd_showTaskBox" oncommand="goToggleToolbar('todo-tab-panel', 'menu_showTaskBox'); goToggleToolbar('calendar-todo-splitter');"/>

  <!-- Sunbird specific commands -->
  <command id="open_local_calendar_command" oncommand="openLocalCalendar()"/>

  <command id="go_date_command" oncommand="pickAndGoToDate()"/>

  <command id="close_calendar_command" oncommand="closeCalendar()"/>
  <command id="calendar_go_to_today_command" oncommand="goToDate(now())"/>

<!--
  <command id="minimizeWindowCmd" oncommand="window.minimize();"/>
-->
</commandset>

<keyset id="calendar-keys">
  <key id="calendar-new-event-key" key="&event.new.event.key;"             observes="calendar_new_event_command"  modifiers="accel"/>
  <key id="calendar-new-todo-key" key="&event.new.task.key;"              observes="calendar_new_todo_command"   modifiers="accel"/>
  <key id="modify_event_key"     key="&event.edit.event.key;"            observes="calendar_modify_event_command"  modifiers="accel"/>
  <key id="new_calendar_key"     key="&calendar.new.server.key;"         observes="calendar_new_calendar_command"  modifiers="accel"/>
  <key id="open_calendar_key"    key="&calendar.open.file.key;"          observes="open_local_calendar_command" modifiers="accel"/>
  <key id="key_close"/>
  <key id="key_print"/>

  <key id="key_undo"/>
  <key id="key_redo"/>

  <key id="key_cut"/>
  <key id="key_copy"/>
  <key id="key_paste"/>
  <key id="key_selectAll"/>

  <key id="go_to_date_key"       keycode="VK_UP"                         observes="go_date_command"             modifiers="accel"/>

  <key id="import_key"           key="&calendar.import.key;"             observes="calendar_import_command"              modifiers="accel"/>
  <key id="reload_server_key"    key="&calendar.synccalendars.key;"      observes="calendar_reload_remote_calendars"  modifiers="accel"/>

# TODO L10N These keys need localization
  <key id="key_fullZoomReduce"   key="-"                                 observes="cmd_fullZoomReduce"          modifiers="accel"/>
  <key id="key_fullZoomEnlarge"  key="+"                                 observes="cmd_fullZoomEnlarge"         modifiers="accel"/>
  <key id="key_fullZoomEnlarge2" key="="                                 observes="cmd_fullZoomEnlarge"         modifiers="accel"/>
  <key id="key_fullZoomReset"    key="0"                                 observes="cmd_fullZoomReset"           modifiers="accel"/>

  <key id="find_key"
       key="&sunbird.find.key;"
       modifiers="accel"
       oncommand="focusSearch();"/>

<!--
  <key id="key_minimizeWindow"   key="&minimizeWindow.key;"              command="minimizeWindow"               modifiers="accel"/>
  <key id="key_preferencesCmdMac" key="&preferencesCmdMac.commandkey;" modifiers="&preferencesCmdMac.modifiers;"/>
  <key id="key_hideThisAppCmdMac" key="&hideThisAppCmdMac.commandkey;" modifiers="&hideThisAppCmdMac.modifiers;"/>
  <key id="key_hideOtherAppsCmdMac" key="&hideOtherAppsCmdMac.commandkey;" modifiers="&hideOtherAppsCmdMac.modifiers;"/>
-->
</keyset>

<keyset id="tasksKeys"/>
