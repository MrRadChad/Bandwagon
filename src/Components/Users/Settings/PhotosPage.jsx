import React, { Component } from "react";
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux'
import toastr from 'react-redux-toastr'
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {uploadProfileImage, deletePhoto, setMainPhoto} from '../UserDetails/UserActions'

const  query = ({auth}) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'photos'}],
      storeAs: 'photos'
    }
  ]
}

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
})

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: "",
    file: null,
    cropResult: null,
    image: {}
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(this.state.image, this.state.fileName);
      this.cancelCrop();
      toastr.success('What What!', 'You uploaded your picture!')
    } catch (error) {
      // toastr.error(error.message)
    }
  }

  handlePhotoDelete = (photo) => async () => {
    try {
      this.props.deletePhoto(photo)
    } catch (error) {
      // toastr.error('Oops', error.message)
    }
  }

  handleSetMainPhoto = (photo) => async () => {
    try {
      this.props.setMainPhoto(photo)
    } catch (error) {
      // toastr.error('Oops', error.message)
    }
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    })
  }

  onDrop = (files, event) => {
    console.log(event)
    console.log(files)
    this.setState({
      files,
      fileName: files[0].name,
      file: URL.createObjectURL(files[0])
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      console.log(blob)
      this.setState({
        cropResult: imageUrl,
        image: blob
      })
    }, 'image/jpeg')
  }

  render() {
    const {photos, profile, loading} = this.props;
    let filteredPhotos;
    if (photos) {
      filteredPhotos= photos.filter(photo => {
        return photo.url !== profile.photoURL
      })
    }
    const maxSize = 5242880
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <Dropzone
              onDrop={this.onDrop}
              multiple={false}
              accept="image/png, image/jpg, image/jpeg, image/gif"
              minSize={0}
              maxSize={maxSize}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                rejectedFiles
              }) => {
                const isFileTooLarge =
                  rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                return (
                  <div style={{paddingTop: '30px', textAlign:'center' }} {...getRootProps()} >
                  <Icon name="upload" size="huge" color="teal" />
                    <input {...getInputProps()}/>
                    <Header>
                    {!isDragActive && "Click me or drag a file to upload."}
                    {isDragActive && !isDragReject && "Drop it like it's hot!"}
                    {isDragReject && "File type not accepted, sorry!"}
                    {isFileTooLarge && <div>File is too large.</div>}
                    </Header>
                  </div>
                );
              }}
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {this.state.files[0] &&
            <Cropper 
              style={{height:200, width:'100%'}}
              ref='cropper'
              src={this.state.file}
              aspectRatio = {1}
              viewMode={0}
              dragMode='move'
              guides={false}
              scalable={true}
              cropBoxMovable={true}
              cropBoxResizable={true}
              crop={this.cropImage}
            />}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {this.state.files[0] && (
              <div>
              <Image
                style={{ minHeight: "200px", minWidth: "200px" }}
                src={this.state.cropResult}
              />
              <Button.Group>
                <Button loading={loading} onClick={this.uploadImage} style={{width: '100px'}} icon='check'  />
                <Button disabled={loading} onClick={this.cancelCrop} style={{width: '100px'}} icon='close' />
              </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src={profile.photoURL || 'assets/logo.png'} />
            <Button color="grey">Main Photo</Button>
          </Card>
          {photos && 
            filteredPhotos.map(photo => (
              <Card key = {photo.id}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button onClick={this.handleSetMainPhoto(photo)} basic color="teal">
                    Main
                  </Button>
                  <Button onClick={this.handlePhotoDelete(photo)} basic icon="trash" color="red" />
                </div>
              </Card>
          ))}
        </Card.Group>
      </Segment>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect(auth => query(auth))
) (PhotosPage);
