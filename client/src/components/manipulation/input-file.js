import React, { Component } from 'react'
import './input-file.css'
import path from 'path'
import { addImg } from '../../services/server-service'


export default class InputFile extends Component {   
    
   
    onChange = (e) => {
        
        const {id}=this.props
        const data = new FormData(e.target.parentElement);
        const myFile=id+Date.now() + path.extname(e.target.value);

        addImg({body: data, id: id, myFile: myFile })
            .then((res) => console.log(res))
            .catch((err) => console.error(err))
            


    }

    onSubmitForm = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target);
        // const method = "POST";
        // fetch("http://localhost:3211/file", { method: 'POST', body: data })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.error(err))

    }

    render() {
        return (
            <div className="div-for-addDelImg">
                <button
                    onClick={() => { document.getElementById('hack').click() }}>Добавить
                </button>
                <button
                    onClick={(arg) => console.log('del', arg)}>Удалить
                </button>

                <form id="uploadForm"
                    encType="multipart/form-data"
                    onSubmit={this.onSubmitForm}

                >
                    <input id="hack"
                        type="file" name="userFile"
                        style={{ display: "none" }}

                        onChange={this.onChange}
                        accept="image/jpeg,image/png,image/gif,image/jpg,image/bmp"
                    />
                    {/* <input type="submit" value="Upload File" name="submit" /> */}
                </form>

            </div>
        );
    }
}