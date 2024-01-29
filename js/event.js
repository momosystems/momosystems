import { dateString, generateId, getDayIndex } from "./helper.js"

export const MODE = {
    VIEW: 1,
    UPDATE: 2,
    CREATE: 3
};

export class Event {
    constructor(data) {
        this.id = data.id || generateId();
        this.title = data.title;
        this.start = data.start;
        this.end = data.end;
        this.prevDate = data.date;
        this.date = data.date;
        this.description = data.description;
        this.color = data.color;
    }

    get dayIndex() {
        return getDayIndex(new Date(this.date));
    }

    get startHour() {
        return parseInt(this.start.substring(0, 2));
    }

    get startMinutes() {
        return parseInt(this.start.substring(3, 5));
    }

    get endHour() {
        return parseInt(this.end.substring(0, 2));
    }

    get endMinutes() {
        return parseInt(this.end.substring(3, 5));
    }

    isValidIn(calendar) {
        const newStart = $("#eventStart").val();
        const newEnd = $("#eventEnd").val();
        const newDate = $("#eventDate").val();
        if (calendar.events[newDate]) {
            const event = Object.values(calendar.events[newDate]).find(
                (event) =>
                event.id != this.id && event.end > newStart && event.start < newEnd
            );
            if (event) {
                $("#errors").text(
                    `This collides with the event '${event.title}'
                (${event.start} - ${event.end}).`
                );
                return false;
            }
        }
        const duration = (new Date(`${newDate}T${newEnd}`).getTime() - new Date(`${newDate}T${newStart}`).getTime()) / (1000 * 60);
        if (duration < 0) {
            $("#errors").text("The start cannot be after the end");
            return false;
        } else if (duration < 30) {
            $("#errors").text("Events cannot be under 30 minutes");
            return false;
        }
        return true;
    }

    updateIn(calendar) {
        this.title = $("#eventTitle").val();
        this.start = $("#eventStart").val();
        this.end = $("#eventEnd").val();
        this.prevDate = this.date;
        this.date = $("#eventDate").val();
        this.description = $("#eventDescription").val();
        this.color = $(".color.active").attr("data-color");
        this.showIn(calendar);
        this.saveIn(calendar);
    }
    showIn(calendar) {
        if (
            this.date < dateString(calendar.weekStart) ||
            this.date > dateString(calendar.weekEnd)
        ) {
            $(`#${this.id}`).remove();
            return;
        }
        let eventSlot;
        const h = calendar.slotHight;
        if ($(`#${this.id}`).length) {
            eventSlot = $(`#${this.id}`);
        } else {
            eventSlot = $("<div></div>")
                .attr("id", this.id)
                .addClass("event")
                .click(() => this.clickIn(calendar));

        }
        eventSlot
            .text(this.title)
            .css("backgroundColor", `var(--color-${this.color})`)
            .css("top", (this.startHour + this.startMinutes / 60) * h + 2 + "px")
            .css("bottom", 24 * h - (this.endHour + this.endMinutes / 60) * h + 1 + "px")
            .appendTo(`.day[data-dayIndex=${this.dayIndex}] .slots`);
        const duration = (new Date(`${this.date}T${this.end}`).getTime() - new Date(`${this.date}T${this.start}`).getTime()) / (1000 * 60);
        if (duration < 45) {
            eventSlot.addClass("veryShortEvent").removeClass("shortEvent");
        } else if (duration < 60) {
            eventSlot.addClass("shortEvent").removeClass("veryShortEvent");
        } else {
            eventSlot.removeClass("shortEvent").removeClass("veryShortEvent");
        }
    }

    saveIn(calendar) {
        if (this.prevDate && this.date != this.prevDate) {
            delete calendar.events[this.prevDate][this.id];
            if (Object.values(calendar.events[this.prevDate]).length == 0) {
                delete calendar.events[this.prevDate];
            }
        }
        if (!calendar.events[this.date]) {
            calendar.events[this.date] = {};
        }
        calendar.events[this.date][this.id] = this;
        calendar.saveEvents();
    }
    clickIn(calendar) {
        if (calendar.mode == MODE.VIEW) {
            calendar.mode = MODE.UPDATE;
            calendar.openModal(this);
        }
    }

    deleteIn(calendar) {
        calendar.closeModal();
        $(`#${this.id}`).remove();
        delete calendar.events[this.date][this.id];
        if (Object.values(calendar.events[this.date]).length == 0) {
            delete calendar.events[this.date]
        }
        calendar.saveEvents();
    }

    copyIn(calendar) {
        if (calendar.mode != MODE.UPDATE) return;
        calendar.closeModal();
        calendar.mode = MODE.CREATE;
        const copy = new Event({
            title: "Copy of " + this.title,
            start: this.start,
            end: this.end,
            date: this.date,
            description: this.description,
            color: this.color,
        });
        calendar.openModal(copy);
    }
}