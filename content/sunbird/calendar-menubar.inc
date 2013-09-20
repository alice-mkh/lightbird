# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

     <menubar id="main-menubar" style="border:0px;padding:0px;margin:0px;-moz-appearance:none">
       <menu id="menu_File"
             label="&fileMenu.label;"
             accesskey="&fileMenu.accesskey;">
         <menupopup id="menu_FilePopup">

           <!-- create new event or task (top of 1st menu, for new users) -->
           <menuitem id="calendar-new-event-menu"
                     key="calendar-new-event-key"
                     label="&event.new.event;"
                     accesskey="&event.new.event.accesskey;"
                     observes="calendar_new_event_command"/>
           <menuitem id="calendar-new-todo-menu"
                     key="calendar-new-todo-key"
                     label="&event.new.task;"
                     accesskey="&event.new.task.accesskey;"
                     observes="calendar_new_todo_command"/>
           <menuitem id="calendar-new-calendar-menu"
                     key="new_calendar_key"
                     label="&calendar.new.server.label;"
                     accesskey="&calendar.new.server.accesskey;"
                     observes="calendar_new_calendar_command"/>
           <menuitem id="calendar-open-calendar-menu"
                     key="open_calendar_key"
                     label="&calendar.open.file.label;"
                     accesskey="&calendar.open.file.accesskey;"
                     observes="open_local_calendar_command"/>
           <menuitem id="calendar-addserver-menu"
                     label="&calendar.subscribe.label;"
                     accesskey="&calendar.subscribe.accesskey;"
                     observes="calendar_new_calendar_command"/>
           <menuitem id="menu_close"/>
           <menuseparator id="calendar-new-sep"/>

           <!-- import: pulling data into existing files -->
           <menuitem id="calendar-import-menu"
                     key="import_key"
                     label="&calendar.import.label;"
                     accesskey="&calendar.import.accesskey;"
                     observes="calendar_import_command"/>
           <!-- export: getting data out of existing files -->
           <menuitem id="calendar-export-menu"
                     label="&calendar.export.selection.label;"
                     accesskey="&calendar.export.selection.accesskey;"
                     observes="calendar_export_selection_command"/>
           <menuitem id="calendar-export-calendar-menu"
                     label="&sunbird.export.calendar.label;"
                     accesskey="&sunbird.export.calendar.accesskey;"
                     observes="calendar_export_command"/>
           <menuseparator id="calendar-importexport-sep"/>
           <menuitem id="calendar-publish-menu"
                     label="&calendar.publish.selection.label;"
                     accesskey="&calendar.publish.selection.accesskey;"
                     observes="calendar_publish_selected_events_command"/>
           <menuitem id="calendar-publish-calendar-menu"
                     label="&calendar.publish.calendar.label;"
                     accesskey="&calendar.publish.calendar.accesskey;"
                     observes="calendar_publish_calendar_command"/>
           <menuseparator id="calendar-publish-sep"/>

           <menuitem id="calendar-synccalendars-menu"
                     key="reload_server_key"
                     label="&calendar.synccalendars.label;"
                     accesskey="&calendar.synccalendars.accesskey;"
                     observes="calendar_reload_remote_calendars"/>
           <menuseparator id="calendar-reload-sep"/>

           <menuitem id="calendar-page-setup-menu"
                     label="&calendar.pagesetup.label;"
                     accesskey="&calendar.pagesetup.accesskey;"
                     observes="cmd_pageSetup"/>
           <menuitem id="calendar-print-menu"
                     key="key_print"
                     label="&calendar.print.label;"
                     accesskey="&calendar.print.accesskey;"
                     observes="cmd_print"/>
           <menuseparator id="calendar-print-sep"/>
           <menuitem id="offlineGoOfflineCmd"/>
           <menuseparator id="menu_FileQuitSeparator"/>
         </menupopup>
       </menu>

       <menu id="menu_Edit"
             label="&editMenu.label;"
              accesskey="&editMenu.accesskey;">
         <menupopup id="mppEdit">
           <menuitem id="calendar-undo-menu"
                     key="key_undo"
                     accesskey="&calendar.undo.accesskey;"
                     label="&calendar.undo.label;"
                     observes="cmd_undo"/>
           <menuitem id="calendar-redo-menu"
                     key="key_redo"
                     accesskey="&calendar.redo.accesskey;"
                     label="&calendar.redo.label;"
                     observes="cmd_redo"/>
           <menuseparator id="before-undo-Section"/>
           <menuitem id="calendar-cut-menu"
                     key="key_cut"
                     label="&calendar.cut.label;"
                     accesskey="&calendar.cut.accesskey;"
                     observes="cmd_cut"/>
           <menuitem id="calendar-copy-menu"
                     key="key_copy"
                     label="&calendar.copy.label;"
                     accesskey="&calendar.copy.accesskey;"
                     observes="cmd_copy"/>
           <menuitem id="calendar-paste-menu"
                     key="key_paste"
                     label="&calendar.paste.label;"
                     accesskey="&calendar.paste.accesskey;"
                     observes="cmd_paste"/>
           <menuitem id="unifinder-modify-menu"
                     key="modify_event_key"
                     label="&event.edit.event;"
                     accesskey="&event.edit.event.accesskey;"
                     observes="calendar_modify_focused_item_command"/>
           <menuitem id="unifinder-remove-event-menu"
                     label="&event.delete.event;"
                     accesskey="&event.delete.event.accesskey;"
                     observes="calendar_delete_event_command"/>
           <menuitem id="unifinder-remove-task-menu"
                     label="&event.delete.tasks;"
                     accesskey="&event.delete.tasks.accesskey;"
                     observes="calendar_delete_todo_command" />
           <menuitem id="calendar-selectall-menu"
                     key="key_selectAll"
                     label="&calendar.selectall.label;"
                     accesskey="&calendar.selectall.accesskey;"
                     observes="cmd_selectAll"/>
           <menuseparator id="before-Unifinder-Section"/>
           <menuitem id="calendar-show-unifinder-menu"
                     type="checkbox"
                     label="&showUnifinderCmd.label;"
                     observes="calendar_show_unifinder_command"
                     accesskey="&showUnifinderCmd.accesskey;"
                     checked="true"/>
           <menuseparator id="menu_PrefsSeparator"/>
           <menuitem id="menu_preferences" oncommand="goPreferences('calendar_pane')"/>
         </menupopup>
       </menu>

       <menu id="menu_View"
             label="&viewMenu.label;"
             accesskey="&viewMenu.accesskey;">
         <menupopup id="menu_viewPopup">
            <menu id="menu_Toolbars">
             <menupopup id="view_toolbars_popup"
                        onpopupshowing="onViewToolbarsPopupShowing(event);"
                        oncommand="onViewToolbarCommand(event);"/>
           </menu>
           <menuitem id="menu_showStatusBar"
                     type="checkbox"
                     label="&showStatusBarCmd.label;"
                     command="cmd_showStatusBar"
                     accesskey="&showStatusBarCmd.accesskey;"
                     checked="true"/>
           <menuitem id="menu_showTaskBox"
                     type="checkbox"
                     label="&showTaskBoxCmd.label;"
                     command="cmd_showTaskBox"
                     accesskey="&showTaskBoxCmd.accesskey;"
                     checked="true"/>
           <menuseparator/>
           <menuitem id="calendar-view-menu-day"
                     type="radio"
                     name="calendarMenuViews"
                     key="calendar-day-view-key"
                     label="&sunbird.flat.topbar.dayview;"
                     accesskey="&sunbird.dayview.accesskey;"
                     observes="calendar_day-view_command"/>
           <menuitem id="calendar-view-menu-week"
                     type="radio"
                     name="calendarMenuViews"
                     key="calendar-week-view-key"
                     label="&sunbird.flat.topbar.weekview;"
                     accesskey="&sunbird.weekview.accesskey;"
                     observes="calendar_week-view_command"/>
           <menuitem id="calendar-view-menu-multiweek"
                     type="radio"
                     name="calendarMenuViews"
                     key="calendar-multiweek-view-key"
                     label="&sunbird.flat.topbar.multiweekview;"
                     accesskey="&sunbird.multiweekview.accesskey;"
                     observes="calendar_multiweek-view_command"/>
           <menuitem id="calendar-view-menu-month"
                     type="radio"
                     name="calendarMenuViews"
                     key="calendar-month-view-key"
                     label="&sunbird.flat.topbar.monthview;"
                     accesskey="&sunbird.monthview.accesskey;"
                     observes="calendar_month-view_command"/>
           <menuseparator/>
           <menuitem id="calendar_view_orientation"
                     type="checkbox"
                     label="&calendar.orientation.label;"
                     accesskey="&calendar.orientation.accesskey;"
                     observes="calendar_toggle_orientation_command"/>
           <menuitem id="only-workday-checkbox-1"
                     type="checkbox"
                     label="&calendar.onlyworkday.checkbox.label;"
                     accesskey="&calendar.onlyworkday.checkbox.accesskey;"
                     observes="calendar_toggle_workdays_only_command"/>
           <menuitem id="display-todo-inview-checkbox-1"
                     type="checkbox"
                     label="&calendar.displaytodos.checkbox.label;"
                     accesskey="&calendar.displaytodos.checkbox.accesskey;"
                     observes="calendar_toggle_tasks_in_view_command"/>
           <menuitem id="completed-tasks-inview-checkbox-1"
                     type="checkbox"
                     label="&calendar.completedtasks.checkbox.label;"
                     accesskey="&calendar.completedtasks.checkbox.accesskey;"
                     observes="calendar_toggle_show_completed_in_view_command"/>
           <menu id="menu-numberofweeks-inview"
                 label="&sunbird.menu.numberofweeks.label;"
                 accesskey="&sunbird.menu.numberofweeks.accesskey;"
                 oncommand="changeNumberOfWeeks(event.target)"
                 disabled="true">
           <menupopup onpopupshowing="this.childNodes.item(currentView().weeksInView - 1).setAttribute('checked', true);">
             <menuitem type="radio"
                       value="1"
                       name="menunbofweeks"
                       accesskey="1"
                       label="&sunbird.menu.numberofweeks.1;"/>
             <menuitem type="radio"
                       value="2"
                       name="menunbofweeks"
                       accesskey="2"
                       label="&sunbird.menu.numberofweeks.2;"/>
             <menuitem type="radio"
                       value="3"
                       name="menunbofweeks"
                       accesskey="3"
                       label="&sunbird.menu.numberofweeks.3;"/>
             <menuitem type="radio"
                       value="4"
                       name="menunbofweeks"
                       accesskey="4"
                       label="&sunbird.menu.numberofweeks.4;"/>
             <menuitem type="radio"
                       value="5"
                       name="menunbofweeks"
                       accesskey="5"
                       label="&sunbird.menu.numberofweeks.5;"/>
             <menuitem type="radio"
                       value="6"
                       name="menunbofweeks"
                       accesskey="6"
                       label="&sunbird.menu.numberofweeks.6;"/>
           </menupopup>
           </menu>
           <menuseparator/>
           <menu id="menu_viewApplyTheme"/>
         </menupopup>
       </menu>

       <menu id="menu_Go"
             label="&goMenu.label;"
             accesskey="&goMenu.accesskey;">
         <menupopup id="mppView">
           <menuitem id="calendar-go-menu-today"
                     key="calendar-go-to-today-key"
                     label="&goTodayCmd.label;"
                     accesskey="&goTodayCmd.accesskey;"
                     observes="calendar_go_to_today_command"/>
           <menuitem id="calendar-go-menu-date"
                     key="go_to_date_key"
                     label="&goDateCmd.label;"
                     accesskey="&goDateCmd.accesskey;"
                     observes="go_date_command"/>
           <menuseparator/>
           <!-- Label is set up automatically using the view id. When writing a
                view extension, overlay this menuitem and add a label-<myviewtype>
                attribute with the correct label -->
           <menuitem id="calendar-go-menu-previous"
                     label=""
                     accesskey=""
                     label-day="&calendar.prevday.label;"
                     label-week="&calendar.prevweek.label;"
                     label-multiweek="&calendar.prevweek.label;"
                     label-month="&calendar.prevmonth.label;"
                     accesskey-day="&calendar.prevday.accesskey;"
                     accesskey-week="&calendar.prevweek.accesskey;"
                     accesskey-multiweek="&calendar.prevweek.accesskey;"
                     accesskey-month="&calendar.prevmonth.accesskey;"
                     observes="calendar_view_prev_command"/>
           <menuitem id="calendar-go-menu-next"
                     label=""
                     accesskey=""
                     label-day="&calendar.nextday.label;"
                     label-week="&calendar.nextweek.label;"
                     label-multiweek="&calendar.nextweek.label;"
                     label-month="&calendar.nextmonth.label;"
                     accesskey-day="&calendar.nextday.accesskey;"
                     accesskey-week="&calendar.nextweek.accesskey;"
                     accesskey-multiweek="&calendar.nextweek.accesskey;"
                     accesskey-month="&calendar.nextmonth.accesskey;"
                     observes="calendar_view_next_command"/>
         </menupopup>
       </menu>

       <menu id="tasksMenu">
       </menu>
       <menu id="windowMenu">
       </menu>
       <menu id="menu_Help">
       </menu>
     </menubar>
