import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ tarefa, setTarefa ] = useState('');

    function loadData() { 
        api.get('/tarefa').then((response) => { 
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => loadData(), [])

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

     function addTarefa() { 
         const name = tarefa;
         api.post('/tarefa', { name: name }).then((response) => {
            setTarefa('');
            setOpen(false);
            loadData();
        })
     }

     function markAsDone(id) { 
         api.patch(`/tarefa/${id}/done`).then((response) => {
             loadData()
         })
     }

     function deleteTarefa(id) {
         api.delete(`/tarefa/${id}`).then((response) => { 
            loadData()
         })
     }
    

    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container"> 
            <Table>
                {lista.map(item => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                            <input type="checkbox" checked={item.done} onChange={() => markAsDone(item.id)}/>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary" onClick={() => deleteTarefa(item.id)}>Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
        </Container>
        <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Nova Tarefa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite a tarefa que pretende realizar.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tarela"
                    type="email"
                    fullWidth
                    value={tarefa}
                    onChange={e => setTarefa(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button onClick={addTarefa} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default App;
