'use strict'

import {Employee, Person} from './lib';

console.log("Hey!");
debugger;

console.log(new Employee('Hello', 'World').describe());


// a example for async and await
 function sleep(milliseconds: number): Promise<void> {
 return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
 }

 function puts(...optionalParams: any[]): void {
 console.log.apply(console, arguments);
 }

 async function sleepOneSecond(): Promise<void> {
 await sleep(1000);
 }

 async function printSleepAndError(): Promise<void> {
 debugger;
 puts('1');
 await sleepOneSecond();
 puts('2');
 await sleepOneSecond();
 puts('3');
 // throw new Error('throw error to showcase source map support.');
 }

 printSleepAndError().catch(err => console.log(err.stack || err));
