import { useHistory } from 'react-router-dom'
import { useState, useEffect, FormEvent } from 'react';
import '../styles/login.css'
import api from '../services/api'

interface User {
    login: string,
    password: string
}




export function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [credencial, setCredencial] = useState([])
    const history = useHistory();


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const user = {
            login: login,
            password: password
        }
        try {
            const res = await api.post('/session', user);
            const userChecked = res.data.user
            const token = res.data.token
            
            localStorage.setItem('token', token)
            //localStorage.setItem('user', userChecked)
            history.push('/painel')
        } catch (error) {
            alert('Falha no login, tente novamente.');
        }

    }
    return (
        <div id="page-login">
            <header>
                <h2>Tela de Login</h2>
            </header>
            <main>
                <form onSubmit={handleSubmit}>
                    <span>Login:</span>
                    <input
                        type="text"
                        placeholder="Digite o seu login"
                        onChange={event => setLogin(event.target.value)}
                        value={login}
                    />
                    <span>Senha:</span>
                    <input
                        type="password"
                        placeholder="Digite a sua senha"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                    />
                    <button type="submit">
                        Acessar
                    </button>
                </form>
            </main>
        </div>
    )
}