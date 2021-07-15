import { useHistory } from 'react-router-dom'
import { useEffect, FormEvent, useState } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter, useModal } from '../components/Modal'
import '../styles/painel.css'
import api from '../services/api'


import * as React from 'react';
import { DataGrid, GridEditCellPropsParams } from '@material-ui/data-grid';
import { render } from '@testing-library/react';

const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    { field: 'titulo', headerName: 'Título', width: 200, editable: true },
    { field: 'url_imagem', headerName: 'Imagem', width: 200, editable: true },
    { field: 'descricao', headerName: 'Descrição', width: 200, editable: true },
    { field: 'tema', headerName: 'Tema', width: 200 },
    { field: 'url_noticia', headerName: 'Link da noticia', width: 200, editable: true },
];

export function Painel() {
    const [addNews, setAddNews] = useState(0)
    const history = useHistory()
    const { isShowing, toggle } = useModal();
    const [linkImagem, setLinkImagem] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tema, setTema] = useState('')
    const [link, setLink] = useState('')
    let [rows, setRows] = useState([])
    const [selected, setSelected] = useState('')
    const [removeNews, setRemoveNews] = useState(0)
    const [isDisabled, setIsDisabled] = useState(true)



    useEffect(() => {
        async function preencherTabela() {
            await api.get('/noticia', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                }
            }
            ).then(response => {
                setRows(response.data);
                console.log("TABELA")
                console.log(rows)
            })
        }
        preencherTabela()
        console.log(selected)
    }, [addNews, removeNews])
    function logout() {
        localStorage.removeItem('token');
        history.push('/')
    }
    async function handleDeleteNew() {
        try {
            await api.delete('/noticia/' + selected, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                }
            })
            history.push('/painel');
            setRemoveNews(+1)
            alert('Deletado com sucesso.');


        } catch (err) {
            alert('Erro ao deletar a notícia, tente novamente.');
        }

    }
    async function handleUpdate(data: GridEditCellPropsParams) {
        //console.log("UPDATE")
        //console.log(data)
        let noticia = {}
        const { id, field, props } = data
        if (field == 'titulo') {
            noticia = {
                'titulo': props.value
            }
        } else if (field == 'url_imagem') {
            noticia = {
                'url_imagem': props.value
            }
        }
        else if (field == 'descricao') {
            noticia = {
                'descricao': props.value
            }
        }
        else if (field == 'url_noticia') {
            noticia = {
                'url_noticia': props.value
            }
        }



        console.log(noticia)
        //field / id /props.value
        try {
            await api.put('/noticia/' + id, noticia, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token'),
                }
            })
            history.push('/painel');
            alert('Atualizado com sucesso.');

        } catch (err) {
            alert('Erro ao atualizar a notícia, tente novamente.');
        }
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
            setLinkImagem("")
            setDescricao("")
            setTitulo("")
            setLink("")
            setTema("")
            history.push('/painel');
            setAddNews(+1)

        } catch (err) {
            alert('Erro ao cadastrar a notícia, tente novamente.');
        }
    }
    return (
        <div id="page-painel">
            <header>
                <h1>Painel Administrativo do Casper Lu</h1>
                <button onClick={logout}>
                    Logout
                </button>
            </header>
            <div id="main-content">
                <h2>Notícias</h2>
                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        onRowSelected={(e) => {
                            setSelected(e.data.id)
                            if(e.isSelected===true){
                                setIsDisabled(false)
                            }else{
                                setIsDisabled(true)
                            }
                        }}
                        onEditCellChangeCommitted={event => handleUpdate(event)}
                    />
                </div>


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
                                <span>Título da notícia</span>
                                <input
                                    type="text"
                                    placeholder="Digite o Título da notícia"
                                    onChange={event => setTitulo(event.target.value)}
                                    value={titulo}
                                />
                                <span>Link da notícia</span>
                                <input
                                    type="text"
                                    placeholder="Insira o link"
                                    onChange={event => setLink(event.target.value)}
                                    value={link}
                                />
                                <span>Link para imagem da noticia</span>
                                <input
                                    type="text"
                                    placeholder="Digite o link da imagem"
                                    onChange={event => setLinkImagem(event.target.value)}
                                    value={linkImagem}
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
                                    <option value="">Selecione um tema</option>
                                    <option value="Esportes">Esportes</option>
                                    <option value="Política">Política</option>
                                    <option value="Entretenimento">Entretenimento</option>
                                    <option value="Famosos">Famosos</option>
                                </select>
                                <br />
                                <br />

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
                <div id='botao-excluir' >
                    <button className={'botao'} onClick={handleDeleteNew} disabled={isDisabled}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    )
}