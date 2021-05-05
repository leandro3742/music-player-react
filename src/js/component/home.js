import React, { useState, useRef, useEffect } from "react";

var i = 0;
export function Home() {
	let audio = useRef();
	const [playPause, setPlayPause] = useState("Play");
	const [url, setUrl] = useState([]);

	const obtenerUrlAsync = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setUrl(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		obtenerUrlAsync();
	}, []);

	const cambiarSrcAudio = indice => {
		i = indice;
		setPlayPause("Play");
		audio.current.src =
			"https://assets.breatheco.de/apis/sound/" + url[indice].url;
	};

	const controlAudio = () => {
		if (audio.current.paused) {
			audio.current.play();
			setPlayPause("Pause");
		} else if (!audio.current.paused) {
			audio.current.pause();
			setPlayPause("Play");
		}
	};

	const siguiente = () => {
		if (i < url.length) {
			i++;
			cambiarSrcAudio(i);
		} else {
			i = 0;
			cambiarSrcAudio(i);
		}
	};
	const anterior = () => {
		if (i > 0) {
			i--;
			cambiarSrcAudio(i);
		} else {
			i = url.length - 1;
			cambiarSrcAudio(i);
		}
	};

	let icono_atras = "<";
	let icono_adelante = ">";

	return (
		<div className="d-flex flex-column align-items-center text-white">
			<div className="border">
				<div className="container mt-3 mb-3">
					{url.map(number => {
						return (
							<div
								key={number.url}
								className="border col-12 d-flex btn btn-secondary text-white m-2"
								onClick={() => cambiarSrcAudio(number.id + 1)}>
								<h3 key={number.id} className="mr-5">
									{number.id}
								</h3>
								<h3 key={number.name} className="ml-2 b">
									{number.name}
								</h3>
							</div>
						);
					})}
					{/* {a.map(number => (
						
					))} */}
				</div>
			</div>
			<div className="border m-2">
				<div className="d-flex align-items-center m-2">
					<button
						className="btn btn-primary rounded mr-3"
						onClick={anterior}>
						<h4>{icono_atras}</h4>
					</button>
					<div className="d-flex justify-content-center align-items-center">
						<button
							className="btn btn-secondary rounded"
							onClick={controlAudio}>
							<h4>{playPause}</h4>
						</button>
					</div>
					<button
						className="btn btn-primary rounded ml-3"
						onClick={siguiente}>
						<h4>{icono_adelante}</h4>
					</button>
				</div>
			</div>
			<audio
				className="audio"
				ref={audio}
				// src={"https://assets.breatheco.de/apis/sound/" + url[0].url}
				controls
			/>
		</div>
	);
}
