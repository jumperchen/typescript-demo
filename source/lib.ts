"use strict";
export class Person {
    name: string;
    static get myId() {
        return '';
    }
    constructor(name) {
        this.name = name;
    }
    describe() {
        return "Person called " + this.name;
    }
}

// Subclass
export class Employee extends Person {
    title: string;
    constructor(name, title) {
        super(name);
        debugger;
        this.title = title;
    }
    describe() {
        return super.describe() + " (" + this.title + ")";
    }
}