import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addImg,
  postImage,
  delImgDb,
  delImgFs,
} from "../../services/server-service";
import { fetchImages } from "../../actions";
import "./input-file.css";
import path from "path";

const InputFile = ({id, fetchImages, slides, currentSlideImage}) => {
  const onChange = (e) => {
    const data = new FormData(e.target.parentElement);
    const myFile = id + Date.now() + path.extname(e.target.value);

    addImg({ body: data, id: id, myFile: myFile })
      .then(
        postImage({ url: myFile, id_journal: id })
          .then((res) => res.json())
          .then((res) => {
            alert("Снимок добавлен!");
            fetchImages(id);
          })
          .catch((err) => {
            console.error(err);
            alert(`ошибка при отправке`);
            return;
          })
      )
      .catch((err) => console.error(err));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    // const method = "POST";
    // fetch("http://localhost:3211/file", { method: 'POST', body: data })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.error(err))
  };
  const onImgDelete = () => {
    
    if (!slides || slides.length === 0) return;
    const confirmDel = window.confirm("Удалить данный снимок?");
    if (!confirmDel) return;
    const deletingFile = slides[currentSlideImage].url;
    delImgDb([deletingFile])
      .then(() => {
        delImgFs(id, deletingFile)
          .then((res) => {
            fetchImages(id);
          })
          .catch((err) => {
            console.error(err);
            return;
          });
        console.log("файл из БД удален");
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  };

  return (
    <div className="div-for-addDelImg">
      <button
        onClick={() => {
          document.getElementById("hack").click();
        }}
      >
        Добавить
      </button>
      <button onClick={onImgDelete}>Удалить</button>
      <form
        id="uploadForm"
        encType="multipart/form-data"
        onSubmit={onSubmitForm}
      >
        <input
          id="hack"
          type="file"
          name="userFile"
          style={{ display: "none" }}
          onChange={onChange}
          accept="image/jpeg,image/png,image/gif,image/jpg,image/bmp"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  slides: state.manipulation.slides,
  currentSlideImage: state.manipulation.currentSlideImage,
});

const mapDispatchToProps = {
  fetchImages: fetchImages,
};
export default connect(mapStateToProps, mapDispatchToProps)(InputFile);
