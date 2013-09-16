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
