import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, useModal } from '../components/Modal'
import '../styles/painel.css'
import api from '../services/api'

export function Painel() {
    const history = useHistory()
    const { isShowing, toggle } = useModal();
    const [linkImagem, setLinkImagem] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tema, setTema] = useState('')
    const [link, setLink] = useState('')

    function logout(){
        localStorage.removeItem('token');
        history.push('/')
    }
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setTema(event.target.value);

    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const noticia = {
            url_imagem: linkImagem,
            titulo: titulo,
            descricao: descricao,
            tema: tema,
            url_noticia: link
        }
        //console.log(noticia)
        const token = localStorage.getItem('token')
        console.log(token)
        try {
            await api.post('/noticia', noticia, {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })

            history.push('/painel');
        } catch (err) {
            alert('Erro ao cadastrar a notícia, tente novamente.');
        }
    }
    return (
        <div id="page-painel">
            <header>
                <h1>Painel Administrativo do Casper</h1>
                <button onClick={logout}>
                    Logout
                </button>
            </header>
            <div id="main-content">
                <h2>TABELA</h2>
                
              
            
                <div id="modal">
                    <button id="button-modal" onClick={toggle}>
                        +
                    </button>
                    <Modal {...{ isShowing, toggle }}>
                        <ModalHeader {...{ toggle }}>
                            Adicionar noticia
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSubmit}>
                                <span>Link para imagem da noticia</span>
                                <input
                                    type="text"
                                    placeholder="Digite o link da imagem"
                                    onChange={event => setLinkImagem(event.target.value)}
                                    value={linkImagem}
                                />
                                <span>Título da notícia</span>
                                <input
                                    type="text"
                                    placeholder="Digite o Título da notícia"
                                    onChange={event => setTitulo(event.target.value)}
                                    value={titulo}
                                />
                                <span>Descrição</span>
                                <input
                                    type="text"
                                    placeholder="Adicione a descrição"
                                    onChange={event => setDescricao(event.target.value)}
                                    value={descricao}
                                />
                                <br /><br />
                                <span>Tema</span>

                                <select value={tema} onChange={handleChange}>
                                    <option value="Esportes">Esportes</option>
                                    <option value="Política">Política</option>
                                    <option value="Entretenimento">Entretenimento</option>
                                    <option value="Famosos">Famosos</option>
                                </select>
                                <br />
                                <br />
                                <span>Link da notícia</span>
                                <input
                                    type="text"
                                    placeholder="Insira o link"
                                    onChange={event => setLink(event.target.value)}
                                    value={link}
                                />
                                <button>
                                    Cadastrar notícia
                                </button>

                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={toggle}>
                                Sair
                            </button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>
        </div>
    )
}