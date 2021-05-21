import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "./Loader";
import firebase from "firebase";

const Chat = () => {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    );

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <Grid container
                  justify={"center"}
                  style={{ height: window.innerHeight - 50,marginTop: 20}}
                  >
                <div style={{
                    width: '80%', 
                    height: '60vh', 
                    border: '1px solid gray',  
                    marginTop: 'conteiner.spacing.unit * 3',
                    overflowY: 'auto', 
                    backgroundColor:'white'}}>
                    {messages.map(message =>
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px solid grey',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5,
                            maxWidth: '400px',
                            wordBreak:'break-all',
                            borderRadius: 10,
                            backgroundColor: user.uid === message.uid ? 'rgb(140, 233, 140)':'rgb(214, 226, 233)'
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: '80%' }}
                >
                    <TextField
                        fullWidth
                        required
                        rowsMax={2}
                        variant={"outlined"}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть повідомлення"}
                        style={{ backgroundColor:'white'}}
                    />
                    <Button onClick={sendMessage} border="black" style={{ marginTop: 5 , backgroundColor:"rgb(27, 205, 218)", color:"white"}} variant={"outlined"} disabled={value.trim().length === 0}>Надіслати</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
