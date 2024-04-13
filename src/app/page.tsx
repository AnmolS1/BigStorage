"use client";

import { useState, useEffect } from "react";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

import Upload from "@/app/components/Upload";
import View from "@/app/components/View";
import Login from "@/app/components/Login";

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
	const handleSuccessfulLogin = () => {
		setIsLoggedIn(true);
	};
	
	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			setIsLoggedIn(true);
		}
		setIsLoading(false);
	}, []);
	
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{ isLoading ? (
				<></>
			) : isLoggedIn ? (
				<>
					<Upload />
					<View />
				</>
			) : (
				<Login onSuccessfulLogin={handleSuccessfulLogin} />
			) }
		</ThemeProvider>
	);
}
