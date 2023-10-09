// import React, { useState } from 'react';

// function App() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:8080/file/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const imageId = await response.text();
//         console.log('Image uploaded. Image ID:', imageId);
//         // Add additional handling if needed, e.g., displaying a success message.
//       } else {
//         console.error('Error uploading image:', response.status);
//         // Handle the error, e.g., display an error message.
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       // Handle the error, e.g., display an error message.
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Food Item</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           required
//         />
//         <button type="submit">Upload</button>
//       </form>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';

function App() {
    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        // Replace 'imageId' with the actual ID of the image you want to retrieve.
        const imageId = '65228f7df0500969468f28db';

        // Make a GET request to the backend endpoint to retrieve the image.
        fetch(`http://localhost:8080/file/download/${imageId}`)
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Failed to fetch image');
                }
            })
            .then((blob) => {
                setImageData(URL.createObjectURL(blob));
            })
            .catch((error) => {
                console.error('Error fetching image:', error);
            });
    }, []);

    return (
        <div>
            <h1>Homepage</h1>
            {imageData && <img src={imageData} alt="Image" />}
        </div>
    );
}

export default App;