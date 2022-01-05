import './App.css';
import { useState } from 'react'
import { gql, GraphQLClient } from 'graphql-request'

function App() {
  const endpoint = 'http://localhost:4000/graphql'
  const graphQLClient = new GraphQLClient(endpoint)
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const UPLOAD_FILE = gql`
      mutation SingleUpload($file: Upload!, $caption: String! ) {
          singleUpload(file: $file, caption: $caption ) {
              filename
              mimetype
              encoding
          }
      }
  `;
  const handleFileUpload = async () => {
    const data = await graphQLClient.request(UPLOAD_FILE, { file: file, caption: caption })
    console.log(JSON.stringify(data, undefined, 2))
  }

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onCaptionChange = (e) => {
    setCaption(e.target.value)
  }
  return (
    <div className="App">
      <form encType={'multipart/form-data'} className={'form'}>
        <input type="text" onChange={onCaptionChange}
               style={{ marginBottom: '1rem', height: '2rem', width: '10rem', borderRadius: '.3rem' }}
               placeholder={'Add caption'}/>
        <input type="file" onChange={onFileChange}/>
      </form>

      <button className={'btn'} onClick={handleFileUpload}
              style={{
                height: '2rem',
                width: '5rem',
                backgroundColor: '#086E7D',
                color: 'white',
                borderRadius: '.5rem'
              }}>
        Upload
      </button>
    </div>
  );
}

export default App;
