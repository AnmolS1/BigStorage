import { Container, Link, Box, Avatar, Typography, TextField, InputLabel, InputAdornment, FormControlLabel, Checkbox, Button, Grid, IconButton, FormControl, OutlinedInput } from "@mui/material";
import { VisibilityOff, Visibility, LockOutlined } from "@mui/icons-material";
import { useState } from "react";
import axios from 'axios';

export default function Login() {
	const [username, setUsername] = useState('');
	
	const [pass1, setPass1] = useState('');
	const [showPass1, setShowPass1] = useState(false);
	const handleShowPass1 = () => setShowPass1(show => !show);
	
	const [pass2, setPass2] = useState('');
	const [showPass2, setShowPass2] = useState(false);
	const handleShowPass2 = () => setShowPass2(show => !show);
	
	const [pass3, setPass3] = useState('');
	const [showPass3, setShowPass3] = useState(false);
	const handleShowPass3 = () => setShowPass3(show => !show);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	
	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		axios.get('/api/login', { params: { username: username } }).then(response => {
			const data = response.data;
			if (response.status != 500) {
				if (data.notFound) {
					// mark username field incorrect with "username is incorrect"
				} else {
					if (pass1 == data.password1.S && pass2 == data.password2.S && pass3 == data.password3.S) {
						localStorage.setItem('username', username);
						// tell parent user is logged in
					} else {
						// mark all password fields as incorrect "one or more passwords are incorrect" under the last one
					}
				}
			} else {
				// alert('some wack error occurred, try again in a bit');
			}
		}).catch(error => {
			// alert('some wack error occurred, try again in a bit');
		});
	};
	
	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					sign in
				</Typography>
				<Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
					<TextField
						label="Username" id="username" name="username"
						value={username} onChange={(e) => setUsername(e.target.value)}
						required fullWidth margin="normal"
						autoComplete="username" autoFocus
					/>
					<FormControl fullWidth margin="normal">
						<InputLabel htmlFor="pass1">Password 1</InputLabel>
						<OutlinedInput
							label="Password 1" id="pass1" name="pass1"
							value={pass1} onChange={(e) => setPass1(e.target.value)}
							type={showPass1 ? 'text' : 'password'}
							required autoComplete="pass1"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle first password visibility"
										onClick={handleShowPass1}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPass1 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel htmlFor="pass2">Password 2</InputLabel>
						<OutlinedInput
							label="Password 2" id="pass2" name="pass2"
							value={pass2} onChange={(e) => setPass2(e.target.value)}
							type={showPass2 ? 'text' : 'password'}
							required autoComplete="pass2"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle second password visibility"
										onClick={handleShowPass2}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPass2 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
					</FormControl>
					<FormControl fullWidth margin="normal">
						<InputLabel htmlFor="pass3">Password 3</InputLabel>
						<OutlinedInput
							label="Password 3" id="pass3" name="pass3"
							value={pass3} onChange={(e) => setPass3(e.target.value)}
							type={showPass3 ? 'text' : 'password'}
							required autoComplete="pass3"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle third password visibility"
										onClick={handleShowPass3}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPass3 ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
					</FormControl>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="remember me"
					/> */}
					<Button
						fullWidth type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}
						disabled={username == '' || pass1 == '' || pass2 == '' || pass3 == ''}
					>
						sign in
					</Button>
					{/* <Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="#" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid> */}
				</Box>
			</Box>
		</Container>
	);
}