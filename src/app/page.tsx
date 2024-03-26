"use client";

import Upload from "@/app/components/Upload";
import View from "@/app/components/View";
import Login from "@/app/components/Login";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({ palette: { mode: 'dark' } });

export default function Home() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	var username: string | null = null;
	
	useEffect(() => {
		username = localStorage.getItem('username');
		if (username) {
			setIsLoggedIn(true);
		}
	}, []);
	
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{
				isLoggedIn ? (
					<>
						<Upload />
						<View />
					</>
				) : (
					<Login />
				)
			}
		</ThemeProvider>
	);
}
