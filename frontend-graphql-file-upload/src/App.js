import './App.css';
import { useState } from 'react'
import { gql, GraphQLClient } from 'graphql-request'

function App() {
  const endpoint = 'http://localhost:4000/graphql'
  const graphQLClient = new GraphQLClient(endpoint)
  const [establishmentProfileId, setEstablishmentProfileId] = useState();
  const [file, setFile] = useState(null)
  const [caption, setCaption] = useState('')
  const UPLOAD_FILE = gql`
      mutation createPost($params: CreatePostParams!) {
          createPost(params: $params) {
              id
          }
      }
  `;

  const handleFileUpload = async () => {
    const data = await graphQLClient.request(UPLOAD_FILE, {
      params: {
        ownerId: establishmentProfileId,
        primaryText: caption,
        imageFile: file
      }
    })
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
      <div>
        <input
          type="text"
          onChange={e => setEstablishmentProfileId(e.target.value)}
          style={{ marginBottom: '1rem', height: '2rem', width: '10rem', borderRadius: '.3rem' }}
          placeholder="Profile ID"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={onCaptionChange}
          style={{ marginBottom: '1rem', height: '2rem', width: '10rem', borderRadius: '.3rem' }}
          placeholder={'Caption'}
        />
      </div>

      <div>
        <input type="file" onChange={onFileChange}/>
      </div>

      <br/>

      <div>
        <button
          className={'btn'}
          onClick={handleFileUpload}
          style={{
            height: '2rem',
            width: '5rem',
            backgroundColor: '#086E7D',
            color: 'white',
            borderRadius: '.5rem'
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default App;
