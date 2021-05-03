import React, { useRef } from "react";

import { a } from "./lista.js";

export function Home() {
	const songURL =
		"https://assets.breatheco.de/apis/sound/" +
		"files/mario/songs/castle.mp3";
	const input = useRef(songURL);
	// let listItems =
	return (
		<div className="text-center d-flex flex-column align-items-center text-white">
			<div className="d-flex justify-content-center">
				{a.map(number => (
					<div key={number} className=" col-9 d-flex">
						<h3>{number.id}</h3>
						<h3 className="ml-5">{number.name}</h3>
					</div>
				))}
			</div>
			<audio src={songURL} controls />
			<button className="btn btn-primary">Cambiar cancion</button>
		</div>
	);
}
