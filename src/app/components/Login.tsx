// import { Link, FormControlLabel, Checkbox, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import axios from 'axios';
import Alerter from "./Alerter";

interface LoginProps {
	onSuccessfulLogin: () => void;
}

export default function Login({ onSuccessfulLogin }: LoginProps) {
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
	
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [serverError, setServerError] = useState(false);
	
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	
	const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		axios.get('/api/login', { params: { username: username } }).then(response => {
			const data = response.data;
			if (response.status != 500) {
				if (data.notFound) {
					setUsernameError(true);
				} else {
					if (pass1 == data.password1.S && pass2 == data.password2.S && pass3 == data.password3.S) {
						localStorage.setItem('username', username);
						onSuccessfulLogin();
					} else {
						setPasswordError(true);
					}
				}
			} else {
				setServerError(true);
			}
		}).catch(error => {
			setServerError(true);
		});
	};
	
	return (
		<Container component="main" maxWidth="xs">
			<Alerter onClose={() => setServerError(false)} open={serverError} severity="error" title="server error" message="some weirdo server error occurred, pls try again later"></Alerter>
			
			<Box sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					sign in
				</Typography>
				<Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
					<TextField
						label="Username" id="username" name="username"
						value={username} onChange={(e) => {
							setUsername(e.target.value);
							setUsernameError(false);
						}}
						required fullWidth margin="normal"
						autoComplete="username" autoFocus
						error={usernameError}
						helperText={usernameError ? 'username is incorrect' : ''}
					/>
					<FormControl fullWidth margin="normal" error={passwordError}>
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
										{showPass1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
					</FormControl>
					<FormControl fullWidth margin="normal" error={passwordError}>
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
										{showPass2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
					</FormControl>
					<FormControl fullWidth margin="normal" error={passwordError}>
						<InputLabel htmlFor="pass3">Password 3</InputLabel>
						<OutlinedInput
							label="Password 3" id="pass3" name="pass3"
							value={pass3} onChange={(e) => setPass3(e.target.value)}
							type={showPass3 ? 'text' : 'password'}
							required autoComplete="pass3"
							aria-describedby="password-error-msg"
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle third password visibility"
										onClick={handleShowPass3}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPass3 ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</InputAdornment>
							}
						>
						</OutlinedInput>
						<FormHelperText id="password-error-msg">
							{passwordError ? 'one or more passwords are incorrect' : ''}
						</FormHelperText>
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