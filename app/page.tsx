"use client"

import { useEffect,useState } from "react";
import { title, subtitle } from "@/components/primitives";


interface Test {
	a: string;
	b: number;
}

// const aa = ({ a, b }: Test) => {
const aa = ({ a, b }: { a: string, b: number }) => {
	console.log('a?', a)
}
aa({ a: '1', b: 3 })



interface Aa {
	a: string;
}
interface Bb {
	c: number;
}
// const bb = ({ a }: { a: string }, b: { c: number }) => {
const bb = (a: Aa, b: Bb) => {
	console.log('b?', a, b)
}
bb({ a: 'aa' }, { c: 33 })


interface Data {
	a: string; 
	b: number;
	c: { d: string; }
}
const cc = (data: Data[]) => {
	console.log(data)
}
cc([{ a: 'aa', b: 3, c: { d: 'dd' } }])



const obj = {
	a: {
		b: { c : 'str'}
	}
}


// const objValue = obj.a.b['c'] //이런 경우는 타입을 
const objVal = obj.a.b as { [k in string]: any };
const key = 'c'
console.log('objValue', objVal[key])
// (obj as { [ k in string ]: any })[key] //이런식으로 해야함



export default function Home() {


	return (
		<div>
			root page


		</div>
	);
}
