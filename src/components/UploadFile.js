import React, { useState, useEffect } from 'react';
import { token$ } from "./Store";
import { Dropbox } from 'dropbox';


export default function UploadFile() {
  const [token, setToken] = useState(token$.value);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const subscription = token$.subscribe(setToken);
    return () => subscription.unsubscribe();
  }, []);

  const handleUploadFile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      const dbx = new Dropbox({ accessToken: token });
      dbx.filesUpload({ path: "/" + file.name, contents: file });
    }
  }

  return (
    <div>
        <label>
          Upload file
              <input className="uploadFileInput"
            type="file"
            onChange={handleUploadFile}
          />
        </label>
    </div>
  );
}