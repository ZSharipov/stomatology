import React, { Component } from 'react'

export default class InputFile extends Component {

    state = {
        selectedFile: null,
        // selectedFile: [],
        file: null
    }

    onChange=(e)=> {

    
    const data = new FormData(e.target.parentElement);
    const method = "POST";
    fetch("http://localhost:3211/file", { method: 'POST', body: data })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))

       
        // this.setState({ file: e.target.files[0] })
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log('safadsfsadgdfsgdfsgdfsgsdfgdfs');
        const data = new FormData(e.target);
        const method = "POST";
        fetch("http://localhost:3211/file", { method: 'POST', body: data })
            .then((res) => console.log(res))
            .catch((err) => console.error(err))

    }

    render() {
        return (
            <div>
                <button onClick={()=>{document.getElementById('hack').click()}}>ok</button>

                <form id="uploadForm"
                    encType="multipart/form-data"
                    onSubmit={this.onSubmitForm}
                    
                >
                    <input id="hack"
                    type="file" name="userFile" 
                    style={{display:"none"}}
                    
                    onChange={this.onChange} 
                    accept="image/jpeg,image/png,image/gif,image/jpg,image/bmp"
                    />
                    {/* <input type="submit" value="Upload File" name="submit" /> */}
                </form>

            </div>
        );
    }
}