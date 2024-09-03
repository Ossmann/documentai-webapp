'use client'

import { useEffect, useState } from 'react';

interface File {
    key: string;
    url: string;
}

export default function FileList() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        async function fetchFiles() {
            const response = await fetch('/api/list-files');
            const data = await response.json();
            setFiles(data.files);
        }

        // Fetch files initially
        fetchFiles();

        // Poll the server for new files every 10 seconds (10000ms)
        intervalId = setInterval(fetchFiles, 10000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className='text-lg font-bold'>
                Download Files
            </div>
            <div>Wait until your extracted data appears here, then download.</div>
            <ul>
                {files.map(file => (
                    <li key={file.key}>
                        <a href={file.url} download>
                            {file.key.replace('processed-data/', '')}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}